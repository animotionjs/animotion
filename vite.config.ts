import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-auto';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter()
		})
	],
	test: {
		browser: {
			provider: playwright({
				contextOptions: {
					colorScheme: 'dark'
				}
			}),
			enabled: true,
			instances: [{ browser: 'chromium' }],
			headless: true
		}
	}
});
