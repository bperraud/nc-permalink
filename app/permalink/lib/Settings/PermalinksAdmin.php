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
			'defaultLabelMode' => $this->appConfig->getAppValueInt(SettingsKey::DefaultLabelMode->value, $this->appConstants::DEFAULT_LABEL_MODE),
			'defaultLabel' => $this->appConfig->getAppValueString(SettingsKey::DefaultCustomLabel->value, $this->appConstants::DEFAULT_CUSTOM_LABEL),
			'minTokenLength' => $this->appConfig->getAppValueInt(SettingsKey::MinTokenLength->value, $this->appConstants::DEFAULT_MIN_TOKEN_LENGTH),
			'deleteRemovedShareConflicts' => $this->appConfig->getAppValueBool(SettingsKey::DeleteRemovedShareConflicts->value, $this->appConstants::DEFAULT_DELETE_REMOVED_SHARE_CONFLICTS)
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
