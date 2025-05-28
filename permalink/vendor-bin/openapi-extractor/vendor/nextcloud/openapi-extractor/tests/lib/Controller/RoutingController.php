<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Notifications\Controller;

use OCP\AppFramework\Http\Attribute\Route;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;

class RoutingController extends OCSController {
	/**
	 * OCS Route with attribute
	 * @return DataResponse<Http::STATUS_OK, list<empty>, array{}>
	 *
	 * 200: Success
	 */
	#[Route(Route::TYPE_API, verb: 'GET', url: '/attribute-ocs/{param}', requirements: ['param' => '[a-z]+'], defaults: ['param' => 'abc'], root: '/tests', postfix: 'Route')]
	#[ApiRoute(verb: 'POST', url: '/attribute-ocs/{param}', requirements: ['param' => '[a-z]+'], defaults: ['param' => 'abc'], root: '/tests', postfix: 'ApiRoute')]
	public function attributeOCS() {
		return DataResponse();
	}

	/**
	 * @NoCSRFRequired
	 *
	 * Index Route with attribute
	 * @return DataResponse<Http::STATUS_OK, list<empty>, array{}>
	 *
	 * 200: Success
	 */
	#[Route(Route::TYPE_FRONTPAGE, verb: 'GET', url: '/attribute-index/{param}', requirements: ['param' => '[a-z]+'], defaults: ['param' => 'abc'], root: '/tests', postfix: 'Route')]
	#[FrontpageRoute(verb: 'POST', url: '/attribute-index/{param}', requirements: ['param' => '[a-z]+'], defaults: ['param' => 'abc'], root: '/tests', postfix: 'FrontpageRoute')]
	public function attributeIndex() {
		return DataResponse();
	}

	/**
	 * Index Route with CSRF required
	 * @return DataResponse<Http::STATUS_OK, list<empty>, array{}>
	 *
	 * 200: Success
	 */
	#[FrontpageRoute(verb: 'PUT', url: '/attribute-index/{param}', requirements: ['param' => '[a-z]+'], defaults: ['param' => 'abc'], root: '/tests')]
	public function csrfIndex() {
		return DataResponse();
	}
}
