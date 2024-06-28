import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import sveltemark from './src/lib/sveltemark/index.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [sveltemark(), vitePreprocess()],
	kit: {
		adapter: adapter(),
	}
}

export default config
