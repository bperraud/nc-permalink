<?php

declare(strict_types=1);

/**
 * @copyright Copyright (c) 2023 Joas Schilling <coding@schilljs.com>
 *
 * @author Joas Schilling <coding@schilljs.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

namespace OCP\AppFramework\Http\Attribute;

use Attribute;

/**
 * Attribute for controller methods that require the password to be confirmed with in the last 30 minutes
 *
 * @since 27.0.0
 */
#[Attribute]
class PasswordConfirmationRequired {
	/**
	 * @param bool $strict - Whether password confirmation needs to happen in the request.
	 *
	 * @since 31.0.0
	 */
	public function __construct(
		protected bool $strict = false,
	) {
	}

	/**
	 * @since 31.0.0
	 */
	public function getStrict(): bool {
		return $this->strict;
	}

}
