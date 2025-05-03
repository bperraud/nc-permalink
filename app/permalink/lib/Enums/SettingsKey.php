<?php

namespace OCA\Permalink\Enums;

enum SettingsKey: string {
	case DefaultLabelMode = 'default_label_mode';
	case DefaultCustomLabel = 'default_label';
	case MinTokenLength = 'min_token_length';
	case DeleteRemovedShareConflicts = 'deleteRemovedShareConflicts';
	case JwtSecretKey = 'jwt_secret_key';
	case PermalinkApiEndpoint = 'permalink_api_endpoint';
}

