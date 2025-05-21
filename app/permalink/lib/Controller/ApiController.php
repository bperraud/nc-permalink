<?php

declare(strict_types=1);

namespace OCA\Permalink\Controller;

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
use OCA\Permalink\Service\HttpRequestService;
use OCP\IConfig;

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
        $share = $this->shareService->getOrCreateSharelink($user->getUID(), $path);
        $sharelink = $this->fullSharelinkPathByToken($share->getToken());
        
        $data = [
            "target_url" => $sharelink,
            "expiration" => $share->getExpirationDate()?->format(\DateTime::ATOM),
            "path" => $path,
            "uid" => $share->getId()
        ];

        $response = $this->httpService->curl_post("link/api/external/", $data);

        return $response;
	}

	#[NoAdminRequired]
	#[ApiRoute(verb: 'DELETE', url: '/api/link')]
	public function delete(string $path): DataResponse {
        $user = $this->userSession->getUser();
        $share = $this->shareService->getSharelink($user->getUID(), $path);

        // no share means no permalink
        if ($share === null) {
            return new DataResponse(
                ['permalink' => null]
            );
        }

        $sharelink_path = $this->fullSharelinkPathByToken($share->getToken());

        // delete permalink in django app
        $response = $this->httpService->curl_delete("link/api/external/?target_url=" . urlencode($sharelink_path));

        if ($response->getStatus() != 200) {
            throw new OCSNotFoundException($this->l10n->t('Delete Error'));
        }
		
        return $response;
    }

	#[NoAdminRequired]
	#[ApiRoute(verb: 'GET', url: '/api/link')]
	public function get(string $path): DataResponse {
        $user = $this->userSession->getUser();
        $share = $this->shareService->getSharelink($user->getUID(), $path);

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
        $response = $this->httpService->curl_get("link/api/external/?target_url=" . urlencode($sharelink));

        if ($response->getStatus() != 200) {
            return new DataResponse(
                ['permalink' => null]
            );
        }

        return $response;
	}

    private function fullSharelinkPathByToken(string $token) : string {
        $currentOverwriteCliUrl = $this->config->getSystemValue('overwrite.cli.url', '');
        return $currentOverwriteCliUrl . "/index.php/s/" . $token;
    }



}
