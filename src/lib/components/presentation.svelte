<script lang="ts">
	import { tick, type Snippet } from 'svelte'
	import { setPresentation } from './store.svelte.js'
	import 'reveal.js/dist/reveal.css'

	type Options = {
		reload?: boolean
	}

	type PresentationProps = {
		[key: string]: any
		children?: Snippet
		options?: Reveal.Options & Options
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

		// expose reveal instance
		setPresentation(deck)

		// custom event listeners
		const inEvent = new CustomEvent('in')
		const outEvent = new CustomEvent('out')
		const currentEvent = new CustomEvent('current')

		// dispatch event for current active fragment
		// so `do` works in both directions
		async function dispatchFocused() {
			await tick()
			let currentFragmentEl = document.querySelector('.current-fragment')
			if (currentFragmentEl) {
				currentFragmentEl.dispatchEvent(currentEvent)
			}
		}

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

			dispatchFocused()
		})

		deck.on('slidetransitionend', (event) => {
			dispatchFocused()
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
				dispatchFocused()
			}
		})

		deck.on('fragmenthidden', (event) => {
			if ('fragment' in event) {
				const fragmentEl = event.fragment as HTMLElement
				fragmentEl?.dispatchEvent(outEvent)
				dispatchFocused()
			}
		})

		deck.initialize()

		if (options?.reload) {
			// reload page after update to avoid HMR issues
			reloadPageAfterUpdate()
		}
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
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
