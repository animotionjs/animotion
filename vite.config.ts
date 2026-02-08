import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
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
})
