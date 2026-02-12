import { mount } from 'svelte'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Code from './code.svelte'

afterEach(() => {
	document.body.innerHTML = ''
})

describe('code indentation', () => {
	it('returns original code if no tabs present', () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: '', lang: 'javascript', theme: 'poimandres' }
		})

		const input = `function hello() {\n  console.log('hi)\n}`

		expect(code.indent(input)).toBe(input)
	})

	it('removes common leading tabs from multi-line code', () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: '', lang: 'javascript', theme: 'poimandres' }
		})

		const input = `\t\tfunction hello() {\n\t\t\tconsole.log('hi')\n\t\t}`
		const expected = `function hello() {\n\tconsole.log('hi')\n}`

		expect(code.indent(input)).toBe(expected)
	})

	it('handles code with varying indentation levels', () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: '', lang: 'javascript', theme: 'poimandres' }
		})

		const input = `\t\t\tfunction hello() {\n\t\t\t\tconsole.log('hi')\n\t\t\t}`
		const expected = `function hello() {\n\tconsole.log('hi')\n}`

		expect(code.indent(input)).toBe(expected)
	})
})

describe('code update', () => {
	it('updates code', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: `let bool = false`, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container')
			return el?.textContent?.includes('let bool = false') ? el : null
		})) as HTMLPreElement

		expect(pre.textContent).toContain('let bool = false')

		await code.update`let bool = true`

		await vi.waitFor(() => {
			expect(pre.textContent).toContain('let bool = true')
		})
	})

	it('updates code with template literal expressions', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: `let bool = false`, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container')
			return el?.textContent?.includes('let bool = false') ? el : null
		})) as HTMLPreElement

		const expression = 'true'
		await code.update`let bool = ${expression}`

		await vi.waitFor(() => {
			expect(pre.textContent).toContain('let bool = true')
		})
	})
})

