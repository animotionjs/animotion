<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HLJSApi } from 'highlight.js'
	import { svelte } from '../languages/index.js'
	import 'reveal.js/dist/reveal.css'

	type PresentationProps = {
		[key: string]: any
		children: Snippet
		options?: Reveal.Options
		class?: string
	}

	let { children, options, ...props }: PresentationProps = $props()

	async function init() {
		const Reveal = (await import('reveal.js')).default
		const Markdown = (await import('reveal.js/plugin/markdown/markdown')).default
		const Highlight = (await import('reveal.js/plugin/highlight/highlight')).default
		const Math = (await import('reveal.js/plugin/math/math')).default
		const Notes = (await import('reveal.js/plugin/notes/notes')).default

		const defaults: Reveal.Options = {
			// presentation size respecting aspect ratio
			width: 960,
			height: 700,
			// content padding
			margin: 0.04,
			// smallest and largest possible scale
			minScale: 0.2,
			maxScale: 2.0,
			// plugins
			plugins: [Markdown, Highlight, Math.KaTeX, Notes],
			// syntax highlight options
			highlight: {
				// add new languages
				beforeHighlight: (hljs: HLJSApi) => {
					hljs.registerLanguage('svelte', svelte)
				},
				// disable automatic syntax highlighting
				highlightOnLoad: false
			},
			// slide controls
			controls: true,
			// slide progress bar
			progress: true,
			// slide transition
			transition: 'slide',
			// bring your own layout
			disableLayout: true,
			// display mode used to show slides
			display: 'grid',
			// center slides on the screen
			center: true,
			// auto-animate duration
			autoAnimateDuration: 1,
			// auto-animate easing
			autoAnimateEasing: 'ease',
			// animate unmatched elements
			autoAnimateUnmatched: true,
			// hide cursor
			hideInactiveCursor: true,
			// time before cursor is hidden (ms)
			hideCursorTime: 5000,
			// show current slide
			hash: false
		}

		// create deck instance
		const deck = new Reveal({ ...defaults, ...options })

		// custom event listeners
		const inEvent = new CustomEvent('in')
		const outEvent = new CustomEvent('out')

		// keep track of current slide
		deck.on('slidechanged', (event) => {
			if ('currentSlide' in event) {
				const currentSlideEl = event.currentSlide as HTMLElement
				currentSlideEl?.dispatchEvent(inEvent)
			}

			if ('previousSlide' in event) {
				const currentPreviousEl = event.previousSlide as HTMLElement
				currentPreviousEl?.dispatchEvent(outEvent)
			}
		})

		deck.on('fragmentshown', (event) => {
			if ('fragment' in event) {
				const el = event.fragment as HTMLElement
				let eventType: Event

				if (el.tagName === 'CODE') {
					const codeEvent = new CustomEvent('change', {
						bubbles: true,
						detail: { step: el.dataset.lineNumbers }
					})
					eventType = codeEvent
				} else {
					eventType = inEvent
				}

				el?.dispatchEvent(eventType)
			}
		})

		deck.on('fragmenthidden', (event) => {
			if ('fragment' in event) {
				const fragmentEl = event.fragment as HTMLElement
				fragmentEl?.dispatchEvent(outEvent)
			}
		})

		deck.initialize().then(() => {
			// we pass the language to the `<Code>` block
			// and higlight code blocks after initialization
			highlightCodeBlocks(deck)
		})

		// reload page after update to avoid HMR issues
		reloadPageAfterUpdate()
	}

	function indent(code: string) {
		if (!code.startsWith('\t')) {
			return code
		}

		const tabs = code
			.trim()
			.split('\n')
			.map((line) => line.split('').filter((char) => char === '\t'))
			.filter((line) => line.length !== 0)
			.sort((a, b) => a.length - b.length)[0]
			.join('')

		return code
			.split('\n')
			.map((line) => line.replace(tabs, ''))
			.join('\n')
	}

	function highlightCodeBlocks(deck: Reveal.Api) {
		const highlight = deck.getPlugin('highlight')
		const codeBlocks = [...document.querySelectorAll('.code-wrapper code')]
		codeBlocks.forEach((block) => {
			// remove Svelte hydration markers
			const comments = /&lt;!--\[--&gt;\s|&lt;!--\]--&gt;|&lt;!----&gt;/g
			const code = block.innerHTML.replace(comments, '')
			block.innerHTML = indent(code)

			// @ts-ignore
			highlight.highlightBlock(block)
		})
	}

	function reloadPageAfterUpdate() {
		if (import.meta.hot) {
			import.meta.hot.on('vite:afterUpdate', () => {
				location.reload()
			})
		}
	}

	$effect(() => {
		init()
	})
</script>

<div class="reveal">
	<div class="slides {props.class}">
		{@render children()}
	</div>
</div>
