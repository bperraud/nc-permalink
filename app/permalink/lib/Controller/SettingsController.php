<?php

namespace OCA\Permalink\Controller;

use OCA\Permalink\AppInfo\AppConstants;
use OCA\Permalink\Enums\LinkLabelMode;
use OCA\Permalink\Enums\SettingsKey;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Services\IAppConfig;
use OCP\IRequest;
use ValueError;

class SettingsController extends Controller {
	public function __construct(
		string $appName,
		private readonly IAppConfig $appConfig,
		private readonly AppConstants $appConstants,
		IRequest $request,
	) {
		parent::__construct($appName, $request);
	}

	public function save(string $key, string $value): DataResponse {
		try {
			$settings_key = SettingsKey::from($key);
			switch ($settings_key) {
				case SettingsKey::JwtSecretKey:
                    $this->appConfig->setAppValueString($settings_key->value, $value);
                    return new DataResponse(['message' => 'Saved : ' . $value], Http::STATUS_OK);
					break;
				case SettingsKey::PermalinkApiEndpoint:
                    $this->appConfig->setAppValueString($settings_key->value, $value);
                    return new DataResponse(['message' => 'Saved : ' . $value], Http::STATUS_OK);
					break;
			}
		} catch (ValueError) {
		}
		return new DataResponse(['message' => 'Invalid key or value'], Http::STATUS_BAD_REQUEST);
	}

	public function fetch(): DataResponse {
		$settings = [
			'jwtSecretKey' => $this->appConfig->getAppValueString(SettingsKey::JwtSecretKey->value, ""),
			'permalinkApiEndpoint' => $this->appConfig->getAppValueString(SettingsKey::PermalinkApiEndpoint->value, "")
		];

		return new DataResponse($settings, Http::STATUS_OK);
	}
}

