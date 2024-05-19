<script lang="ts">
	import { type Snippet } from 'svelte'
	import type Reveal from 'reveal.js'

	import 'reveal.js/dist/reveal.css'
	import '../styles/theme.css'
	import '../styles/code.css'

	type PresentationProps = {
		children: Snippet
		options?: Reveal.Options
	}

	let { children, options }: PresentationProps = $props()

	async function init() {
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
			highlight: {
				beforeHighlight() {
					const codeBlocks = [...document.querySelectorAll('.code-wrapper code')]
					codeBlocks.forEach((block) => {
						// remove Svelte hydration markers
						const comments = /&lt;!--\[--&gt;\s|&lt;!--\]--&gt;|&lt;!----&gt;/g
						const code = block.innerHTML.replace(comments, '')
						block.innerHTML = indent(code)
					})
				}
			},
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
						detail: { step: el.dataset.lineNumbers }
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
	}

	function indent(code: string) {
		if (!code.startsWith('\t')) {
			return code
		}

		const tabs = code
			.trim()
			.split('\n')
			.map((line) => line.split('').filter((char) => char === '\t'))
			.filter((line) => line.length !== 0)
			.sort((a, b) => a.length - b.length)[0]
			.join('')

		return code
			.split('\n')
			.map((line) => line.replace(tabs, ''))
			.join('\n')
	}

	$effect(() => {
		init()
	})

	let animotion: HTMLElement
</script>

<div bind:this={animotion} class="reveal">
	<div class="slides">
		{@render children()}
	</div>
</div>

<style>
	.reveal {
		height: 200px;
		margin-block: var(--size-3);

		@media (width > 600px) {
			height: 400px;
		}
	}
</style>
