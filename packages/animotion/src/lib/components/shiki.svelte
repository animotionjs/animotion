<script lang="ts" context="module">
	import { bundledLanguages, getHighlighter } from 'shiki'
	import 'shiki-magic-move/dist/style.css'

	const highlighter = await getHighlighter({
		themes: ['poimandres'],
		langs: Object.keys(bundledLanguages)
	})
</script>

<script lang="ts">
	import { type BundledLanguage, type BundledTheme, type SpecialLanguage } from 'shiki'
	import { codeToKeyedTokens, createMagicMoveMachine } from 'shiki-magic-move/core'
	import { MagicMoveRenderer } from 'shiki-magic-move/renderer'
	import type { MagicMoveDifferOptions, MagicMoveRenderOptions } from 'shiki-magic-move/types'

	type Promises = Promise<unknown>[]
	type Lang = BundledLanguage | SpecialLanguage
	type Theme = BundledTheme
	type CodeProps = {
		code: string
		lang: Lang
		theme: Theme
		options?: MagicMoveRenderOptions & MagicMoveDifferOptions
		class?: string
	}

	let { code, lang, theme = 'poimandres', options = {}, ...props }: CodeProps = $props()

	let container: HTMLPreElement
	let machine: ReturnType<typeof createMagicMoveMachine>
	let renderer: MagicMoveRenderer
	let ready = false

	const is = {
		htmlEl: (el: Element): el is HTMLElement => el instanceof HTMLElement,
		token: (el: HTMLElement) => el.className.includes('shiki-magic-move-item'),
		newLine: (el: HTMLElement) => el.tagName === 'BR'
	}

	function indent(code: string) {
		const tabs = code
			.trim()
			.split('\n')
			.map((line) => line.split('').filter((char) => char === '\t'))
			.filter((line) => line.length !== 0)
			.sort((a, b) => a.length - b.length)[0]
			.join('')

		return code
			.trim()
			.split('\n')
			.map((line) => line.replace(tabs, ''))
			.join('\n')
	}

	async function init() {
		machine = createMagicMoveMachine(
			(code) => codeToKeyedTokens(highlighter, code, { lang, theme }, options.lineNumbers),
			options
		)
		renderer = new MagicMoveRenderer(container)
		Object.assign(renderer.options, options)
		const result = machine.commit(indent(code))
		renderer.render(result.current)
		ready = true
	}

	async function render(code: string) {
		if (!ready) return
		const result = machine.commit(indent(code))
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
		const selectedToDeselect = !selected && el.classList.contains('selected')
		const deselectedToSelect = selected && el.classList.contains('deselected')
		const nothingToDeselect =
			!selected && !el.classList.contains('deselected') && !el.classList.contains('deselected')
		const willTransition = selectedToDeselect || deselectedToSelect || nothingToDeselect
		willTransition ? (el.ontransitionend = resolve) : resolve('finished')
		el.classList.toggle('selected', selected)
		el.classList.toggle('deselected', !selected)
		return promise
	}

	export function selectLines(string: TemplateStringsArray) {
		const lines = getLines(string)
		const children = container.children
		const promises: Promises = []

		let currentLine = 1
		for (const child of children) {
			if (!is.htmlEl(child)) return
			if (is.token(child)) {
				let selected = false
				lines.length === 0 ? (selected = true) : (selected = lines.includes(currentLine))
				promises.push(transition(child, selected))
			}
			if (is.newLine(child)) currentLine++
		}
		return Promise.all(promises)
	}

	export function selectToken(string: TemplateStringsArray) {
		const selection = string[0].split(' ')
		const line = typeof +selection[0] === 'number' ? +selection[0] : false
		const children = container.children
		const promises: Promises = []

		let currentLine = 1
		for (const child of children) {
			if (!is.htmlEl(child)) return
			if (is.token(child)) {
				let selected = false
				if (line && line === currentLine) selected = selection.includes(child.textContent!)
				if (!line) selected = selection.includes(child.textContent!)
				promises.push(transition(child, selected))
			}
			if (is.newLine(child)) currentLine++
		}
		return Promise.all(promises)
	}

	$effect(() => {
		init()
	})
</script>

<pre bind:this={container} class="shiki-magic-move-container {props.class}" {...props}></pre>

<style>
	pre {
		tab-size: 2;
	}
</style>
