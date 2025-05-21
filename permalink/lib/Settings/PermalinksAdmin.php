<?php

namespace OCA\Permalink\Settings;

use OCA\Permalink\AppInfo\AppConstants;
use OCA\Permalink\AppInfo\Application;
use OCA\Permalink\Enums\SettingsKey;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Services\IAppConfig;
use OCP\Settings\ISettings;
use OCP\Util;

class PermalinksAdmin implements ISettings {
	public function __construct(
		private readonly IAppConfig $appConfig,
		private readonly AppConstants $appConstants,
	) {
	}

	public function getForm(): TemplateResponse {
		$parameters = [
			'jwtSecretKey' => $this->appConfig->getAppValueString(SettingsKey::JwtSecretKey->value, ""),
			'permalinkApiEndpoint' => $this->appConfig->getAppValueString(SettingsKey::PermalinkApiEndpoint->value, "")
		];

		Util::addScript(Application::APP_ID, 'permalink-settingsAdmin');
		return new TemplateResponse(Application::APP_ID, 'admin', $parameters, '');
	}

	public function getSection(): string {
		return Application::APP_ID;
	}

	public function getPriority(): int {
		return 10;
	}
}
