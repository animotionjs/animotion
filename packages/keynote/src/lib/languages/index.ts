import { svelte } from './svelte'
import type { Hljs } from './types'

export function registerLanguages(hljs: Hljs) {
	hljs.registerLanguage('svelte', svelte)
}
