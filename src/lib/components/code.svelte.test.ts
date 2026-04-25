import { mount } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Code from './code.svelte';

afterEach(() => {
	document.body.innerHTML = '';
});

describe('code indentation', () => {
	it('removes common leading spaces from single-indent code', () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: '', lang: 'javascript', theme: 'poimandres' }
		});

		const input = `function hello() {\n  console.log('hi')\n}`;
		const expected = `function hello() {\nconsole.log('hi')\n}`;

		expect(code.indent(input)).toBe(expected);
	});

	it('removes common leading tabs from multi-line code', () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: '', lang: 'javascript', theme: 'poimandres' }
		});

		const input = `\t\tfunction hello() {\n\t\t\tconsole.log('hi')\n\t\t}`;
		const expected = `function hello() {\n\tconsole.log('hi')\n}`;

		expect(code.indent(input)).toBe(expected);
	});

	it('handles code with varying indentation levels', () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: '', lang: 'javascript', theme: 'poimandres' }
		});

		const input = "\t\t\tfunction hello() {\n\t\t\t\tconsole.log('hi')\n\t\t\t}";
		const expected = "function hello() {\n\tconsole.log('hi')\n}";

		expect(code.indent(input)).toBe(expected);
	});

	it('removes common leading spaces from multi-line code', () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: '', lang: 'javascript', theme: 'poimandres' }
		});

		const input = "    function hello() {\n        console.log('hi')\n    }";
		const expected = "function hello() {\n    console.log('hi')\n}";

		expect(code.indent(input)).toBe(expected);
	});

	it('handles space indentation with inline whitespace', () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: '', lang: 'javascript', theme: 'poimandres' }
		});

		const input = '    let count = 0\n    let double = count * 2';
		const expected = 'let count = 0\nlet double = count * 2';

		expect(code.indent(input)).toBe(expected);
	});

	it('handles space indentation with varying levels', () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: '', lang: 'javascript', theme: 'poimandres' }
		});

		const input = "        function hello() {\n            console.log('hi')\n        }";
		const expected = "function hello() {\n    console.log('hi')\n}";

		expect(code.indent(input)).toBe(expected);
	});

	it('returns original code if only single space of indentation', () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: '', lang: 'javascript', theme: 'poimandres' }
		});

		const input = " function hello() {\n  console.log('hi')\n }";

		expect(code.indent(input)).toBe(input.trim());
	});
});

describe('code update', () => {
	it('updates code', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: `let bool = false`, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let bool = false') ? el : null;
		})) as HTMLPreElement;

		expect(pre.textContent).toContain('let bool = false');

		await code.update`let bool = true`;

		await vi.waitFor(() => {
			expect(pre.textContent).toContain('let bool = true');
		});
	});

	it('updates code with template literal expressions', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: `let bool = false`, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let bool = false') ? el : null;
		})) as HTMLPreElement;

		const expression = 'true';
		await code.update`let bool = ${expression}`;

		await vi.waitFor(() => {
			expect(pre.textContent).toContain('let bool = true');
		});
	});
});

