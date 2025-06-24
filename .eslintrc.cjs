module.exports = {
	globals: {
		appVersion: true,
	},
	parserOptions: {
		requireConfigFile: false,
	},
	extends: ['@nextcloud', 'prettier'],
	rules: {
        "indent": ["error", 4],
		'jsdoc/require-jsdoc': 'off',
		'jsdoc/tag-lines': 'off',
		'vue/first-attribute-linebreak': 'off',
		'import/extensions': 'off',
        "no-mixed-spaces-and-tabs": "error",
        "func-call-spacing": ["error", "never"],
        "no-console": "warn"
	},
}