describe('code highlighting', () => {
	const multiLineCode = `let count = 0\nlet double = count * 2`

	function getTokensByLine(container: Element) {
		const lines: Map<number, HTMLElement[]> = new Map()
		let currentLine = 1
		lines.set(currentLine, [])

		for (const child of container.children) {
			if (child.tagName === 'BR') {
				currentLine++
				lines.set(currentLine, [])
			} else if (child.classList.contains('shiki-magic-move-item')) {
				const lineTokens = lines.get(currentLine) ?? []
				lineTokens.push(child as HTMLElement)
				lines.set(currentLine, lineTokens)
			}
		}

		return lines
	}

	function getAllTokens(container: Element) {
		return [...container.querySelectorAll<HTMLElement>('.shiki-magic-move-item')]
	}

	function getLine(lines: Map<number, HTMLElement[]>, lineNumber: number) {
		return lines.get(lineNumber) ?? []
	}

	it('selectLines selects a single line', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: multiLineCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container')
			return el?.textContent?.includes('let count') ? el : null
		})) as HTMLPreElement

		await code.selectLines`1`

		const lines = getTokensByLine(pre)
		for (const token of getLine(lines, 1)) {
			expect(token.classList.contains('selected')).toBe(true)
		}
		for (const token of getLine(lines, 2)) {
			expect(token.classList.contains('deselected')).toBe(true)
		}
	})

	it('selectLines selects multiple lines', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: multiLineCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container')
			return el?.textContent?.includes('let count') ? el : null
		})) as HTMLPreElement

		await code.selectLines`1,2`

		const tokens = getAllTokens(pre)
		for (const token of tokens) {
			expect(token.classList.contains('selected')).toBe(true)
			expect(token.classList.contains('deselected')).toBe(false)
		}
	})

	it('selectLines selects a range of lines', async () => {
		const threeLineCode = `let a = 1\nlet b = 2\nlet c = 3`
		const code = mount(Code, {
			target: document.body,
			props: { code: threeLineCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container')
			return el?.textContent?.includes('let a') ? el : null
		})) as HTMLPreElement

		await code.selectLines`1-2`

		const lines = getTokensByLine(pre)
		for (const token of getLine(lines, 1)) {
			expect(token.classList.contains('selected')).toBe(true)
		}
		for (const token of getLine(lines, 2)) {
			expect(token.classList.contains('selected')).toBe(true)
		}
		for (const token of getLine(lines, 3)) {
			expect(token.classList.contains('deselected')).toBe(true)
		}
	})

	it('selectLines selects a range using template literal expressions', async () => {
		const threeLineCode = `let a = 1\nlet b = 2\nlet c = 3`
		const code = mount(Code, {
			target: document.body,
			props: { code: threeLineCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container')
			return el?.textContent?.includes('let a') ? el : null
		})) as HTMLPreElement

		const start = '1'
		const end = '2'
		await code.selectLines`${start}-${end}`

		const lines = getTokensByLine(pre)
		for (const token of getLine(lines, 1)) {
			expect(token.classList.contains('selected')).toBe(true)
		}
		for (const token of getLine(lines, 2)) {
			expect(token.classList.contains('selected')).toBe(true)
		}
		for (const token of getLine(lines, 3)) {
			expect(token.classList.contains('deselected')).toBe(true)
		}
	})

	it('selectLines with * selects all lines', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: multiLineCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container')
			return el?.textContent?.includes('let count') ? el : null
		})) as HTMLPreElement

		// first deselect some lines so we can verify * resets everything
		await code.selectLines`1`
		// now select all
		await code.selectLines`*`

		const tokens = getAllTokens(pre)
		for (const token of tokens) {
			expect(token.classList.contains('selected')).toBe(true)
			expect(token.classList.contains('deselected')).toBe(false)
		}
	})

	it('selectToken selects matching tokens', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: multiLineCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container')
			return el?.textContent?.includes('let count') ? el : null
		})) as HTMLPreElement

		await code.selectToken`count`

		const tokens = getAllTokens(pre)
		for (const token of tokens) {
			if (token.textContent === 'count') {
				expect(token.classList.contains('selected')).toBe(true)
			} else {
				expect(token.classList.contains('deselected')).toBe(true)
			}
		}
	})

	it('selectToken selects matching tokens using template literal expressions', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: multiLineCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container')
			return el?.textContent?.includes('let count') ? el : null
		})) as HTMLPreElement

		const token = 'count'
		await code.selectToken`${token}`

		const tokens = getAllTokens(pre)
		for (const t of tokens) {
			if (t.textContent === 'count') {
				expect(t.classList.contains('selected')).toBe(true)
			} else {
				expect(t.classList.contains('deselected')).toBe(true)
			}
		}
	})

	it('selectToken selects a token on a specific line', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: multiLineCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container')
			return el?.textContent?.includes('let count') ? el : null
		})) as HTMLPreElement

		// `count` appears on line 1 (`let count = 0`) and line 2 (`let double = count * 2`)
		// selecting `2 count` targets line 2 — the selection array is ['2', 'count']
		// so tokens with text 'count' or '2' on line 2 get selected
		await code.selectToken`2 count`

		const lines = getTokensByLine(pre)

		// line 1 tokens should all be deselected
		for (const token of getLine(lines, 1)) {
			expect(token.classList.contains('deselected')).toBe(true)
		}

		// on line 2, `count` should be selected
		const countTokensOnLine2 = getLine(lines, 2).filter(
			(t) => t.textContent === 'count' && t.classList.contains('selected')
		)
		expect(countTokensOnLine2.length).toBeGreaterThan(0)

		// tokens on line 2 that are not in the selection should be deselected
		const deselectedOnLine2 = getLine(lines, 2).filter(
			(t) => t.textContent !== 'count' && t.textContent !== '2'
		)
		for (const token of deselectedOnLine2) {
			expect(token.classList.contains('deselected')).toBe(true)
		}
	})

	it('selectToken selects multiple tokens', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: multiLineCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector('.shiki-magic-move-container')
			return el?.textContent?.includes('let count') ? el : null
		})) as HTMLPreElement

		await code.selectToken`count double`

		const tokens = getAllTokens(pre)
		for (const token of tokens) {
			if (token.textContent === 'count' || token.textContent === 'double') {
				expect(token.classList.contains('selected')).toBe(true)
			} else {
				expect(token.classList.contains('deselected')).toBe(true)
			}
		}
	})
})

