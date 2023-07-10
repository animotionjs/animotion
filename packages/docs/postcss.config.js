import postcssPresetEnv from 'postcss-preset-env'
import tailwindcss from 'tailwindcss'
import nesting from 'tailwindcss/nesting/index.js'

/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: [nesting, tailwindcss(), postcssPresetEnv({
		features: {
			// https://tailwindcss.com/docs/using-with-preprocessors#nesting
			'nesting-rules': false
		}
	})]
}

export default config
