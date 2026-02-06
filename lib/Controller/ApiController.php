<?php

declare(strict_types=1);

namespace OCA\Permalink\Controller;

use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;

use OCP\AppFramework\Http\Response;
use OCP\AppFramework\Http\JSONResponse;

use OCP\AppFramework\OCSController;
use OCP\AppFramework\Http;
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
use OCA\Permalink\Service\HttpRequestService;
use OCP\IConfig;
use Psr\Log\LoggerInterface;
use OCA\Permalink\Enums\SettingsKey;

class ApiController extends OCSController {

    public function __construct(
		string $appName,
		IRequest $request,
        private readonly ShareService $shareService,
        private readonly HttpRequestService $httpService,
		private readonly IRootFolder $rootFolder,
		private IConfig $config,
        private IUserSession $userSession,
		private readonly LoggerInterface $logger
	) {
		parent::__construct($appName, $request, 'PUT, POST, OPTIONS');
	}

	#[NoAdminRequired]
	#[ApiRoute(verb: 'POST', url: '/api/link')]
	public function post(): JSONResponse {
        [
			'path' => $path
		] = $this->request->getParams();

        $user = $this->userSession->getUser();
        $share = $this->shareService->getOrCreateSharelink($user->getUID(), $path);

        $sharelink = $this->fullSharelinkPathByToken($share->getToken());
        $data = [
            "target_url" => $sharelink,
            "expiration" => $share->getExpirationDate()?->format(\DateTime::ATOM),
            "path" => $path,
            "uid" => $share->getId()
        ];
        
        $this->logger->warning('POST: share_id' . $share->getId());

        $response = $this->httpService->curl_post("link/api/external/", $data);
        return $response;
	}

	#[NoAdminRequired]
	#[ApiRoute(verb: 'DELETE', url: '/api/link')]
	public function delete(string $path): JSONResponse {
        $user = $this->userSession->getUser();
        $share = $this->shareService->getSharelink($user->getUID(), $path);
        // no share means no permalink
        if ($share === null || $share->getToken() === null) {
            return new JSONResponse(
                ['permalink' => null]
            );
        }

        $sharelink_path = $this->fullSharelinkPathByToken($share->getToken());
        // delete permalink in django app
        $response = $this->httpService->curl_delete("link/api/external/?target_url=" . urlencode($sharelink_path));
        if ($response->getStatus() != 200) {
            throw new OCSNotFoundException('Delete Error');
        }
        return $response;
    }

	#[NoAdminRequired]
	#[ApiRoute(verb: 'GET', url: '/api/link')]
	public function get(string $path): JSONResponse {
        $user = $this->userSession->getUser();
        $share = $this->shareService->getSharelink($user->getUID(), $path);

        // no share means no permalink
        if ($share === null || $share->getToken() === null) {
            return new JSONResponse(
                ['permalink' => null]
            );
        }
        $response = $this->httpService->curl_get("link/api/external/?uid=" . $share->getId());
        return new JSONResponse(
            $response->getData(),
        );
	}

    private function fullSharelinkPathByToken(string $token) : string {
        $currentOverwriteCliUrl = $this->config->getSystemValue('overwrite.cli.url', '');
        return $currentOverwriteCliUrl . "/index.php/s/" . $token;
    }
}
