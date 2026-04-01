<script lang="ts" module>
	import { createHighlighter } from 'shiki'
	import type { KeyedToken, KeyedTokensInfo } from 'shiki-magic-move/types'

	type KeyedTokenWithLine = KeyedToken & { line: number }

	const highlighterCache = new Map<string, Promise<HighlighterCore>>()

	function getHighlighter(theme: Theme, lang: Lang) {
		const key = `${theme}-${lang}`
		if (!highlighterCache.has(key)) {
			highlighterCache.set(key, createHighlighter({ themes: [theme], langs: [lang] }))
		}
		return highlighterCache.get(key)!
	}

	function splitPunctuationTokens(result: KeyedTokensInfo): KeyedTokensInfo {
		// only split bracket characters and operators like =>, +=, === should stay together
		const brackets = /[{}\[\]()]/g
		const newTokens: KeyedToken[] = []
		let tokenIndex = 0

		for (const token of result.tokens) {
			if (token.content === '\n') {
				newTokens.push(token)
				tokenIndex++
				continue
			}

			const matches = [...token.content.matchAll(brackets)]
			if (matches.length === 0) {
				newTokens.push(token)
				tokenIndex++
				continue
			}

			const splitPositions = matches.map((m) => m.index!)

			// collect split positions as [start, end] pairs
			let lastEnd = 0
			const splits: { content: string; offset: number }[] = []

			for (const pos of splitPositions) {
				if (pos > lastEnd) {
					splits.push({
						content: token.content.slice(lastEnd, pos),
						offset: token.offset + lastEnd
					})
				}
				splits.push({
					content: token.content.slice(pos, pos + 1),
					offset: token.offset + pos
				})
				lastEnd = pos + 1
			}

			if (lastEnd < token.content.length) {
				splits.push({
					content: token.content.slice(lastEnd),
					offset: token.offset + lastEnd
				})
			}

			for (let i = 0; i < splits.length; i++) {
				newTokens.push({
					...token,
					content: splits[i].content,
					offset: splits[i].offset,
					key: i === 0 ? token.key : `${token.key}-${i}`
				})
			}
			tokenIndex++
		}

		return { ...result, tokens: newTokens }
	}
