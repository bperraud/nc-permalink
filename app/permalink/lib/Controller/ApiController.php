<?php

declare(strict_types=1);

namespace OCA\Permalink\Controller;

/* use OCP\AppFramework\Http; */

use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
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

/**
 * @psalm-suppress UnusedClass
 */
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
        $this->httpClient = $httpClient; // Assign the HTTP client

	}
	/**
	 * An example API endpoint
	 *
	 * @return DataResponse<Http::STATUS_OK, array{message: string}, array{}>
	 *
	 * 200: Data returned
	 */
	#[NoAdminRequired]
	#[ApiRoute(verb: 'GET', url: '/api')]
	public function index(): DataResponse {
		return new DataResponse(
			['message' => 'Hello world!']
		);
	}

	#[NoAdminRequired]
	#[ApiRoute(verb: 'POST', url: '/api/link')]
	public function post(): DataResponse {
        $user = $this->userSession->getUser();
        $share = $this->service->getOrCreateSharelink($user->getUID(), '/Media/photo-1527668441211-67a036f77ab4.jpeg');

        /* $share = $this->service->getSharelink($user->getUID(), '/Media/photo-1527668441211-67a036f77ab4.jpeg'); */
        $sharelink = $this->getSharelinkFromToken($share->getToken());
        
        $data = [
            "target_url" => $sharelink,
        ];

        /* $permalink = $this->curl_get("http://host.docker.internal:8080/link/api/create/?target_url=" . urlencode($sharelink)); */
        $permalink = $this->curl_post("http://host.docker.internal:8080/link/api/create/", $data);

		return new DataResponse(
			['share' => $permalink]
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

        $sharelink = $this->getSharelinkFromToken($share->getToken());
        $data = [
            "target_url" => $sharelink,
        ];
        $response = $this->curl_get("http://host.docker.internal:8080/link/api/create/?target_url=" . urlencode($sharelink));

        if ($response['status_code'] != 200) {
            return new DataResponse(
                ['permalink' => null]
            );
        }

		return new DataResponse(
			$response
		);
	}

    private function getSharelinkFromToken(string $token) : string {

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
        return $this->mycurl($url, false);
    }

    private function curl_post(string $url, array $data) : array {
        return $this->mycurl($url, true, $data);
    }

    private function mycurl(string $url, bool $is_post, array $data = []) : array {
        $ch = curl_init($url);

        $headers = [
            'Authorization: Bearer ' . $this->encodeJwtToken(),
            'Accept: application/json',
        ];

        if ($is_post) {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            $headers[] = 'Content-Type: application/json';
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
