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

		return;
		$share = $event->getShare();
		$shareId = $share->getId();
		$sharedBy = $share->getSharedBy();
        $sharelink = $this->fullSharelinkPathByToken($share->getToken());
        $response = $this->httpService->curl_get("link/api/external/?target_url=" . urlencode($sharelink));

        # no permalink
        if ($response['status_code'] != 200) {
            $this->logger->error("no permalink");
            return;
        }

        $old_token = $response["data"]["token"];
        $path = substr($share->getNode()->getInternalPath(), strlen('files/'));
        $this->logger->error("Share with ID $shareId and path $path");

        try {
            $new_share = $this->shareService->getOrCreateSharelink($sharedBy, $path);
        } catch (\Throwable $e) {
            $this->logger->error('Failed to recreate share: ' . $e->getMessage());
            return ;
        }

        $sharelink = $this->fullSharelinkPathByToken($new_share->getToken());

        $data = [
            "target_url" => $sharelink,
            "token" => $old_token,
        ];

        $response = $this->httpService->curl_put("link/api/external/", $data);

	}

    private function fullSharelinkPathByToken(string $token) : string {
        $currentOverwriteCliUrl = $this->config->getSystemValue('overwrite.cli.url', '');
        return $currentOverwriteCliUrl . "/index.php/s/" . $token;
    }

}

