<?php

/**
 * Configurable Share Links for Nextcloud
 *
 * @copyright Copyright (C) 2022  Filip Joska <filip@joska.dev>
 *
 * @author Filip Joska <filip@joska.dev>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

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

