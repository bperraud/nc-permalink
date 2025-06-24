// vite.config.mts
import { createAppConfig } from "file:///home/bperraud/code/nc-permalink/node_modules/@nextcloud/vite-config/dist/index.js";
import eslint from "file:///home/bperraud/code/nc-permalink/node_modules/vite-plugin-eslint/dist/index.mjs";
import stylelint from "file:///home/bperraud/code/nc-permalink/node_modules/vite-plugin-stylelint/dist/index.mjs";
var isProduction = process.env.NODE_ENV === "production";
var vite_config_default = createAppConfig(
  {
    settingsAdmin: "src/settings_admin.ts",
    main: "src/main.ts"
  },
  {
    config: {
      css: {
        modules: {
          localsConvention: "camelCase"
        },
        preprocessorOptions: {
          scss: {
            api: "modern-compiler"
          }
        }
      },
      plugins: [eslint(), stylelint()]
    },
    inlineCSS: { relativeCSSInjection: true },
    minify: isProduction
  }
);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvYnBlcnJhdWQvY29kZS9uYy1wZXJtYWxpbmtcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2JwZXJyYXVkL2NvZGUvbmMtcGVybWFsaW5rL3ZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9icGVycmF1ZC9jb2RlL25jLXBlcm1hbGluay92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgeyBjcmVhdGVBcHBDb25maWcgfSBmcm9tICdAbmV4dGNsb3VkL3ZpdGUtY29uZmlnJ1xuaW1wb3J0IGVzbGludCBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXG5pbXBvcnQgc3R5bGVsaW50IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlbGludCdcblxuY29uc3QgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVBcHBDb25maWcoXG5cdHtcblx0XHRzZXR0aW5nc0FkbWluOiAnc3JjL3NldHRpbmdzX2FkbWluLnRzJyxcblx0XHRtYWluOiAnc3JjL21haW4udHMnLFxuXHR9LFxuXHR7XG5cdFx0Y29uZmlnOiB7XG5cdFx0XHRjc3M6IHtcblx0XHRcdFx0bW9kdWxlczoge1xuXHRcdFx0XHRcdGxvY2Fsc0NvbnZlbnRpb246ICdjYW1lbENhc2UnLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG5cdFx0XHRcdFx0c2Nzczoge1xuXHRcdFx0XHRcdFx0YXBpOiAnbW9kZXJuLWNvbXBpbGVyJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHBsdWdpbnM6IFtlc2xpbnQoKSwgc3R5bGVsaW50KCldLFxuXHRcdH0sXG5cdFx0aW5saW5lQ1NTOiB7IHJlbGF0aXZlQ1NTSW5qZWN0aW9uOiB0cnVlIH0sXG5cdFx0bWluaWZ5OiBpc1Byb2R1Y3Rpb24sXG5cdH0sXG4pXG5cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1IsU0FBUyx1QkFBdUI7QUFDcFQsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZUFBZTtBQUV0QixJQUFNLGVBQWUsUUFBUSxJQUFJLGFBQWE7QUFFOUMsSUFBTyxzQkFBUTtBQUFBLEVBQ2Q7QUFBQSxJQUNDLGVBQWU7QUFBQSxJQUNmLE1BQU07QUFBQSxFQUNQO0FBQUEsRUFDQTtBQUFBLElBQ0MsUUFBUTtBQUFBLE1BQ1AsS0FBSztBQUFBLFFBQ0osU0FBUztBQUFBLFVBQ1Isa0JBQWtCO0FBQUEsUUFDbkI7QUFBQSxRQUNBLHFCQUFxQjtBQUFBLFVBQ3BCLE1BQU07QUFBQSxZQUNMLEtBQUs7QUFBQSxVQUNOO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxNQUNBLFNBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0FBQUEsSUFDaEM7QUFBQSxJQUNBLFdBQVcsRUFBRSxzQkFBc0IsS0FBSztBQUFBLElBQ3hDLFFBQVE7QUFBQSxFQUNUO0FBQ0Q7IiwKICAibmFtZXMiOiBbXQp9Cg==
