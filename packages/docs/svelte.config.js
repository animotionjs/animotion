import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import sveltemark from './src/lib/sveltemark/index.js'

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [sveltemark(), vitePreprocess()],
	kit: {
		adapter: adapter(),
		paths: {
			base: dev ? '' : '/animotion'
		}
	}
}

export default config
