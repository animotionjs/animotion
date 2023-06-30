import postcssPresetEnv from 'postcss-preset-env'

/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: [postcssPresetEnv()]
}

export default config
