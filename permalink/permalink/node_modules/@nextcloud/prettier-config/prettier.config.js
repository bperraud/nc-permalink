/**
 * SPDX-FileCopyrightText: 2024 Ferdinand Thiessen <opensource@fthiessen.de>
 * SPDX-License-Identifier: MIT
 */

/**
 * @type {import("prettier").Config}
 */
export default {
	// We always use tabs with 4 spaces tab width
	useTabs: true,
	tabWidth: 4,
	// Allow brackets to be on the same line, required for Vue
	bracketSameLine: true,
	// Never enforce semicolons if not required
	semi: false,
	// Always use single quote over double quote (' instead of ")
	singleQuote: true,
	// Enforce parenthesis for arrow functions
	arrowParens: 'always',
	// Always enforce a trailing comma
	trailingComma: 'all',
	// This is not a hard limit! We need 85 to keep changes from ESLint migration small
	printWidth: 85,
	// Operators should always be on the start
	experimentalOperatorPosition: 'start',

	// Some additional rules
	plugins: [
		// Make package.json consistent
		'prettier-plugin-packagejson',
	],

	overrides: [
		// For package.json we need other indention as Node decided to only support spaces, so otherwise it would be reformatted on every npm install
		{
			files: ['package.json', 'package-lock.json'],
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
		// For GitHub workflow files we use 2 spaces
		{
			files: ['.github/**/*.yml'],
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
}
