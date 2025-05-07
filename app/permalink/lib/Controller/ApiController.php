<?php

declare(strict_types=1);

namespace OCA\Permalink\Controller;

/* use OCP\AppFramework\Http; */

use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;

use OCP\AppFramework\OCS\OCSBadRequestException;
use OCP\AppFramework\OCS\OCSException;
use OCP\AppFramework\OCS\OCSForbiddenException;
use OCP\AppFramework\OCS\OCSNotFoundException;

use OCP\Files\IRootFolder;
use OCP\IRequest;
use OCP\Constants;
use OCP\Share\IManager;
use OCP\IUserSession;
use OCA\Permalink\Service\ShareService;
use OCP\IConfig;

use OCA\Permalink\Enums\SettingsKey;
use OCP\AppFramework\Services\IAppConfig;


# JWT
require_once \OC_App::getAppPath('permalink') . '/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ApiController extends OCSController {

    public function __construct(
		string $appName,
		IRequest $request,
        private readonly ShareService $service,
		private readonly IRootFolder $rootFolder,
		private readonly IAppConfig $appConfig,
		private readonly ?string $userId,
		private IConfig $config,
        private IUserSession $userSession,
	) {
		parent::__construct($appName, $request, 'PUT, POST, OPTIONS');
	}

	#[NoAdminRequired]
	#[ApiRoute(verb: 'POST', url: '/api/link')]
	public function post(): DataResponse {
        [
			'path' => $path
		] = $this->request->getParams();

        $user = $this->userSession->getUser();
        $share = $this->service->getOrCreateSharelink($user->getUID(), $path);
        $sharelink = $this->fullSharelinkPathByToken($share->getToken());
        
        $data = [
            "target_url" => $sharelink,
        ];

        $response = $this->curl_post("link/api/create/", $data);

        if ($response['status_code'] != 200) {
            return new DataResponse(
                ['permalink' => null]
            );
        }

        return new DataResponse(
			$response['data']
		);
	}

	#[NoAdminRequired]
	#[ApiRoute(verb: 'DELETE', url: '/api/link')]
	public function delete(string $path): DataResponse {
        $user = $this->userSession->getUser();
        $share = $this->service->getSharelink($user->getUID(), $path);

        // no share means no permalink
        if ($share === null) {
            return new DataResponse(
                ['permalink' => null]
            );
        }

        $sharelink_path = $this->fullSharelinkPathByToken($share->getToken());

        // delete permalink in django app
        $response = $this->curl_delete("link/api/create/?target_url=" . urlencode($sharelink_path));

        if ($response['status_code'] != 200) {
            throw new OCSNotFoundException($this->l10n->t('Delete Error'));
        }
		
		return new DataResponse(
			$response['data']
		);
    }

	#[NoAdminRequired]
	#[ApiRoute(verb: 'GET', url: '/api/link')]
	public function get(string $path): DataResponse {
        $user = $this->userSession->getUser();
        $share = $this->service->getSharelink($user->getUID(), $path);

        // no share means no permalink
        if ($share === null) {
            return new DataResponse(
                ['permalink' => null]
            );
        }

        $sharelink = $this->fullSharelinkPathByToken($share->getToken());
        $data = [
            "target_url" => $sharelink,
        ];
        $response = $this->curl_get("link/api/create/?target_url=" . urlencode($sharelink));

        if ($response['status_code'] != 200) {
            return new DataResponse(
                ['permalink' => null]
            );
        }
		
		return new DataResponse(
			$response['data']
		);
	}

    private function fullSharelinkPathByToken(string $token) : string {
        $currentOverwriteCliUrl = $this->config->getSystemValue('overwrite.cli.url', '');
        return $currentOverwriteCliUrl . "/index.php/s/" . $token;
    }

    private function encodeJwtToken() : string {
        $user = $this->userSession->getUser();

        $payload = [
            'sub' => $user->getUID(),      // Subject (user)
            'iat' => time(),               // Issued at
            'exp' => time() + 3600,        // Expiration time (1 hour)
            'iss' => 'nextcloud-app',      // Issuer
        ];

        $secretKey = $this->appConfig->getAppValueString(SettingsKey::JwtSecretKey->value, "");
        $jwt = JWT::encode($payload, $secretKey, 'HS256');

        return $jwt;
    }


    private function curl_get(string $url) : array {
        return $this->mycurl($url, 'GET');
    }

    private function curl_post(string $url, array $data) : array {
        return $this->mycurl($url, 'POST', $data);
    }

    private function curl_delete(string $url) : array {
        return $this->mycurl($url, 'DELETE');
    }


    private function mycurl(string $url, string $method, array $data = []) : array {
        $baseUrl = $this->appConfig->getAppValueString(SettingsKey::PermalinkApiEndpoint->value, "");
        $url = $baseUrl . '/' . $url;

        $ch = curl_init($url);

        $headers = [
            'Authorization: Bearer ' . $this->encodeJwtToken(),
            'Accept: application/json',
        ];

        // Set method-specific options
        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            $headers[] = 'Content-Type: application/json';
        } elseif ($method === 'DELETE') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($response === false) {
            $error = curl_error($ch);
            curl_close($ch);
            return ['error' => $error];
        }

        curl_close($ch);

        return [
            'status_code' => $httpCode,
            'data' => json_decode($response, true)
        ];
    }


}
