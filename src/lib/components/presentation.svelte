<script lang="ts">
	import { onMount } from 'svelte'
	import Reveal from 'reveal.js'

	import 'reveal.js/dist/reveal.css'
	import '@styles/theme.css'
	import '@styles/code.css'

	import { store } from '@store'
	import options from '@config'

	onMount(() => {
		const deck = new Reveal(options)

		// keep track of current slide
		deck.on('slidetransitionend', updateSlideStore)

		// we pass the language to the `<Code>` block
		// and higlight code blocks after initialization
		deck.initialize().then(() => highlightCodeBlocks(deck))

		// reload page after update to avoid HMR issues
		reloadPageAfterUpdate()
	})

	function updateSlideStore(event: any) {
		$store = {
			hash: Number(window.location.hash.split('#/')[1]),
			currentSlideIndex: event.indexh,
			previousSlideIndex: event.indexh - 1,
			nextSlideIndex: event.indexh + 1,
		}
	}

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