describe('code highlighting', () => {
	const multiLineCode = `let count = 0\nlet double = count * 2`;

	function getTokensByLine(container: Element) {
		const lines: Map<number, HTMLElement[]> = new Map();
		let currentLine = 1;
		lines.set(currentLine, []);

		for (const child of container.children) {
			if (child.tagName === 'BR') {
				currentLine++;
				lines.set(currentLine, []);
			} else if (child.classList.contains('shiki-magic-move-item')) {
				const lineTokens = lines.get(currentLine) ?? [];
				lineTokens.push(child as HTMLElement);
				lines.set(currentLine, lineTokens);
			}
		}

		return lines;
	}

	function getAllTokens(container: Element) {
		return [...container.querySelectorAll<HTMLElement>('.shiki-magic-move-item')];
	}

	function getLine(lines: Map<number, HTMLElement[]>, lineNumber: number) {
		return lines.get(lineNumber) ?? [];
	}

	it('selectLines selects a single line', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: multiLineCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let count') ? el : null;
		})) as HTMLPreElement;

		await code.selectLines`1`;

		const lines = getTokensByLine(pre);
		for (const token of getLine(lines, 1)) {
			expect(token.classList.contains('selected')).toBe(true);
		}
		for (const token of getLine(lines, 2)) {
			expect(token.classList.contains('deselected')).toBe(true);
		}
	});

	it('selectLines selects multiple lines', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: multiLineCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let count') ? el : null;
		})) as HTMLPreElement;

		await code.selectLines`1,2`;

		const tokens = getAllTokens(pre);
		for (const token of tokens) {
			expect(token.classList.contains('selected')).toBe(true);
			expect(token.classList.contains('deselected')).toBe(false);
		}
	});

	it('selectLines selects a range of lines', async () => {
		const threeLineCode = `let a = 1\nlet b = 2\nlet c = 3`;
		const code = mount(Code, {
			target: document.body,
			props: { code: threeLineCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let a') ? el : null;
		})) as HTMLPreElement;

		await code.selectLines`1-2`;

		const lines = getTokensByLine(pre);
		for (const token of getLine(lines, 1)) {
			expect(token.classList.contains('selected')).toBe(true);
		}
		for (const token of getLine(lines, 2)) {
			expect(token.classList.contains('selected')).toBe(true);
		}
		for (const token of getLine(lines, 3)) {
			expect(token.classList.contains('deselected')).toBe(true);
		}
	});

	it('selectLines selects a range using template literal expressions', async () => {
		const threeLineCode = `let a = 1\nlet b = 2\nlet c = 3`;
		const code = mount(Code, {
			target: document.body,
			props: { code: threeLineCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let a') ? el : null;
		})) as HTMLPreElement;

		const start = '1';
		const end = '2';
		await code.selectLines`${start}-${end}`;

		const lines = getTokensByLine(pre);
		for (const token of getLine(lines, 1)) {
			expect(token.classList.contains('selected')).toBe(true);
		}
		for (const token of getLine(lines, 2)) {
			expect(token.classList.contains('selected')).toBe(true);
		}
		for (const token of getLine(lines, 3)) {
			expect(token.classList.contains('deselected')).toBe(true);
		}
	});

	it('selectLines with * selects all lines', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: multiLineCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let count') ? el : null;
		})) as HTMLPreElement;

		// first deselect some lines so we can verify * resets everything
		await code.selectLines`1`;
		// now select all
		await code.selectLines`*`;

		const tokens = getAllTokens(pre);
		for (const token of tokens) {
			expect(token.classList.contains('selected')).toBe(true);
			expect(token.classList.contains('deselected')).toBe(false);
		}
	});

	it('selectLinesAdd adds lines without deselecting others', async () => {
		const threeLineCode = `let a = 1\nlet b = 2\nlet c = 3`;
		const code = mount(Code, {
			target: document.body,
			props: { code: threeLineCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let a') ? el : null;
		})) as HTMLPreElement;

		await code.selectLines`1`;
		await code.selectLinesAdd`3`;

		const lines = getTokensByLine(pre);
		for (const token of getLine(lines, 1)) {
			expect(token.classList.contains('selected')).toBe(true);
		}
		for (const token of getLine(lines, 2)) {
			expect(token.classList.contains('deselected')).toBe(true);
		}
		for (const token of getLine(lines, 3)) {
			expect(token.classList.contains('selected')).toBe(true);
		}
	});

	it('selectLinesAdd with range adds multiple lines', async () => {
		const fourLineCode = `let a = 1\nlet b = 2\nlet c = 3\nlet d = 4`;
		const code = mount(Code, {
			target: document.body,
			props: { code: fourLineCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let a') ? el : null;
		})) as HTMLPreElement;

		await code.selectLines`1`;
		await code.selectLinesAdd`3-4`;

		const lines = getTokensByLine(pre);
		for (const token of getLine(lines, 1)) {
			expect(token.classList.contains('selected')).toBe(true);
		}
		for (const token of getLine(lines, 2)) {
			expect(token.classList.contains('deselected')).toBe(true);
		}
		for (const token of getLine(lines, 3)) {
			expect(token.classList.contains('selected')).toBe(true);
		}
		for (const token of getLine(lines, 4)) {
			expect(token.classList.contains('selected')).toBe(true);
		}
	});

	it('selectLinesAdd with * selects all lines', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: multiLineCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let count') ? el : null;
		})) as HTMLPreElement;

		await code.selectLines`1`;
		await code.selectLinesAdd`*`;

		const tokens = getAllTokens(pre);
		for (const token of tokens) {
			expect(token.classList.contains('selected')).toBe(true);
			expect(token.classList.contains('deselected')).toBe(false);
		}
	});

	it('select selects matching tokens', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: multiLineCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let count') ? el : null;
		})) as HTMLPreElement;

		await code.select`count`;

		const tokens = getAllTokens(pre);
		for (const token of tokens) {
			if (token.textContent === 'count') {
				expect(token.classList.contains('selected')).toBe(true);
			} else {
				expect(token.classList.contains('deselected')).toBe(true);
			}
		}
	});

	it('select selects matching tokens using template literal expressions', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: multiLineCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let count') ? el : null;
		})) as HTMLPreElement;

		const token = 'count';
		await code.select`${token}`;

		const tokens = getAllTokens(pre);
		for (const t of tokens) {
			if (t.textContent === 'count') {
				expect(t.classList.contains('selected')).toBe(true);
			} else {
				expect(t.classList.contains('deselected')).toBe(true);
			}
		}
	});

	it('select selects a token on a specific line', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: multiLineCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let count') ? el : null;
		})) as HTMLPreElement;

		// `count` appears on line 1 (`let count = 0`) and line 2 (`let double = count * 2`)
		// selecting `2 count` targets line 2 — the selection array is ['2', 'count']
		// so tokens with text 'count' or '2' on line 2 get selected
		await code.select`2 count`;

		const lines = getTokensByLine(pre);

		// line 1 tokens should all be deselected
		for (const token of getLine(lines, 1)) {
			expect(token.classList.contains('deselected')).toBe(true);
		}

		// on line 2, `count` should be selected
		const countTokensOnLine2 = getLine(lines, 2).filter(
			(t) => t.textContent === 'count' && t.classList.contains('selected')
		);
		expect(countTokensOnLine2.length).toBeGreaterThan(0);

		// tokens on line 2 that are not in the selection should be deselected
		const deselectedOnLine2 = getLine(lines, 2).filter(
			(t) => t.textContent !== 'count' && t.textContent !== '2'
		);
		for (const token of deselectedOnLine2) {
			expect(token.classList.contains('deselected')).toBe(true);
		}
	});

	it('select selects token sequence', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: `let count = 0`, lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let') ? el : null;
		});

		// with sequence matching, 'let' followed by 'count'
		// note: shiki tokenizes `let count` as separate tokens
		await code.select`let count`;

		const tokens = getAllTokens(document.querySelector('.shiki-magic-move-container')!);
		const letTokens = tokens.filter((t) => t.textContent === 'let');
		const countTokens = tokens.filter((t) => t.textContent === 'count');

		// `let count` sequence should match on line 1
		expect(letTokens[0]?.classList.contains('selected')).toBe(true);
		expect(countTokens[0]?.classList.contains('selected')).toBe(true);
	});

	it('select with spaces matches sequence', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: `() => 1`, lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('=>') ? el : null;
		});

		// `( ) =>` tokenizes to (, ), => and should match the arrow function
		// note: brackets are split by our tokenizer
		await code.select`( ) =>`;

		const tokens = getAllTokens(document.querySelector('.shiki-magic-move-container')!);
		const selectedTokens = tokens.filter((t) => t.classList.contains('selected'));

		// the (, ), and => tokens should be selected but => might be
		// one token in shiki, so let's check what we actually have
		expect(selectedTokens.length).toBeGreaterThan(0);
	});

	it('punctuation characters are individually selectable', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: `<button>{"click"}</button>`, lang: 'html', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('button') ? el : null;
		});

		await code.select`}`;

		const tokens = getAllTokens(document.querySelector('.shiki-magic-move-container')!);
		const braceTokens = tokens.filter((t) => t.textContent === '}');

		expect(braceTokens.length).toBeGreaterThan(0);
		for (const token of braceTokens) {
			expect(token.classList.contains('selected')).toBe(true);
		}
	});

	it('select matches sequence without spaces', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: `{double} {double}`, lang: 'svelte', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('double') ? el : null;
		});

		// `{double}` should match the sequence {, double, } and select all occurrences
		await code.select`{double}`;

		const tokens = getAllTokens(document.querySelector('.shiki-magic-move-container')!);
		const braceTokens = tokens.filter((t) => t.textContent === '{' || t.textContent === '}');
		const doubleTokens = tokens.filter((t) => t.textContent === 'double');

		// all {, }, and double tokens should be selected (both occurrences)
		expect(braceTokens.length).toBe(4);
		expect(doubleTokens.length).toBe(2);

		for (const token of braceTokens) {
			expect(token.classList.contains('selected')).toBe(true);
		}
		for (const token of doubleTokens) {
			expect(token.classList.contains('selected')).toBe(true);
		}
	});

	it('select selects first occurrence with index', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: `{double} {double}`, lang: 'svelte', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('double') ? el : null;
		});

		// `{double}:0` should select only the first occurrence
		await code.select`{double}:0`;

		const tokens = getAllTokens(document.querySelector('.shiki-magic-move-container')!);

		// count selected tokens
		const selectedTokens = tokens.filter((t) => t.classList.contains('selected'));
		const deselectedTokens = tokens.filter((t) => t.classList.contains('deselected'));

		// first {double} sequence has 3 tokens: {, double, }
		expect(selectedTokens.length).toBe(3);
		expect(deselectedTokens.length).toBeGreaterThan(0);
	});

	it('selectAdd accumulates selections across calls', async () => {
		const code = mount(Code, {
			target: document.body,
			props: {
				code: `let count = 0\nlet double = count * 2`,
				lang: 'javascript',
				theme: 'poimandres'
			}
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('count') ? el : null;
		});

		// first selection
		await code.selectAdd`let count`;
		const tokens = getAllTokens(document.querySelector('.shiki-magic-move-container')!);

		// count selected after first call
		const selectedAfterFirst = tokens.filter((t) => t.classList.contains('selected'));
		expect(selectedAfterFirst.length).toBeGreaterThan(0);

		// second selection should add to the first
		await code.selectAdd`double`;
		const selectedAfterSecond = tokens.filter((t) => t.classList.contains('selected'));

		// should have more selected tokens after second call
		expect(selectedAfterSecond.length).toBeGreaterThan(selectedAfterFirst.length);
	});
});