</script>

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

	let currentCode: string = ''
	let currentTokens: (KeyedToken & { line: number })[] = []

	const is = {
		htmlEl: (el: Element): el is HTMLElement => el instanceof HTMLElement,
		token: (el: HTMLElement) => el.className.includes('shiki-magic-move-item'),
		newLine: (el: HTMLElement) => el.tagName === 'BR'
	}

	export function indent(text: string) {
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

	function parseSelection(raw: string): {
		line: number | null
		index: number | null
		pattern: string
	} {
		let line: number | null = null
		let index: number | null = null
		let pattern = raw.trim()

		const indexMatch = pattern.match(/:(\d+)$/)
		if (indexMatch) {
			index = parseInt(indexMatch[1], 10)
			pattern = pattern.slice(0, -indexMatch[0].length).trim()
		}

		const parts = pattern.split(/\s+/)
		if (parts.length > 0 && /^\d+$/.test(parts[0])) {
			line = parseInt(parts[0], 10)
			pattern = parts.slice(1).join(' ')
		}

		return { line, index, pattern }
	}

	async function init() {
		if (!container) return
		highlighter = await getHighlighter(theme, lang)
		machine = createMagicMoveMachine((code) => {
			const result = codeToKeyedTokens(highlighter, code, { lang, theme }, options.lineNumbers)
			return splitPunctuationTokens(result)
		}, options)
		renderer = new MagicMoveRenderer(container)
		Object.assign(renderer.options, options)
		const indentedCode = autoIndent ? indent(code!) : code!
		currentCode = indentedCode
		const result = machine.commit(indentedCode)
		currentTokens = addLineNumbers(result.current.tokens)
		renderer.render(result.current)
		ready = true
	}

	async function render(code: string) {
		if (!ready) return
		const indentedCode = autoIndent ? indent(code) : code
		currentCode = indentedCode
		const result = machine.commit(indentedCode)
		if (result.previous) renderer.replace(result.previous)
		currentTokens = addLineNumbers(result.current.tokens)
		await renderer.render(result.current)
	}

	function addLineNumbers(tokens: KeyedToken[]): (KeyedToken & { line: number })[] {
		let line = 1
		return tokens.map((token) => {
			const tokenWithLine = { ...token, line }
			if (token.content === '\n') {
				line++
			}
			return tokenWithLine
		})
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

	function getLines(range: string) {
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

	export function selectLines(string: TemplateStringsArray, ...expressions: string[]) {
		if (!container) return

		const range = expressions.length > 0 ? merge(string, expressions) : string[0]
		const lines = getLines(range)
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

	export function scrollToLine(string: TemplateStringsArray, ...expressions: string[]) {
		if (!container) return

		const raw = expressions.length > 0 ? merge(string, expressions) : string[0]
		const line = parseInt(raw.trim())

		if (isNaN(line) || line < 1) return

		let currentLine = 1
		let targetElement: HTMLElement | null = null

		for (const token of container.children) {
			if (!is.htmlEl(token)) continue

			if (currentLine === line && is.token(token)) {
				targetElement = token
				break
			}

			if (is.newLine(token)) {
				currentLine++
			}
		}

		if (!targetElement) return

		const containerRect = container.getBoundingClientRect()
		const targetRect = targetElement.getBoundingClientRect()
		const targetOffsetTop = targetRect.top - containerRect.top + container.scrollTop
		const centerOffset = containerRect.height / 2 - targetRect.height / 2
		const scrollPosition = Math.max(0, targetOffsetTop - centerOffset)

		return new Promise<void>((resolve) => {
			const currentScroll = container!.scrollTop

			if (Math.abs(currentScroll - scrollPosition) < 1) {
				resolve()
				return
			}

			container!.scrollTo({ top: scrollPosition, behavior: 'smooth' })

			let resolved = false
			const done = () => {
				if (resolved) return
				resolved = true
				resolve()
			}

			container!.addEventListener('scrollend', done, { once: true })
			setTimeout(done, 1000)
		})
	}

	export function select(string: TemplateStringsArray, ...expressions: string[]) {
		if (!container || !currentCode) return

		const raw = expressions.length > 0 ? merge(string, expressions) : string[0]
		const { line, index, pattern } = parseSelection(raw)

		if (!pattern) return

		// strip whitespace from pattern for matching
		const strippedPattern = pattern.replace(/\s+/g, '')

		// remove whitespace from source but keep track of character position mapping
		const sourceChars = currentCode.split('')
		const strippedChars: string[] = []
		const originalPositions: number[] = []

		for (let i = 0; i < sourceChars.length; i++) {
			if (!/\s/.test(sourceChars[i])) {
				strippedChars.push(sourceChars[i])
				originalPositions.push(i)
			}
		}
		const strippedSource = strippedChars.join('')

		// find all occurrences of stripped pattern in stripped source
		const occurrences: { start: number; end: number }[] = []
		let searchPosition = 0
		while (searchPosition < strippedSource.length) {
			const found = strippedSource.indexOf(strippedPattern, searchPosition)
			if (found === -1) break
			// map back to original positions
			const originStart = originalPositions[found]
			const originEnd = originalPositions[found + strippedPattern.length - 1] + 1
			occurrences.push({ start: originStart, end: originEnd })
			searchPosition = found + 1
		}

		if (occurrences.length === 0) return

		// filter by line if specified
		let filteredOccurrences = occurrences
		if (line !== null) {
			const lines = currentCode.split('\n')
			let charPosition = 0
			const lineRanges: { start: number; end: number }[] = []
			for (let i = 0; i < lines.length; i++) {
				lineRanges.push({ start: charPosition, end: charPosition + lines[i].length })
				charPosition += lines[i].length + 1 // +1 for newline
			}
			const targetRange = lineRanges[line - 1]
			if (targetRange) {
				filteredOccurrences = occurrences.filter(
					(occ) => occ.start >= targetRange.start && occ.end <= targetRange.end
				)
			}
		}

		// apply index if specified
		const selectedOccurrences =
			index !== null ? [filteredOccurrences[index]].filter(Boolean) : filteredOccurrences

		if (selectedOccurrences.length === 0) return

		// build set of token offsets to select
		const selectedOffsets = new Set<number>()
		for (const occ of selectedOccurrences) {
			for (const token of currentTokens) {
				const tokenStart = token.offset
				const tokenEnd = token.offset + token.content.length
				// token overlaps with occurrence?
				if (tokenEnd > occ.start && tokenStart < occ.end) {
					selectedOffsets.add(token.offset)
				}
			}
		}

		// apply selection/deselection to DOM and match tokens to DOM elements by order
		const tokens = container.children
		const promises: Promises = []
		let tokenIndex = 0

		for (const tokenEl of tokens) {
			if (!is.htmlEl(tokenEl)) continue

			if (is.token(tokenEl)) {
				const storedToken = currentTokens[tokenIndex]
				tokenIndex++
				if (storedToken) {
					const isSelected = selectedOffsets.has(storedToken.offset)
					promises.push(transition(tokenEl, isSelected))
				}
			}

			if (is.newLine(tokenEl)) {
				// newlines are `<br>` elements, so track them in `currentTokens`
				tokenIndex++
			}
		}

		return Promise.all(promises)
	}

	export function selectAdd(string: TemplateStringsArray, ...expressions: string[]) {
		if (!container || !currentCode) return

		const raw = expressions.length > 0 ? merge(string, expressions) : string[0]
		const { line, index, pattern } = parseSelection(raw)

		if (!pattern) return

		// strip whitespace from pattern for matching
		const strippedPattern = pattern.replace(/\s+/g, '')

		// remove whitespace from source to search in
		const sourceChars = currentCode.split('')
		const strippedChars: string[] = []
		const originalPositions: number[] = []

		for (let i = 0; i < sourceChars.length; i++) {
			if (!/\s/.test(sourceChars[i])) {
				strippedChars.push(sourceChars[i])
				originalPositions.push(i)
			}
		}
		const strippedSource = strippedChars.join('')

		// find all occurrences of stripped pattern in stripped source
		const occurrences: { start: number; end: number }[] = []
		let searchPosition = 0
		while (searchPosition < strippedSource.length) {
			const found = strippedSource.indexOf(strippedPattern, searchPosition)
			if (found === -1) break
			const origStart = originalPositions[found]
			const origEnd = originalPositions[found + strippedPattern.length - 1] + 1
			occurrences.push({ start: origStart, end: origEnd })
			searchPosition = found + 1
		}

		if (occurrences.length === 0) return

		// filter by line if specified
		let filteredOccurrences = occurrences
		if (line !== null) {
			const lines = currentCode.split('\n')
			let charPosition = 0
			const lineRanges: { start: number; end: number }[] = []
			for (let i = 0; i < lines.length; i++) {
				lineRanges.push({ start: charPosition, end: charPosition + lines[i].length })
				charPosition += lines[i].length + 1
			}
			const targetRange = lineRanges[line - 1]
			if (targetRange) {
				filteredOccurrences = occurrences.filter(
					(occ) => occ.start >= targetRange.start && occ.end <= targetRange.end
				)
			}
		}

		// apply index if specified
		const selectedOccurrences =
			index !== null ? [filteredOccurrences[index]].filter(Boolean) : filteredOccurrences

		if (selectedOccurrences.length === 0) return

		// build set of token offsets to select
		const selectedOffsets = new Set<number>()
		for (const occ of selectedOccurrences) {
			for (const token of currentTokens) {
				const tokenStart = token.offset
				const tokenEnd = token.offset + token.content.length
				if (tokenEnd > occ.start && tokenStart < occ.end) {
					selectedOffsets.add(token.offset)
				}
			}
		}

		// apply selection only
		const tokens = container.children
		const promises: Promises = []
		let tokenIndex = 0

		for (const tokenEl of tokens) {
			if (!is.htmlEl(tokenEl)) continue

			if (is.token(tokenEl)) {
				const storedToken = currentTokens[tokenIndex]
				tokenIndex++
				if (storedToken && selectedOffsets.has(storedToken.offset)) {
					promises.push(transition(tokenEl, true))
				}
			}

			if (is.newLine(tokenEl)) {
				tokenIndex++
			}
		}

		return Promise.all(promises)
	}

	/**
	 * @deprecated Use `select` instead. This function will be removed in a future version.
	 */
	export function selectToken(string: TemplateStringsArray, ...expressions: string[]) {
		console.warn('selectToken is deprecated, use select instead')
		return select(string, ...expressions)
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
