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
        $share = $this->service->get_or_create_sharelink($user->getUID(), '/Media/photo-1527668441211-67a036f77ab4.jpeg');
        $sharelink = $this->get_sharelink_from_token($share->getToken());
        $permalink = $this->create_permalink($sharelink);

		return new DataResponse(
			['share' => $permalink]
		);
	}

    private function get_sharelink_from_token(string $token) : string {

        $currentOverwriteCliUrl = $this->config->getSystemValue('overwrite.cli.url', '');
        return $currentOverwriteCliUrl . "/index.php/s/" . $token;
    }

    private function encode_jwt_token() : string {
        $user = $this->userSession->getUser();

        $payload = [
            'sub' => $user->getUID(),      // Subject (user)
            'iat' => time(),               // Issued at
            'exp' => time() + 3600,        // Expiration time (1 hour)
            'iss' => 'nextcloud-app',      // Issuer
        ];

        $secretKey = 'django-t=55_t5&e(l@ne*(r2x34-44wch895qsr4v2nsjteq2br2e(s)';
        $jwt = JWT::encode($payload, $secretKey, 'HS256');

        return $jwt;
    }

    private function get_permalink_from_filepath(string $filepath) {
        $jwt = $this->encode_jwt_token();

        // Encode the filepath for use in a URL
        $encodedPath = urlencode($filepath);

        // Append the filepath as a GET query param
        $url = "http://host.docker.internal:8080/link/api/create/?target_url=" . $encodedPath;

        $ch = curl_init($url);

        $headers = [
            'Authorization: Bearer ' . $jwt,
            'Accept: application/json',
        ];

        // Set cURL options for GET
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);

        if ($response === false) {
            $error = curl_error($ch);
            curl_close($ch);
            return ['error' => $error];
        }

        curl_close($ch);

        return json_decode($response, true);
    }


    private function create_permalink(string $target_url) {
        $jwt = $this->encode_jwt_token();

        $ch = curl_init("http://host.docker.internal:8080/link/api/create/");

        $headers = [
            'Authorization: Bearer ' . $jwt,
            'Accept: application/json',
            'Content-Type: application/json',
        ];

        $data = [
            "target_url" => $target_url,
        ];

        $jsonData = json_encode($data);

        // Set cURL options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);

        $response = curl_exec($ch);

        if ($response === false) {
            $error = curl_error($ch);
            curl_close($ch);
            return ['error' => $error]; // Return the error message if request failed
        }

        curl_close($ch);

        return json_decode($response, true);
    }

}
