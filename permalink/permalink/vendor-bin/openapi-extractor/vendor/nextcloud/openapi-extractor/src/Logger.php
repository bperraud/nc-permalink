<?php

/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OpenAPIExtractor;

class Logger {
	public static bool $verbose = false;
	public static int $errorCount = 0;

	protected static function log(LoggerLevel $level, string $context, string $text): void {
		print(self::format($level, $context, $text));
	}

	protected static function format(LoggerLevel $level, string $context, string $text): string {
		$colorCode = match ($level) {
			LoggerLevel::Debug => '',
			LoggerLevel::Info => "\e[32m",
			LoggerLevel::Warning => "\e[33m",
			LoggerLevel::Error => "\e[91m",
		};
		return $colorCode . $level->value . ': ' . $context . ': ' . $text . "\n\e[0m";
	}

	public static function debug(string $context, string $text): void {
		if (Logger::$verbose) {
			self::log(LoggerLevel::Debug, $context, $text);
		}
	}

	public static function info(string $context, string $text): void {
		self::log(LoggerLevel::Info, $context, $text);
	}

	public static function warning(string $context, string $text): void {
		self::log(LoggerLevel::Warning, $context, $text);
	}

	public static function error(string $context, string $text): void {
		self::$errorCount++;
		self::log(LoggerLevel::Error, $context, $text);
	}

	/**
	 * @throws LoggerException
	 * @psalm-return no-return
	 */
	public static function panic(string $context, string $text): void {
		throw new LoggerException(LoggerLevel::Error, $context, $text);
	}
}
