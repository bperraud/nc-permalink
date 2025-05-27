<?php

/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OpenAPIExtractor;

class ControllerMethodResponse {
	/**
	 * @param array<string, OpenApiType>|null $headers
	 */
	public function __construct(
		public string $className,
		public int $statusCode,
		public ?string $contentType = null,
		public ?OpenApiType $type = null,
		public ?array $headers = null,
	) {
	}
}
