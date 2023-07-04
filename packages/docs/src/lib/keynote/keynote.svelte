<script lang="ts">
	import { onMount } from 'svelte'
	import Reveal from 'reveal.js'

	import 'reveal.js/dist/reveal.css'
	import './styles/theme.css'
	import './styles/code.css'

	import Markdown from 'reveal.js/plugin/markdown/markdown'
	import Highlight from 'reveal.js/plugin/highlight/highlight'
	import Math from 'reveal.js/plugin/math/math'
	import Notes from 'reveal.js/plugin/notes/notes'

	onMount(async () => {
		/*
			to have multiple slides we pass the new reference
			for the keynote and have to set `embedded: true`
		*/
		const deck = new Reveal(keynote, {
			plugins: [Markdown, Highlight, Math.KaTeX, Notes],
			embedded: true
		})
		deck.initialize()
	})

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
