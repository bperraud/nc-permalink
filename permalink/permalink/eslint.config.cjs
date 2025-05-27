const {
    defineConfig,
} = require("eslint/config");

const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    extends: compat.extends("@nextcloud"),

    rules: {
        "jsdoc/require-jsdoc": "off",
        "vue/first-attribute-linebreak": "off",
        "indent": ["error", 4],
        "no-mixed-spaces-and-tabs": "error",
    },
}]);
