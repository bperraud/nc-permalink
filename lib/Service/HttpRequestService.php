<?php

namespace OCA\Permalink\Service;

use Exception as BaseException;
use OCP\Constants;
use TypeError as BaseTypeError;
use OCP\IL10N;
use OCP\AppFramework\OCS\OCSBadRequestException;
use OCP\AppFramework\OCS\OCSException;
use OCP\AppFramework\OCS\OCSForbiddenException;
use OCP\AppFramework\OCS\OCSNotFoundException;
use Psr\Log\LoggerInterface;
use OCP\IUserSession;
use OCA\Permalink\Enums\SettingsKey;
use OCP\AppFramework\Http\JSONResponse;

use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\AppFramework\Services\IAppConfig;

# JWT
require_once \OC_App::getAppPath('permalink') . '/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class HttpRequestService {
   
	public function __construct(
		private LoggerInterface $logger,
		private readonly IAppConfig $appConfig,
        private IUserSession $userSession,
	) {
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

    public function curl_get(string $url) : JSONResponse {
        return $this->mycurl($url, 'GET');
    }

    public function curl_post(string $url, array $data) : JSONResponse {
        return $this->mycurl($url, 'POST', $data);
    }

    public function curl_delete(string $url) : JSONResponse {
        return $this->mycurl($url, 'DELETE');
    }

    public function curl_put(string $url, array $data) : JSONResponse {
        return $this->mycurl($url, 'PUT', $data);
    }

    private function mycurl(string $url, string $method, array $data = []) : JSONResponse {
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
        } elseif ($method === 'PUT') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            $headers[] = 'Content-Type: application/json';
        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // ❗ Disabling SSL certificate validation (use only in dev/test)
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Disable peer verification
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // Don't verify the host

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($response === false) {
            $error = curl_error($ch);
            curl_close($ch);
            return new JSONResponse(['error' => 'Server Unreachable'], 503);
        }

        curl_close($ch);
        /* return new Response(json_decode($response, true), (int) $httpCode), 'application/json'); */
        return new JSONResponse(json_decode($response, true), (int) $httpCode);
    }
}
