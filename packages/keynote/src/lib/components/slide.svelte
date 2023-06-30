<script context="module" lang="ts">
	let index = 0
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { navigation } from '@stores/navigation'

	export let animate = null
	export let animateEasing = null
	export let animateUnmatched = null
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

	const dispatch = createEventDispatcher()
	const slideIndex = index++

	$: enter = $navigation.currentSlide === slideIndex
	$: enter ? dispatch('in') : dispatch('out')

	delete $$restProps.css
</script>

<section
	data-auto-animate={animate}
	data-auto-animate-easing={animateEasing}
	data-auto-animate-unmatched={animateUnmatched}
	data-auto-animate-id={animateId}
	data-auto-animate-restart={animateRestart}
	data-background-color={background}
	data-background-gradient={gradient}
	data-background-image={image}
	data-background-video={video}
	data-background-iframe={iframe}
	data-background-interactive={interactive}
	data-transition={transition}
	class={$$props.class || ''}
	{...$$restProps}
>
	<slot />
</section>
