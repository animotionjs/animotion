<script context="module" lang="ts">
	let index = 0
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { store } from '@store'

	export let animate = false
	export let animateId = null
	export let animateRestart = null
	export let background = null
	export let gradient = null
	export let image = null
	export let video = null
	export let iframe = null
	export let interactive = null
	export let transition:
		| 'none'
		| 'fade'
		| 'slide'
		| 'convex'
		| 'concave'
		| 'zoom' = null

	const slideIndex = index++
	const dispatch = createEventDispatcher()

	$: entered = $store.currentSlideIndex === slideIndex
	$: entered ? dispatch('entered') : dispatch('left')
</script>

<section
	data-auto-animate={animate || null}
	data-auto-animate-id={animateId}
	data-auto-animate-restart={animateRestart}
	data-background-color={background}
	data-background-gradient={gradient}
	data-background-image={image}
	data-background-video={video}
	data-background-iframe={iframe}
	data-background-interactive={interactive}
	data-transition={transition}
	{...$$props}
>
	<slot />
</section>
