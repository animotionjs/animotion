<script lang="ts">
	import { onMount, setContext } from 'svelte'
	import { writable } from 'svelte/store'

	import Reveal from 'reveal.js'
	import Markdown from 'reveal.js/plugin/markdown/markdown'
	import Highlight from 'reveal.js/plugin/highlight/highlight'
	import Math from 'reveal.js/plugin/math/math'
	import Notes from 'reveal.js/plugin/notes/notes'

	import { registerLanguages } from '@lib/languages'

	import 'reveal.js/dist/reveal.css'
	import '@styles/theme.css'
	import '@styles/code.css'

	const currentSlide = writable(0)
	setContext('active', currentSlide)

	onMount(() => {
		const deck = new Reveal({
			// plugins
			plugins: [Markdown, Highlight, Math, Notes],
			// syntax highlight options
			highlight: {
				// add new languages
				beforeHighlight: registerLanguages,
				// disable automatic syntax highlighting
				highlightOnLoad: false,
			},
			// slide controls
			controls: false,
			// slide progress bar
			progress: false,
			// slide transition
			transition: 'fade',
			// slide numbers
			hash: true,
		})

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
