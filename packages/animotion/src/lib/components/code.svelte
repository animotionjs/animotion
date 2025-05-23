<script lang="ts">
	import Action from '$lib/components/action.svelte'
	import Code from '$lib/components/code.svelte'
	import {
		type BundledLanguage,
		type BundledTheme,
		type HighlighterCore,
		type SpecialLanguage
	} from 'shiki'
	import { codeToKeyedTokens, createMagicMoveMachine } from 'shiki-magic-move/core'
	import { MagicMoveRenderer } from 'shiki-magic-move/renderer'
	import type { MagicMoveDifferOptions, MagicMoveRenderOptions } from 'shiki-magic-move/types'
	import { createHighlighter } from 'shiki'
	import '../styles/shiki.css'

	type Promises = Promise<unknown>[]
	type Lang = BundledLanguage | SpecialLanguage
	type Theme = BundledTheme
	type CodeProp = {
		code: string
		codes?: never
	}
	type CodesProp = {
		code?: never
		codes: string[]
	}
	type CodeProps = (CodeProp | CodesProp) & {
		lang: Lang
		theme: Theme
		options?: MagicMoveRenderOptions & MagicMoveDifferOptions
		autoIndent?: boolean
		class?: string
		ref?: (self: ReturnType<typeof Code>) => void
	}

	let {
		code,
		codes,
		lang,
		theme = 'poimandres',
		options = {},
		autoIndent = true,
		...props
	}: CodeProps = $props()

	let container: HTMLPreElement | undefined = $state()
	let self: ReturnType<typeof Code> | undefined = $state()
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
		if (!/\t/.test(text.trim())) {
			return text
		}

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
		if (!container) return
		highlighter = await createHighlighter({
			themes: [theme],
			langs: [lang]
		})
		machine = createMagicMoveMachine(
			(code) => codeToKeyedTokens(highlighter, code, { lang, theme }, options.lineNumbers),
			options
		)
		renderer = new MagicMoveRenderer(container)
		Object.assign(renderer.options, options)
		const result = machine.commit(autoIndent ? indent(code!) : code!)
		renderer.render(result.current)
		ready = true
	}

	async function render(code: string) {
		if (!ready) return
		const result = machine.commit(autoIndent ? indent(code) : code)
		if (result.previous) renderer.replace(result.previous)
		await renderer.render(result.current)
	}

	function merge(strings: TemplateStringsArray, expressions: string[]) {
		let code = []
		for (let i = 0; i < strings.length; i++) {
			code.push(strings[i])
			if (expressions[i]) {
				code.push(expressions[i].trim())
			}
		}
		return code.join('')
	}

	export function update(strings: TemplateStringsArray, ...expressions: string[]) {
		if (expressions.length > 0) {
			return render(merge(strings, expressions))
		}
		return render(strings[0])
	}

	function createRange(start: number, end: number) {
		return Array.from({ length: end - start + 1 }, (_, index) => start + index)
	}

	function getLines(string: TemplateStringsArray) {
		let range = string[0]

		// code.selectLines`1,2`
		// code.selectLines`1,2,3,4`
		// code.selectLines`1-4`
		// code.selectLines`1-4,8`
		// code.selectLines`*`

		if (range === '*') {
			return []
		}

		return range.split(',').flatMap((number) => {
			if (number.includes('-')) {
				const [start, end] = number.split('-')
				return createRange(+start, +end)
			} else {
				return +number
			}
		})
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
		if (!container) return

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
		if (!container) return

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

	if (props.ref) {
		$effect(() => {
			props.ref?.(self!)
		})
	}
</script>

{#if codes}
	<Code bind:this={self} code={codes[0]} {lang} {theme} {options} {autoIndent} {...props} />

	{#each codes as _, i}
		{#if codes[i + 1]}
			<Action do={() => self!.update`${codes[i + 1]}`} undo={() => self!.update`${codes[i]}`} />
		{/if}
	{/each}
{:else}
	<pre bind:this={container} {...props} class="shiki-magic-move-container {props.class}"></pre>
{/if}
