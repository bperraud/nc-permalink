<?php

namespace OCA\Permalink\Controller;

use OCA\Permalink\AppInfo\AppConstants;
use OCA\Permalink\Enums\LinkLabelMode;
use OCA\Permalink\Enums\SettingsKey;
use OCA\Permalink\Service\HttpRequestService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Services\IAppConfig;
use OCP\IRequest;
use ValueError;

class SettingsController extends Controller {
	public function __construct(
		string $appName,
        private readonly HttpRequestService $httpService,
		private readonly IAppConfig $appConfig,
		private readonly AppConstants $appConstants,
		IRequest $request,
	) {
		parent::__construct($appName, $request);
	}

	public function save(string $key, string $value): JSONResponse {
		try {
			$settings_key = SettingsKey::from($key);
			switch ($settings_key) {
				case SettingsKey::JwtSecretKey:
                    $this->appConfig->setAppValueString($settings_key->value, $value);
                    return new JSONResponse(['message' => 'Saved : ' . $value], Http::STATUS_OK);
					break;
				case SettingsKey::PermalinkApiEndpoint:
                    $old_value = $this->appConfig->getAppValueString(SettingsKey::PermalinkApiEndpoint->value, "");
                    $this->appConfig->setAppValueString($settings_key->value, $value);
                    $response = $this->httpService->curl_get("status/");
                    if ($response->getStatus() == 200) {
                        return new JSONResponse(['message' => 'Saved : ' . $value], Http::STATUS_OK);
                    }
                    $this->appConfig->setAppValueString($settings_key->value, $old_value);
                    return new JSONResponse(['message' => 'Error, endpoint is not reachable ' . $value], Http::STATUS_BAD_GATEWAY);
					break;
			}
		} catch (ValueError) {
		}
		return new JSONResponse(['message' => 'Invalid key or value'], Http::STATUS_BAD_REQUEST);
	}

	public function fetch(): JSONResponse {
		$settings = [
			'jwtSecretKey' => $this->appConfig->getAppValueString(SettingsKey::JwtSecretKey->value, ""),
			'permalinkApiEndpoint' => $this->appConfig->getAppValueString(SettingsKey::PermalinkApiEndpoint->value, "")
		];

		return new JSONResponse($settings, Http::STATUS_OK);
	}
}

