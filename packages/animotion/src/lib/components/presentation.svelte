<script lang="ts">
	import { onMount } from 'svelte'
	import Reveal from 'reveal.js'
	import options from '@config'

	import 'reveal.js/dist/reveal.css'
	import '@styles/theme.css'
	import '@styles/code.css'

	onMount(() => {
		// create deck instance
		const deck = new Reveal(options)

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
						detail: { lines: el.dataset.lineNumbers },
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
		// reloadPageAfterUpdate()
	})

	function highlightCodeBlocks(deck: Reveal.Api) {
		const highlight = deck.getPlugin('highlight')
		const codeBlocks = [...document.querySelectorAll('code')]
		codeBlocks.forEach((block) => {
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
		<slot />
	</div>
</div>
