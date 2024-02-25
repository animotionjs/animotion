<script lang="ts">
	import { onMount } from 'svelte'

	import 'reveal.js/dist/reveal.css'
	import './styles/theme.css'
	import './styles/code.css'

	export let options = {}

	onMount(async () => {
		const Reveal = (await import('reveal.js')).default
		const Highlight = (await import('reveal.js/plugin/highlight/highlight')).default
		const Math = (await import('reveal.js/plugin/math/math')).default
		const Notes = (await import('reveal.js/plugin/notes/notes')).default

		/*
			to have multiple slides we pass the new reference
			to animotion and have to set `embedded: true`
		*/
		const deck = new Reveal(animotion, {
			plugins: [Highlight, Math.KaTeX, Notes],
			embedded: true,
			...options
		})

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
						detail: { lines: el.dataset.lineNumbers }
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

		deck.initialize()
	})

	let animotion: HTMLElement
</script>

<div bind:this={animotion} class="reveal">
	<div class="slides">
		<slot />
	</div>
</div>

<style lang="postcss">
	.reveal {
		height: 200px;
		margin-block: var(--size-3);

		@media (width > 600px) {
			height: 400px;
		}
	}
</style>
