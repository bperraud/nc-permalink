<?php

return [
	'routes' => [
		['name' => 'settings#fetch', 'url' => '/settings', 'verb' => 'GET'],
		['name' => 'settings#save', 'url' => '/settings/save', 'verb' => 'POST'],
		['name' => 'api#update', 'url' => '/api/update', 'verb' => 'POST'],
	]
];

