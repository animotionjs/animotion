<svelte:options runes />

<script lang="ts">
	import AnimotionSlide from './slide.svelte'
	import type { Component } from 'svelte'

	let { center = false } = $props()

	const slides = Object.entries(
		import.meta.glob<{
			default: Component
			component?: Component
			props?: any
		}>('/src/slides/**/slide.svelte', {
			eager: true
		})
	)
		.map(([filename, exports]) => {
			const matches = filename.match(/slides\/(?<number>\d+)\/slide.svelte/)
			return [+matches!.groups!.number, exports] as const
		})
		.sort(([a], [b]) => a - b)
</script>

{#each slides as [_, Slide]}
	{@const Wrapper = Slide.component ?? AnimotionSlide}
	{@const props = {
		class: center ? 'h-full place-content-center place-items-center' : null,
		...(Slide.props ?? {})
	}}
	<Wrapper {...props}>
		<Slide.default></Slide.default>
	</Wrapper>
{/each}