describe('code scrolling', () => {
	const longCode = Array.from({ length: 50 }, (_, i) => `let line${i + 1} = ${i + 1}`).join('\n')

	it('scrollToLine scrolls to a specific line', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: longCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector<HTMLElement>('.shiki-magic-move-container')
			return el?.textContent?.includes('let line1') ? el : null
		})) as HTMLElement

		Object.assign(pre.style, {
			height: '200px',
			overflow: 'auto'
		})

		expect(pre.scrollTop).toBe(0)
		await code.scrollToLine`25`
		expect(pre.scrollTop).toBeGreaterThan(0)
	})

	it('scrollToLine scrolls to line using template literal expressions', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: longCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector<HTMLElement>('.shiki-magic-move-container')
			return el?.textContent?.includes('let line1') ? el : null
		})) as HTMLElement

		Object.assign(pre.style, {
			height: '200px',
			overflow: 'auto'
		})

		const lineNumber = '30'
		await code.scrollToLine`${lineNumber}`

		expect(pre.scrollTop).toBeGreaterThan(0)
	})

	it('scrollToLine handles invalid line numbers', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: longCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector<HTMLElement>('.shiki-magic-move-container')
			return el?.textContent?.includes('let line1') ? el : null
		})) as HTMLElement

		Object.assign(pre.style, {
			height: '200px',
			overflow: 'auto'
		})

		const initialScroll = pre.scrollTop

		await code.scrollToLine`0`
		expect(pre.scrollTop).toBe(initialScroll)

		await code.scrollToLine`-5`
		expect(pre.scrollTop).toBe(initialScroll)

		await code.scrollToLine`not a number`
		expect(pre.scrollTop).toBe(initialScroll)
	})

	it('scrollToLine handles line numbers beyond the code length', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: 'let a = 1\nlet b = 2', lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector<HTMLElement>('.shiki-magic-move-container')
			return el?.textContent?.includes('let a') ? el : null
		})) as HTMLElement

		Object.assign(pre.style, {
			height: '200px',
			overflow: 'auto'
		})

		const initialScroll = pre.scrollTop
		await code.scrollToLine`100`
		expect(pre.scrollTop).toBe(initialScroll)
	})

	it('scrollToLine resolves immediately if already at target position', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: longCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector<HTMLElement>('.shiki-magic-move-container')
			return el?.textContent?.includes('let line1') ? el : null
		})) as HTMLElement

		Object.assign(pre.style, {
			height: '200px',
			overflow: 'auto'
		})

		const startTime = Date.now()
		await code.scrollToLine`1`
		const endTime = Date.now()

		expect(endTime - startTime).toBeLessThan(500)
	})

	it('scrollToLine centers the target line in viewport', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: longCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector<HTMLElement>('.shiki-magic-move-container')
			return el?.textContent?.includes('let line1') ? el : null
		})) as HTMLElement

		const containerHeight = 400
		Object.assign(pre.style, {
			height: `${containerHeight}px`,
			overflow: 'auto'
		})

		await code.scrollToLine`25`

		const scrollPosition = pre.scrollTop
		expect(scrollPosition).toBeGreaterThan(0)

		const maxScroll = pre.scrollHeight - pre.clientHeight
		expect(scrollPosition).toBeLessThan(maxScroll)
	})

	it('scrollToLine handles whitespace in template literal', async () => {
		const code = mount(Code, {
			target: document.body,
			props: { code: longCode, lang: 'javascript', theme: 'poimandres' }
		})

		const pre = (await vi.waitUntil(() => {
			const el = document.querySelector<HTMLElement>('.shiki-magic-move-container')
			return el?.textContent?.includes('let line1') ? el : null
		})) as HTMLElement

		Object.assign(pre.style, {
			height: '200px',
			overflow: 'auto'
		})

		await code.scrollToLine`  20  `
		expect(pre.scrollTop).toBeGreaterThan(0)
	})
})
