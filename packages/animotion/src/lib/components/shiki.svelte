<script lang="ts">
	import {
		type BundledLanguage,
		type BundledTheme,
		type HighlighterCore,
		type SpecialLanguage
	} from 'shiki'
	import { codeToKeyedTokens, createMagicMoveMachine } from 'shiki-magic-move/core'
	import { MagicMoveRenderer } from 'shiki-magic-move/renderer'
	import type { MagicMoveDifferOptions, MagicMoveRenderOptions } from 'shiki-magic-move/types'
	import { getHighlighter } from 'shiki'
	import '../styles/shiki.css'

	type Promises = Promise<unknown>[]
	type Lang = BundledLanguage | SpecialLanguage
	type Theme = BundledTheme
	type CodeProps = {
		code: string
		lang: Lang
		theme: Theme
		options?: MagicMoveRenderOptions & MagicMoveDifferOptions
		autoIndent?: boolean
		class?: string
	}

	let {
		code,
		lang,
		theme = 'poimandres',
		options = {},
		autoIndent = true,
		...props
	}: CodeProps = $props()

	if (options.duration) {
		options.duration = options.duration * 1000
	}

	let container: HTMLPreElement
	let highlighter: HighlighterCore
	let machine: ReturnType<typeof createMagicMoveMachine>
	let renderer: MagicMoveRenderer
	let ready = false

	const is = {
		htmlEl: (el: Element): el is HTMLElement => el instanceof HTMLElement,
		token: (el: HTMLElement) => el.className.includes('shiki-magic-move-item'),
		newLine: (el: HTMLElement) => el.tagName === 'BR'
	}

	function indent(text: string) {
		const code = text.trim().split('\n')

		if (code.length === 1) {
			return text.trim()
		}

		const tabs = code
			.map((line) => line.split('').filter((char) => char === '\t'))
			.filter((line) => line.length !== 0)
			.sort((a, b) => a.length - b.length)[0]
			.join('')

		if (tabs === '\t') {
			return text.trim()
		}

		return code.map((line) => line.replace(tabs, '')).join('\n')
	}

	async function init() {
		highlighter = await getHighlighter({
			themes: [theme],
			langs: [lang]
		})
		machine = createMagicMoveMachine(
			(code) => codeToKeyedTokens(highlighter, code, { lang, theme }, options.lineNumbers),
			options
		)
		renderer = new MagicMoveRenderer(container)
		Object.assign(renderer.options, options)
		const result = machine.commit(autoIndent ? indent(code) : code)
		renderer.render(result.current)
		ready = true
	}

	async function render(code: string) {
		if (!ready) return
		const result = machine.commit(autoIndent ? indent(code) : code)
		if (result.previous) renderer.replace(result.previous)
		await renderer.render(result.current)
	}

	export function update(code: TemplateStringsArray) {
		return render(code[0])
	}

	function getLines(string: TemplateStringsArray) {
		let range = string[0]
		if (range === '*') return []
		return range.split(',').flatMap((v) => v.split('-').map(Number))
	}

	function transition(el: HTMLElement, selected: boolean) {
		const { promise, resolve } = Promise.withResolvers()

		const selectToDeselect = !selected && el.classList.contains('selected')
		const deselectToSelect = selected && el.classList.contains('deselected')
		const nothingToDeselect = !selected && !el.classList.contains('deselected')

		const willTransition = selectToDeselect || deselectToSelect || nothingToDeselect

		if (willTransition) {
			el.ontransitionend = resolve
		} else {
			resolve('finished')
		}

		el.classList.toggle('selected', selected)
		el.classList.toggle('deselected', !selected)

		return promise
	}

	export function selectLines(string: TemplateStringsArray) {
		const lines = getLines(string)
		const tokens = container.children
		const promises: Promises = []

		let currentLine = 1

		for (const token of tokens) {
			if (!is.htmlEl(token)) {
				return
			}

			if (is.token(token)) {
				let selected = false
				lines.length === 0 ? (selected = true) : (selected = lines.includes(currentLine))
				promises.push(transition(token, selected))
			}

			if (is.newLine(token)) {
				currentLine++
			}
		}

		return Promise.all(promises)
	}

	export function selectToken(string: TemplateStringsArray) {
		const selection = string[0].split(' ')
		const isLineNumber = !isNaN(+selection[0])
		const line = isLineNumber ? +selection[0] : 0
		const tokens = container.children
		const promises: Promises = []

		let currentLine = 1

		for (const token of tokens) {
			if (!is.htmlEl(token)) return

			if (is.token(token)) {
				let selected = false

				if (isLineNumber && line === currentLine) {
					selected = selection.includes(token.textContent!)
				}
				if (!isLineNumber) {
					selected = selection.includes(token.textContent!)
				}

				promises.push(transition(token, selected))
			}

			if (is.newLine(token)) {
				currentLine++
			}
		}

		return Promise.all(promises)
	}

	$effect(() => {
		init()
	})
</script>

<pre bind:this={container} {...props} class="shiki-magic-move-container {props.class}"></pre>
