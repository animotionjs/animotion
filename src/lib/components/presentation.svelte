<script lang="ts">
	import { writable } from 'svelte/store'
	import { onMount, setContext } from 'svelte'
	import Reveal from 'reveal.js'

	import Markdown from 'reveal.js/plugin/markdown/markdown'
	import Highlight from 'reveal.js/plugin/highlight/highlight'
	import Math from 'reveal.js/plugin/math/math'
	import Notes from 'reveal.js/plugin/notes/notes'

	import 'reveal.js/dist/reveal.css'
	import '@styles/theme.css'
	import '@styles/code.css'

	const currentSlide = writable(0)
	setContext('active', currentSlide)

	onMount(() => {
		const deck = new Reveal({
			plugins: [Markdown, Highlight, Math, Notes],
			controls: false,
			progress: false,
			transition: 'fade',
			hash: true,
		})

		deck.on('slidechanged', (event) => {
			// @ts-ignore
			$currentSlide = event.indexh
		})

		deck.initialize()
	})
</script>

<div class="reveal">
	<div class="slides">
		<slot />
	</div>
</div>