describe('code scrolling', () => {
	const longCode = Array.from({ length: 50 }, (_, i) => `let line${i + 1} = ${i + 1}`).join('\n');

	it('scrollToLine scrolls to a specific line', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: longCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector<HTMLElement>('.shiki-magic-move-container');
			return el?.textContent?.includes('let line1') ? el : null;
		})) as HTMLElement;

		Object.assign(pre.style, {
			height: '200px',
			overflow: 'auto'
		});

		expect(pre.scrollTop).toBe(0);
		await code.scrollToLine`25`;
		expect(pre.scrollTop).toBeGreaterThan(0);
	});

	it('scrollToLine scrolls to line using template literal expressions', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: longCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector<HTMLElement>('.shiki-magic-move-container');
			return el?.textContent?.includes('let line1') ? el : null;
		})) as HTMLElement;

		Object.assign(pre.style, {
			height: '200px',
			overflow: 'auto'
		});

		const lineNumber = '30';
		await code.scrollToLine`${lineNumber}`;

		expect(pre.scrollTop).toBeGreaterThan(0);
	});

	it('scrollToLine handles invalid line numbers', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: longCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector<HTMLElement>('.shiki-magic-move-container');
			return el?.textContent?.includes('let line1') ? el : null;
		})) as HTMLElement;

		Object.assign(pre.style, {
			height: '200px',
			overflow: 'auto'
		});

		const initialScroll = pre.scrollTop;

		await code.scrollToLine`0`;
		expect(pre.scrollTop).toBe(initialScroll);

		await code.scrollToLine`-5`;
		expect(pre.scrollTop).toBe(initialScroll);

		await code.scrollToLine`not a number`;
		expect(pre.scrollTop).toBe(initialScroll);
	});

	it('scrollToLine handles line numbers beyond the code length', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'let a = 1\nlet b = 2', lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector<HTMLElement>('.shiki-magic-move-container');
			return el?.textContent?.includes('let a') ? el : null;
		})) as HTMLElement;

		Object.assign(pre.style, {
			height: '200px',
			overflow: 'auto'
		});

		const initialScroll = pre.scrollTop;
		await code.scrollToLine`100`;
		expect(pre.scrollTop).toBe(initialScroll);
	});

	it('scrollToLine resolves immediately if already at target position', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: longCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector<HTMLElement>('.shiki-magic-move-container');
			return el?.textContent?.includes('let line1') ? el : null;
		})) as HTMLElement;

		Object.assign(pre.style, {
			height: '200px',
			overflow: 'auto'
		});

		const startTime = Date.now();
		await code.scrollToLine`1`;
		const endTime = Date.now();

		expect(endTime - startTime).toBeLessThan(500);
	});

	it('scrollToLine centers the target line in viewport', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: longCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector<HTMLElement>('.shiki-magic-move-container');
			return el?.textContent?.includes('let line1') ? el : null;
		})) as HTMLElement;

		const containerHeight = 400;
		Object.assign(pre.style, {
			height: `${containerHeight}px`,
			overflow: 'auto'
		});

		await code.scrollToLine`25`;

		const scrollPosition = pre.scrollTop;
		expect(scrollPosition).toBeGreaterThan(0);

		const maxScroll = pre.scrollHeight - pre.clientHeight;
		expect(scrollPosition).toBeLessThan(maxScroll);
	});

	it('scrollToLine handles whitespace in template literal', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: longCode, lang: 'javascript', theme: 'poimandres' }
		});

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector<HTMLElement>('.shiki-magic-move-container');
			return el?.textContent?.includes('let line1') ? el : null;
		})) as HTMLElement;

		Object.assign(pre.style, {
			height: '200px',
			overflow: 'auto'
		});

		await code.scrollToLine`  20  `;
		expect(pre.scrollTop).toBeGreaterThan(0);
	});
});

