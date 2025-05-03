<?php

namespace OCA\Permalink\Enums;

enum SettingsKey: string {
	case JwtSecretKey = 'jwt_secret_key';
	case PermalinkApiEndpoint = 'permalink_api_endpoint';
}

