<script lang="ts">
	import Reveal from 'reveal.js'
	import Markdown from 'reveal.js/plugin/markdown/markdown'
	import Highlight from 'reveal.js/plugin/highlight/highlight'
	import Math from 'reveal.js/plugin/math/math'
	import Notes from 'reveal.js/plugin/notes/notes'
	import type { Snippet } from 'svelte'
	import type { HLJSApi } from 'highlight.js'
	import { svelte } from '../languages'

	type PresentationProps = {
		children: Snippet
		options?: Reveal.Options
	}

	let { children, options }: PresentationProps = $props()

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
		disableLayout: false,
		// display mode used to show slides
		display: 'block',
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
		hash: true
	}

	$effect(() => {
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
	})

	function highlightCodeBlocks(deck: Reveal.Api) {
		const highlight = deck.getPlugin('highlight')
		const codeBlocks = [...document.querySelectorAll('code')]
		codeBlocks.forEach((block) => {
			// remove Svelte generated HTML comments
			block.innerHTML = block.innerHTML.replace(/&lt;!----&gt;/, '')

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
</script>

<div class="reveal">
	<div class="slides">
		{@render children()}
	</div>
</div>
