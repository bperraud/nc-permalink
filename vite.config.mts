import { createAppConfig } from '@nextcloud/vite-config'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'

const isProduction = process.env.NODE_ENV === 'production'

export default createAppConfig(
	{
		settingsAdmin: 'src/settings_admin.ts',
		main: 'src/main.ts',
	},
	{
		config: {
			css: {
				modules: {
					localsConvention: 'camelCase',
				},
				preprocessorOptions: {
					scss: {
						api: 'modern-compiler',
					},
				},
			},
			plugins: [eslint(), stylelint()],
		},
		inlineCSS: { relativeCSSInjection: true },
		minify: isProduction,
	},
)

