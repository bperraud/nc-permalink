module.exports = {
	extends: [
		// '@nextcloud',
        '@nextcloud/eslint-config/typescript',
	],
	rules: {
        '@typescript-eslint/func-call-spacing': 'off', // <--- disable inherited rule
        'func-call-spacing': ['error', 'never'],
		'jsdoc/require-jsdoc': 'off',
		'vue/first-attribute-linebreak': 'off',
        "indent": ["error", 4],
        "no-mixed-spaces-and-tabs": "error"
	},
}
