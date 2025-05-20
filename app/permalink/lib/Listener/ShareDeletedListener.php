<?php

namespace OCA\Permalink\Listener;

use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Share\Events\ShareDeletedEvent;
use Psr\Log\LoggerInterface;
use OCA\Permalink\Service\ShareService;
use OCA\Permalink\Service\HttpRequestService;
use OCP\IConfig;

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
        $sharelink = $this->fullSharelinkPathByToken($share->getToken());
        $response = $this->httpService->curl_get("link/api/external/?target_url=" . urlencode($sharelink));

        # no permalink
        if ($response->getStatus() != 200) {
            $this->logger->error("no permalink");
            return;
        }

        # delete permalink in django app
        $sharelink_path = $this->fullSharelinkPathByToken($share->getToken());
        $response = $this->httpService->curl_delete("link/api/external/?target_url=" . urlencode($sharelink_path));

	}

    private function fullSharelinkPathByToken(string $token) : string {
        $currentOverwriteCliUrl = $this->config->getSystemValue('overwrite.cli.url', '');
        return $currentOverwriteCliUrl . "/index.php/s/" . $token;
    }

}

