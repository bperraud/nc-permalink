<?php

namespace OCA\Permalink\Listener;

use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Share\Events\ShareDeletedEvent;
use Psr\Log\LoggerInterface;

class ShareDeletedListener implements IEventListener {
	public function __construct(
		private readonly LoggerInterface $logger,
	) {
	}

	public function handle(Event $event): void {
		if (!($event instanceof ShareDeletedEvent)) {
			return;
		}

		$share = $event->getShare();
		$shareId = $share->getId();
		$sharedBy = $share->getSharedBy();

		$this->logger->error("Share with ID $shareId deleted by $sharedBy");
	}
}

