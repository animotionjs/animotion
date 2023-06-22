<script lang="ts">
	import { onMount, setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import Reveal from 'reveal.js'

	import 'reveal.js/dist/reveal.css'
	import '@styles/theme.css'
	import '@styles/code.css'

	import options from '@config'

	const currentSlide = writable(0)
	setContext('active', currentSlide)

	onMount(() => {
		const deck = new Reveal(options)

		// keep track of current slide
		deck.on('slidechanged', (event) => {
			// @ts-ignore
			$currentSlide = event.indexh
		})

		deck.initialize().then(() => {
			const highlight = deck.getPlugin('highlight')
			const codeBlocks = document.querySelectorAll('code')

			// we pass the language to the code block
			// and higlight code after initialization
			Array.from(codeBlocks).forEach((block) => {
				// @ts-ignore
				highlight.highlightBlock(block)
			})
		})

		// reload page after update to avoid HMR issues
		if (import.meta.hot) {
			import.meta.hot.on('vite:afterUpdate', () => {
				location.reload()
			})
		}
	})
</script>

<div class="reveal">
	<div class="slides">
		<slot />
	</div>
</div>