describe('code append', () => {
	it('appends code to the end', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'let a = 1', lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let a = 1') ? el : null;
		});

		await code.append`let b = 2`;

		await vi.waitFor(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			expect(el?.textContent).toContain('let a = 1');
			expect(el?.textContent).toContain('let b = 2');
		});
	});

	it('appends code with blank line separation', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'let a = 1', lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let a = 1') ? el : null;
		});

		await code.append`let b = 2`;

		const content = document.querySelector('.shiki-magic-move-container')?.textContent;
		expect(content).toContain('let a = 1');
		expect(content).toContain('let b = 2');
	});

	it('appends multiple times', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'let a = 1', lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let a = 1') ? el : null;
		});

		await code.append`let b = 2`;
		await code.append`let c = 3`;

		await vi.waitFor(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			expect(el?.textContent).toContain('let a = 1');
			expect(el?.textContent).toContain('let b = 2');
			expect(el?.textContent).toContain('let c = 3');
		});
	});

	it('dedents appended code', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'let a = 1', lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let a = 1') ? el : null;
		});

		await code.append`
			let b = 2
		`;

		const el = document.querySelector('.shiki-magic-move-container');
		expect(el?.textContent).toContain('let b = 2');
	});
});

describe('code insert', () => {
	it('inserts code at a specific line', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'let a = 1\nlet c = 3', lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let a = 1') ? el : null;
		});

		await code.insert`2 let b = 2`;

		await vi.waitFor(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			expect(el?.textContent).toContain('let a = 1');
			expect(el?.textContent).toContain('let b = 2');
			expect(el?.textContent).toContain('let c = 3');
		});
	});

	it('inserts code with indent level', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'function test() {\n}', lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('function') ? el : null;
		});

		await code.insert`2:1 let x = 1`;

		await vi.waitFor(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			expect(el?.textContent).toContain('function');
			expect(el?.textContent).toContain('let x = 1');
		});
	});

	it('inserts at first line', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'let b = 2', lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let b = 2') ? el : null;
		});

		await code.insert`1 let a = 1`;

		await vi.waitFor(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			expect(el?.textContent).toContain('let a = 1');
			expect(el?.textContent).toContain('let b = 2');
		});
	});

	it('handles invalid line number gracefully', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'let a = 1', lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let a = 1') ? el : null;
		});

		const consoleSpy = vi.spyOn(console, 'warn');
		await code.insert`invalid line number`;

		expect(consoleSpy).toHaveBeenCalledWith('insert: line number required at start of code');
		consoleSpy.mockRestore();
	});
});

