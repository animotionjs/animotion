<script context="module" lang="ts">
	let id = 0
</script>

<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte'
	import type { Writable } from 'svelte/store'

	export let animate = false
	export let animateId = null
	export let animateRestart = null

	const slideId = id++
	const dispatch = createEventDispatcher()
	const currentSlide = getContext<Writable<number>>('active')

	$: $currentSlide === slideId ? dispatch('active') : dispatch('inactive')
</script>

<section
	data-auto-animate={animate || null}
	data-auto-animate-id={animateId}
	data-auto-animate-restart={animateRestart}
	{...$$props}
>
	<slot />
</section>
