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

/**
 * @psalm-suppress UnusedClass
 */
class ApiController extends OCSController {

    /* public function __construct( */
    /*     string        $AppName, */
    /*     \OCP\IRequest $request, */
    /*     private ShareManager $shareManager, */
    /*     private IRootFolder  $rootFolder, */
    /*     private string       $userId        // injected current user */
    /* ) { */
    /*     parent::__construct($AppName, $request); */
    /* } */
    public function __construct(
		string $appName,
		IRequest $request,
		private readonly IManager $shareManager,
		private readonly IRootFolder $rootFolder,
		private readonly ?string $userId,
        private IUserSession $userSession,
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
        /* [ */
			/* 'path' => $path, 'tokenCandidate' => $tokenCandidate, 'password' => $password, */
		/* ] = $this->request->getParams(); */
        

        /* $link = $this->getSharedLink('Media/Big_Buck_Bunny_1080_10s_10MB.mkv'); */
        $link = $this->getSharedLink('/Media/photo-1527668441211-67a036f77ab4.jpeg');
        
		return new DataResponse(
			['link' => $link]
		);
	}

    private function getSharedLink(string $filePath) {
        /* $node   = $service->getUserFolder($this->$userId)->get(fileLink); */
        /* $shares = $this->shareManager->getSharesInFolder($user->getUID(), $node); */
        /* $shares = $this->shareManager->getSharesByPath($user->getUID(), $node); */
        $user = $this->userSession->getUser();
        $userFolder = $this->rootFolder->getUserFolder($user->getUID());
        $node =  $userFolder->get($filePath);
        
        /* $shares = $this->shareManager->getShareById('9', $user->getUID()); */
        $shares = $this->shareManager->getShareById(1, $user->getUID());

        /* $shares = $this->shareManager->getSharesBy( */
        /*     $user->getUID(), */
        /*     null, */
        /*     $node, */
        /*     true, */
        /*     -1, */
        /*     0, */
        /*     false */
        /*   ); */

        $link = $shares ? $shares->getLink() : 'empty';
        /* $link = $shares ? $shares[0]->getLink() : 'empty'; */
        return $link;
        

    }

}