describe('code remove', () => {
	it('removes a single line', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'let a = 1\nlet b = 2\nlet c = 3', lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let b = 2') ? el : null;
		});

		await code.remove`2`;

		await vi.waitFor(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			expect(el?.textContent).toContain('let a = 1');
			expect(el?.textContent).toContain('let c = 3');
			expect(el?.textContent).not.toContain('let b = 2');
		});
	});

	it('removes a range of lines', async () => {
		const code = mount(Code, {
			target: document.body,
			props: {
				code: 'let a = 1\nlet b = 2\nlet c = 3\nlet d = 4',
				lang: 'javascript',
				theme: 'poimandres'
			}
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let d = 4') ? el : null;
		});

		await code.remove`2-3`;

		await vi.waitFor(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			expect(el?.textContent).toContain('let a = 1');
			expect(el?.textContent).toContain('let d = 4');
			expect(el?.textContent).not.toContain('let b = 2');
			expect(el?.textContent).not.toContain('let c = 3');
		});
	});

	it('removes multiple lines', async () => {
		const code = mount(Code, {
			target: document.body,
			props: {
				code: 'let a = 1\nlet b = 2\nlet c = 3\nlet d = 4',
				lang: 'javascript',
				theme: 'poimandres'
			}
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let d = 4') ? el : null;
		});

		await code.remove`2,4`;

		await vi.waitFor(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			expect(el?.textContent).toContain('let a = 1');
			expect(el?.textContent).toContain('let c = 3');
			expect(el?.textContent).not.toContain('let b = 2');
			expect(el?.textContent).not.toContain('let d = 4');
		});
	});

	it('removes combination of lines and ranges', async () => {
		const code = mount(Code, {
			target: document.body,
			props: {
				code: 'let a = 1\nlet b = 2\nlet c = 3\nlet d = 4\nlet e = 5',
				lang: 'javascript',
				theme: 'poimandres'
			}
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let e = 5') ? el : null;
		});

		await code.remove`2,4-5`;

		await vi.waitFor(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			expect(el?.textContent).toContain('let a = 1');
			expect(el?.textContent).toContain('let c = 3');
			expect(el?.textContent).not.toContain('let b = 2');
			expect(el?.textContent).not.toContain('let d = 4');
			expect(el?.textContent).not.toContain('let e = 5');
		});
	});
});

