<?php

return [
	'routes' => [
		['name' => 'settings#fetch', 'url' => '/settings', 'verb' => 'GET'],
		['name' => 'settings#save', 'url' => '/settings/save', 'verb' => 'POST'],
		['name' => 'api#get', 'url' => '/api/link', 'verb' => 'GET'],
		['name' => 'api#post', 'url' => '/api/link', 'verb' => 'POST'],
		['name' => 'api#delete', 'url' => '/api/link', 'verb' => 'DELETE'],
	]
];

