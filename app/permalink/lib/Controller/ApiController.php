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
        /* $link = $this->service->getSharedLink($user->getUID(), '/Media/photo-1527668441211-67a036f77ab4.jpeg'); */
        $share = $this->service->create('/Media/photo-1527668441211-67a036f77ab4.jpeg', 3, $user->getUID());

        $client = $this->clientService->newClient();

        $response = $client->post('http://localhost:80/link/api/create', [
            'body' => [
                "target_url" => "https://example.com/dashboard"
            ],
        ]);

		return new DataResponse(
			['response' => $response->getBody()]
		);

		return new DataResponse(
			['share' => $share]
		);
	}

}
