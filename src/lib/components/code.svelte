<script lang="ts" module>
	import type { BundledLanguage, BundledTheme, SpecialLanguage } from 'shiki';
	import { createHighlighter, type HighlighterCore } from 'shiki';

	type Lang = BundledLanguage | SpecialLanguage;

	const highlighterCache = new Map<string, Promise<HighlighterCore>>();

	function getHighlighter(theme: BundledTheme, lang: Lang) {
		const key = `${theme}-${lang}`;
		if (!highlighterCache.has(key)) {
			highlighterCache.set(key, createHighlighter({ themes: [theme], langs: [lang] }));
		}
		return highlighterCache.get(key)!;
	}
</script>

<script lang="ts">
	import Action from '$lib/components/action.svelte';
	import Code from '$lib/components/code.svelte';
	import { codeToKeyedTokens, createMagicMoveMachine } from 'shiki-magic-move/core';
	import { MagicMoveRenderer } from 'shiki-magic-move/renderer';
	import type {
		KeyedToken,
		KeyedTokensInfo,
		MagicMoveDifferOptions,
		MagicMoveRenderOptions
	} from 'shiki-magic-move/types';
	import '../styles/shiki.css';

	type Promises = Promise<unknown>[];
	type Lang = BundledLanguage | SpecialLanguage;
	type CodeProp = { code: string; codes?: never };
	type CodesProp = { code?: never; codes: string[] };
	type CodeProps = (CodeProp | CodesProp) & {
		lang: Lang;
		theme: BundledTheme;
		options?: MagicMoveRenderOptions & MagicMoveDifferOptions;
		autoIndent?: boolean;
		class?: string;
		ref?: (self: ReturnType<typeof Code>) => void;
	};

	let {
		code,
		codes,
		lang,
		theme = 'poimandres',
		options = {},
		autoIndent = true,
		...props
	}: CodeProps = $props();

	let container: HTMLPreElement | undefined = $state();
	let self: ReturnType<typeof Code> | undefined = $state();
	let highlighter: HighlighterCore;
	let machine: ReturnType<typeof createMagicMoveMachine>;
	let renderer: MagicMoveRenderer;
	let ready = false;

	let currentCode: string = '';
	let currentTokens: (KeyedToken & { line: number })[] = [];

	const is = {
		htmlEl: (el: Element): el is HTMLElement => el instanceof HTMLElement,
		token: (el: HTMLElement) => el.className.includes('shiki-magic-move-item'),
		newLine: (el: HTMLElement) => el.tagName === 'BR'
	};

	// splits bracket characters for finer-grained selection
	function splitPunctuationTokens(result: KeyedTokensInfo): KeyedTokensInfo {
		const brackets = /[{}\[\]()]/g;
		const newTokens: KeyedToken[] = [];

		for (const token of result.tokens) {
			if (token.content === '\n') {
				newTokens.push(token);
				continue;
			}

			const matches = [...token.content.matchAll(brackets)];
			if (matches.length === 0) {
				newTokens.push(token);
				continue;
			}

			const splitPositions = matches.map((m) => m.index!);
			let lastEnd = 0;
			const splits: { content: string; offset: number }[] = [];

			for (const pos of splitPositions) {
				if (pos > lastEnd) {
					splits.push({
						content: token.content.slice(lastEnd, pos),
						offset: token.offset + lastEnd
					});
				}
				splits.push({
					content: token.content.slice(pos, pos + 1),
					offset: token.offset + pos
				});
				lastEnd = pos + 1;
			}

			if (lastEnd < token.content.length) {
				splits.push({
					content: token.content.slice(lastEnd),
					offset: token.offset + lastEnd
				});
			}

			for (let i = 0; i < splits.length; i++) {
				newTokens.push({
					...token,
					content: splits[i].content,
					offset: splits[i].offset,
					key: i === 0 ? token.key : `${token.key}-${i}`
				});
			}
		}

		return { ...result, tokens: newTokens };
	}

	/**
	 * removes common leading indentation from code
	 */
	export function indent(text: string) {
		const trimmed = text.trim();
		const lines = trimmed.split('\n');
		if (lines.length === 1) return trimmed;

		const firstIndented = lines.find((line) => /^[\t ]/.test(line));
		if (!firstIndented) return trimmed;

		const isTabs = firstIndented[0] === '\t';

		if (isTabs) {
			const common = lines
				.map((line) => line.match(/^(\t+)/)?.[1] || '')
				.filter((tabs) => tabs.length > 0)
				.sort((a, b) => a.length - b.length)[0];

			if (!common || common === '\t') return trimmed;

			return lines.map((line) => line.replace(common, '')).join('\n');
		} else {
			const common = lines
				.map((line) => line.match(/^( +)/)?.[1] || '')
				.filter((spaces) => spaces.length > 0)
				.sort((a, b) => a.length - b.length)[0];

			if (!common || common === ' ') return trimmed;

			return lines.map((line) => line.replace(common, '')).join('\n');
		}
	}

	function parseSelection(raw: string): {
		line: number | null;
		index: number | null;
		pattern: string;
	} {
		let line: number | null = null;
		let index: number | null = null;
		let pattern = raw.trim();

		const indexMatch = pattern.match(/:(\d+)$/);
		if (indexMatch) {
			index = parseInt(indexMatch[1], 10);
			pattern = pattern.slice(0, -indexMatch[0].length).trim();
		}

		const parts = pattern.split(/\s+/);
		if (parts.length > 0 && /^\d+$/.test(parts[0])) {
			line = parseInt(parts[0], 10);
			pattern = parts.slice(1).join(' ');
		}

		return { line, index, pattern };
	}

	function stripWhitespace(code: string): { stripped: string; positions: number[] } {
		const stripped: string[] = [];
		const positions: number[] = [];

		for (let i = 0; i < code.length; i++) {
			if (!/\s/.test(code[i])) {
				stripped.push(code[i]);
				positions.push(i);
			}
		}

		return { stripped: stripped.join(''), positions };
	}

	function findOccurrences(
		code: string,
		pattern: string,
		line: number | null,
		index: number | null
	): { start: number; end: number }[] {
		const { stripped: strippedSource, positions } = stripWhitespace(code);
		const strippedPattern = pattern.replace(/\s+/g, '');

		if (!strippedPattern) return [];

		const occurrences: { start: number; end: number }[] = [];
		let searchPos = 0;

		while (searchPos < strippedSource.length) {
			const found = strippedSource.indexOf(strippedPattern, searchPos);
			if (found === -1) break;

			const start = positions[found];
			const end = positions[found + strippedPattern.length - 1] + 1;
			occurrences.push({ start, end });
			searchPos = found + 1;
		}

		if (occurrences.length === 0) return [];

		// filter by line if specified
		if (line !== null) {
			const lines = code.split('\n');
			let charPos = 0;
			const lineRanges: { start: number; end: number }[] = [];

			for (let i = 0; i < lines.length; i++) {
				lineRanges.push({ start: charPos, end: charPos + lines[i].length });
				charPos += lines[i].length + 1;
			}

			const lineIndex = line - 1;
			if (lineIndex >= 0 && lineIndex < lineRanges.length) {
				const targetRange = lineRanges[lineIndex];
				return occurrences.filter(
					(occ) => occ.start >= targetRange.start && occ.end <= targetRange.end
				);
			}
		}

		// apply index if specified
		if (index !== null) {
			const idx = index;
			return occurrences[idx] ? [occurrences[idx]] : [];
		}

		return occurrences;
	}

	function getTokenOffsets(
		tokens: (KeyedToken & { line: number })[],
		occurrences: { start: number; end: number }[]
	): Set<number> {
		const offsets = new Set<number>();

		for (const occ of occurrences) {
			for (const token of tokens) {
				const tokenStart = token.offset;
				const tokenEnd = token.offset + token.content.length;
				if (tokenEnd > occ.start && tokenStart < occ.end) {
					offsets.add(token.offset);
				}
			}
		}

		return offsets;
	}

	function addLineNumbers(tokens: KeyedToken[]): (KeyedToken & { line: number })[] {
		let line = 1;
		return tokens.map((token) => {
			const tokenWithLine = { ...token, line };
			if (token.content === '\n') line++;
			return tokenWithLine;
		});
	}

	function createRange(start: number, end: number): number[] {
		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	}

	function getLines(range: string): number[] {
		if (range === '*') return [];

		return range.split(',').flatMap((part) => {
			if (part.includes('-')) {
				const [start, end] = part.split('-').map(Number);
				return createRange(start, end);
			}
			return [+part];
		});
	}

	function merge(strings: TemplateStringsArray, expressions: string[]): string {
		let result = '';
		for (let i = 0; i < strings.length; i++) {
			result += strings[i];
			if (expressions[i]) result += expressions[i].trim();
		}
		return result;
	}

	function transition(el: HTMLElement, selected: boolean): Promise<unknown> {
		const { promise, resolve } = Promise.withResolvers();

		const willTransition =
			(!selected && el.classList.contains('selected')) ||
			(selected && el.classList.contains('deselected')) ||
			(!selected && !el.classList.contains('deselected'));

		if (willTransition) {
			el.ontransitionend = resolve;
		} else {
			resolve('finished');
		}

		el.classList.toggle('selected', selected);
		el.classList.toggle('deselected', !selected);

		return promise;
	}

	function applyToTokens(
		container: HTMLElement,
		tokens: (KeyedToken & { line: number })[],
		selectedOffsets: Set<number>,
		mode: 'replace' | 'add'
	): Promise<unknown> {
		const children = container.children;
		const promises: Promise<unknown>[] = [];
		let tokenIndex = 0;

		for (const el of children) {
			if (!is.htmlEl(el)) continue;

			if (is.token(el)) {
				const token = tokens[tokenIndex];
				tokenIndex++;

				if (token) {
					const isSelected = selectedOffsets.has(token.offset);
					if (mode === 'replace') {
						promises.push(transition(el, isSelected));
					} else if (mode === 'add' && isSelected) {
						promises.push(transition(el, true));
					}
				}
			}

			if (is.newLine(el)) {
				tokenIndex++;
			}
		}

		return Promise.all(promises);
	}

	async function init() {
		if (!container) return;
		highlighter = await getHighlighter(theme, lang);
		machine = createMagicMoveMachine((code) => {
			const result = codeToKeyedTokens(highlighter, code, { lang, theme }, options.lineNumbers);
			return splitPunctuationTokens(result);
		}, options);
		renderer = new MagicMoveRenderer(container);
		Object.assign(renderer.options, options);
		const indentedCode = autoIndent ? indent(code!) : code!;
		currentCode = indentedCode;
		const result = machine.commit(indentedCode);
		currentTokens = addLineNumbers(result.current.tokens);
		renderer.render(result.current);
		ready = true;
	}

	async function render(code: string) {
		if (!ready) return;
		const indentedCode = autoIndent ? indent(code) : code;
		currentCode = indentedCode;
		const result = machine.commit(indentedCode);
		if (result.previous) renderer.replace(result.previous);
		currentTokens = addLineNumbers(result.current.tokens);
		await renderer.render(result.current);
	}

	/**
	 * updates the code with animation
	 */
	export function update(strings: TemplateStringsArray, ...expressions: string[]) {
		return expressions.length > 0 ? render(merge(strings, expressions)) : render(strings[0]);
	}

	/**
	 * appends code to the current code with animation
	 */
	export function append(strings: TemplateStringsArray, ...expressions: string[]) {
		const newCode = expressions.length > 0 ? merge(strings, expressions) : strings[0];
		const dedentedCode = autoIndent ? indent(newCode) : newCode;
		return render(currentCode + '\n\n' + dedentedCode);
	}

	/**
	 * removes lines by line number with animation
	 * supports: single line (5), range (5-7), multiple (5,7,9), or combinations (5,7-10)
	 */
	export function remove(strings: TemplateStringsArray, ...expressions: string[]) {
		const input = expressions.length > 0 ? merge(strings, expressions) : strings[0];
		const lineNumbers = getLines(input.trim());
		if (lineNumbers.length === 0) {
			console.warn('remove: invalid line range');
			return Promise.resolve();
		}
		const lines = currentCode.split('\n');
		const sortedLines = [...lineNumbers].sort((a, b) => b - a);
		for (const lineNum of sortedLines) {
			if (lineNum >= 1 && lineNum <= lines.length) {
				lines.splice(lineNum - 1, 1);
			}
		}
		return render(lines.join('\n'));
	}

	function detectIndentStyle(lines: string[]): { char: string; size: number } {
		for (const line of lines) {
			const match = line.match(/^(\s+)/);
			if (match) {
				const whitespace = match[1];
				if (whitespace.includes('\t')) {
					return { char: '\t', size: 1 };
				}
				const spaces = whitespace.length;
				return { char: ' ', size: spaces <= 2 ? 2 : 4 };
			}
		}
		return { char: ' ', size: 2 };
	}

	/**
	 * inserts code at a specific line with animation
	 * format: `<lineNumber>:<indentLevel> <code>` where line number is 1-indexed
	 * indentLevel is optional (defaults to 0)
	 */
	export function insert(strings: TemplateStringsArray, ...expressions: string[]) {
		const input = expressions.length > 0 ? merge(strings, expressions) : strings[0];
		const match = input.match(/^(\d+)(?::(\d+))?\s*/);
		if (!match) {
			console.warn('insert: line number required at start of code');
			return Promise.resolve();
		}
		const lineNumber = parseInt(match[1], 10);
		const indentLevel = match[2] ? parseInt(match[2], 10) : 0;
		const codeFragment = input.slice(match[0].length);
		const dedentedCode = autoIndent ? indent(codeFragment) : codeFragment;
		const lines = currentCode.split('\n');
		const { char, size } = detectIndentStyle(lines);
		const actualIndent = char === '\t' ? '\t'.repeat(indentLevel) : ' '.repeat(indentLevel * size);
		lines.splice(lineNumber - 1, 0, actualIndent + dedentedCode);
		return render(lines.join('\n'));
	}

	/**
	 * replaces matching code with new code with animation
	 */
	export function replace(from: string, to: string) {
		const dedentedFrom = autoIndent ? indent(from) : from;
		const dedentedTo = autoIndent ? indent(to) : to;
		return render(currentCode.replace(dedentedFrom, dedentedTo));
	}

	/**
	 * highlights specific lines, or all lines if `*` is passed
	 */
	export function selectLines(strings: TemplateStringsArray, ...expressions: string[]) {
		if (!container) return;

		const range = expressions.length > 0 ? merge(strings, expressions) : strings[0];
		const lines = getLines(range);
		const children = container.children;
		const promises: Promises = [];
		let currentLine = 1;

		for (const el of children) {
			if (!is.htmlEl(el)) return;

			if (is.token(el)) {
				const selected = lines.length === 0 ? true : lines.includes(currentLine);
				promises.push(transition(el, selected));
			}

			if (is.newLine(el)) currentLine++;
		}

		return Promise.all(promises);
	}

	/**
	 * scrolls to make a specific line visible
	 */
	export function scrollToLine(strings: TemplateStringsArray, ...expressions: string[]) {
		if (!container) return;

		const raw = expressions.length > 0 ? merge(strings, expressions) : strings[0];
		const line = parseInt(raw.trim());

		if (isNaN(line) || line < 1) return;

		let currentLine = 1;
		let targetElement: HTMLElement | null = null;

		for (const el of container.children) {
			if (!is.htmlEl(el)) continue;

			if (currentLine === line && is.token(el)) {
				targetElement = el;
				break;
			}

			if (is.newLine(el)) currentLine++;
		}

		if (!targetElement) return;

		const containerRect = container.getBoundingClientRect();
		const targetRect = targetElement.getBoundingClientRect();
		const targetOffsetTop = targetRect.top - containerRect.top + container.scrollTop;
		const centerOffset = containerRect.height / 2 - targetRect.height / 2;
		const scrollPosition = Math.max(0, targetOffsetTop - centerOffset);

		return new Promise<void>((resolve) => {
			const currentScroll = container!.scrollTop;

			if (Math.abs(currentScroll - scrollPosition) < 1) {
				resolve();
				return;
			}

			container!.scrollTo({ top: scrollPosition, behavior: 'smooth' });

			let resolved = false;
			const done = () => {
				if (resolved) return;
				resolved = true;
				resolve();
			};

			container!.addEventListener('scrollend', done, { once: true });
			setTimeout(done, 1000);
		});
	}

	/**
	 * selects tokens matching a pattern, optionally filtered by line number or index
	 */
	export function select(strings: TemplateStringsArray, ...expressions: string[]) {
		if (!container || !currentCode) return;

		const raw = expressions.length > 0 ? merge(strings, expressions) : strings[0];
		const { line, index, pattern } = parseSelection(raw);

		if (!pattern) return;

		const occurrences = findOccurrences(currentCode, pattern, line, index);
		const selectedOffsets = getTokenOffsets(currentTokens, occurrences);

		return applyToTokens(container, currentTokens, selectedOffsets, 'replace');
	}

	/**
	 * adds to the current selection without deselecting other tokens
	 */
	export function selectAdd(strings: TemplateStringsArray, ...expressions: string[]) {
		if (!container || !currentCode) return;

		const raw = expressions.length > 0 ? merge(strings, expressions) : strings[0];
		const { line, index, pattern } = parseSelection(raw);

		if (!pattern) return;

		const occurrences = findOccurrences(currentCode, pattern, line, index);
		const selectedOffsets = getTokenOffsets(currentTokens, occurrences);

		return applyToTokens(container, currentTokens, selectedOffsets, 'add');
	}

	/**
	 * @deprecated use `select` instead
	 */
	export function selectToken(strings: TemplateStringsArray, ...expressions: string[]) {
		console.warn('selectToken is deprecated, use select instead');
		return select(strings, ...expressions);
	}

	$effect(() => {
		init();
	});

	if (props.ref) {
		$effect(() => {
			props.ref?.(self!);
		});
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
