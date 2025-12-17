<?php

declare(strict_types=1);

namespace OCA\Permalink\AppInfo;

use OCP\AppFramework\App;
use OCP\Util;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;

use OCP\Share\Events\ShareDeletedEvent;
use OCA\Permalink\Listener\ShareDeletedListener;

class Application extends App implements IBootstrap {
	public const APP_ID = 'permalink';

	/** @psalm-suppress PossiblyUnusedMethod */
	public function __construct() {
		parent::__construct(self::APP_ID);
	}


    public function register(IRegistrationContext $context): void {
		/**
		 * Listen for ShareDeletedEvent (force recreation if link to a permalink)
		 */
		$context->registerEventListener(ShareDeletedEvent::class, ShareDeletedListener::class);
	}


	public function boot(IBootContext $context): void {
        Util::addScript(self::APP_ID, 'permalink-main');
	}
}
