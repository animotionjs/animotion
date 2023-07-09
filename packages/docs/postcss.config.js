import postcssPresetEnv from 'postcss-preset-env'
import tailwindcss from 'tailwindcss'

/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: [tailwindcss(), postcssPresetEnv()]
}

export default config