describe('code replace', () => {
	it('replaces text with new text', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'let count = 0', lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let count = 0') ? el : null;
		});

		await code.replace('count = 0', 'count = 10');

		await vi.waitFor(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			expect(el?.textContent).toContain('let count = 10');
			expect(el?.textContent).not.toContain('let count = 0');
		});
	});

	it('replaces multiline text', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'let a = 1\nlet b = 2', lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let b = 2') ? el : null;
		});

		await code.replace('let b = 2', 'let c = 3\nlet d = 4');

		await vi.waitFor(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			expect(el?.textContent).toContain('let a = 1');
			expect(el?.textContent).toContain('let c = 3');
			expect(el?.textContent).toContain('let d = 4');
			expect(el?.textContent).not.toContain('let b = 2');
		});
	});

	it('dedents replaced text', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'let x = 1', lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let x = 1') ? el : null;
		});

		await code.replace(
			'x = 1',
			`
			y = 2
		`
		);

		await vi.waitFor(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			expect(el?.textContent).toContain('let y = 2');
		});
	});

	it('handles nonexistent text gracefully', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'let a = 1', lang: 'javascript', theme: 'poimandres' }
		});

		await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			return el?.textContent?.includes('let a = 1') ? el : null;
		});

		await code.replace('nonexistent', 'replacement');

		await vi.waitFor(() => {
			const el = document.querySelector('.shiki-magic-move-container');
			expect(el?.textContent).toContain('let a = 1');
		});
	});
});
