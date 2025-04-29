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


use OCP\Http\Client\IClient;
use OCP\Http\Client\IClientService;
use OCP\IConfig;

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
		private readonly IClientService $clientService,
	) {
		parent::__construct($appName, $request, 'PUT, POST, OPTIONS');
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
        /* $share = $this->service->create('/Media/photo-1527668441211-67a036f77ab4.jpeg', 3, $user->getUID()); */
        /* $share_link = get_sharelink_from_token($share->getToken()); */
        /* $response = create_permalink($share_link); */

        $sharelink = $this->get_sharelink_from_token($share->getToken());

        $permalink = $this->create_permalink($sharelink);

		return new DataResponse(
			['share' => $permalink]
			/* ['share' => $share->getToken()] */
		);
	}

    private function get_sharelink_from_token(string $token) : string {

        $currentOverwriteCliUrl = $this->config->getSystemValue('overwrite.cli.url', '');
		/* $suggestedOverwriteCliUrl = $this->request->getServerProtocol() . '://' . $this->request->getInsecureServerHost() . \OC::$WEBROOT; */
        return $currentOverwriteCliUrl . "/index.php/s/" . $token;
    }

    private function create_permalink(string $target_url) : DataResponse {
        try {
            $client = $this->clientService->newClient();
            
            $response = $client->post('http://localhost:80/link/api/create', [
                'headers' => [
                    'Authorization' => 'Bearer your_token_here',
                    'Accept'        => 'application/json',
                ],
                'json' => [
                    "target_url" => $target_url
                ],
            ]);

            $data = json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                $errorBody = (string) $e->getResponse()->getBody();
                $statusCode = $e->getResponse()->getStatusCode();
                $data = $errorBody;
            } else {
                $data = "Server Unreachable";
            }
        }
        catch (\Exception $e) {
            $data = "Unexpected error: " . $e->getMessage();
        }
        return $data;
}
