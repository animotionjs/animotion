<script lang="ts">
	import { onMount } from 'svelte'

	import 'reveal.js/dist/reveal.css'
	import './styles/theme.css'
	import './styles/code.css'

	import { navigation } from './stores/navigation'

	export let options = {}

	onMount(async () => {
		const Reveal = (await import('reveal.js')).default
		const Highlight = (await import('reveal.js/plugin/highlight/highlight')).default
		const Math = (await import('reveal.js/plugin/math/math')).default
		const Notes = (await import('reveal.js/plugin/notes/notes')).default

		/*
			to have multiple slides we pass the new reference
			for the keynote and have to set `embedded: true`
		*/
		const deck = new Reveal(keynote, {
			plugins: [Highlight, Math.KaTeX, Notes],
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
