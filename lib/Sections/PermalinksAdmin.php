<?php

namespace OCA\Permalink\Sections;

use OCA\Permalink\AppInfo\Application;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Settings\IIconSection;

class PermalinksAdmin implements IIconSection {

	public function __construct(
		private readonly IL10N $l10n,
		private readonly IURLGenerator $urlGenerator,
	) {
	}

	public function getID(): string {
		return Application::APP_ID;
	}

	public function getName(): string {
		return 'Permalink';
	}

	public function getPriority(): int {
		return 98;
	}

	public function getIcon(): string {
		return $this->urlGenerator->imagePath('core', 'actions/settings-dark.svg');
	}
}

