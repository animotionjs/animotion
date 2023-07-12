<script lang="ts">
	import { onMount } from 'svelte'
	import Reveal from 'reveal.js'

	import Markdown from 'reveal.js/plugin/markdown/markdown'
	import Highlight from 'reveal.js/plugin/highlight/highlight'
	import Math from 'reveal.js/plugin/math/math'
	import Notes from 'reveal.js/plugin/notes/notes'

	import 'reveal.js/dist/reveal.css'
	import './styles/theme.css'
	import './styles/code.css'

	import { navigation } from './stores/navigation'

	export const options = {}

	onMount(() => {
		/*
			to have multiple slides we pass the new reference
			for the keynote and have to set `embedded: true`
		*/
		const deck = new Reveal(keynote, {
			plugins: [Markdown, Highlight, Math.KaTeX, Notes],
			embedded: true,
			...options
		})
		deck.on('slidechanged', () => updateSlideStore(deck))
		deck.initialize().then(() => updateSlideStore(deck))
	})

	function updateSlideStore(deck: Reveal.Api) {
		$navigation = {
			hash: window.location.hash,
			currentSlide: deck.getSlidePastCount(),
			indices: deck.getIndices(),
			availableRoutes: deck.availableRoutes()
		}
	}

	let keynote: HTMLElement
</script>

<div bind:this={keynote} class="reveal">
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
