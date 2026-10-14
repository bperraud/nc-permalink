<?php

namespace OCA\Permalink\Listener;

use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Share\Events\ShareDeletedEvent;
use Psr\Log\LoggerInterface;
use OCA\Permalink\Service\ShareService;
use OCA\Permalink\Service\HttpRequestService;
use OCP\IConfig;

use OCP\Files\Node;
use OCP\Files\NotFoundException;


class ShareDeletedListener implements IEventListener {
	public function __construct(
		private readonly LoggerInterface $logger,
        private readonly ShareService $shareService,
        private readonly HttpRequestService $httpService,
		private IConfig $config,
	) {
	}

	public function handle(Event $event): void {
		if (!($event instanceof ShareDeletedEvent)) {
			return;
		}
		$share = $event->getShare();

        try {
            $node = $share->getNode();
            $path = $node->getPath();

            $this->logger->info('Shared file path', [
                'path' => $path,
            ]);
        } catch (NotFoundException $e) {
            $this->logger->info('Cannot retrieve path: shared node no longer exists');
            $path = null;
        }
        # delete permalink in django app
        $response = $this->httpService->curl_delete("link/api/v1/?uid=" . $share->getId() . "&path=" . $path);
	}
}
