<svelte:options runes />

<script lang="ts">
	import { Presentation, Slide as AnimotionSlide } from '@animotion/core';
	import type { Component } from 'svelte';
	import type { Props } from '../slides/types';

	const slides = Object.entries(
		import.meta.glob<{
			default: Component;
			component?: Component;
			props?: Props;
		}>('../slides/**/index.svelte', {
			eager: true,
		})
	)
		.map(([filename, exports]) => {
			const matches = filename.match(
				/slides\/(?<number>\d+)\/index.svelte/
			);
			return [+matches!.groups!.number, exports] as const;
		})
		.sort(([num_a], [num_b]) => num_a - num_b);
</script>

<Presentation
	options={{
		history: true,
		transition: 'slide',
		controls: false,
		progress: true,
	}}
>
	{#each slides as [_, slide]}
		{@const Wrapper = slide.component ?? AnimotionSlide}
		<Wrapper {...slide.props ?? {}}>
			<slide.default></slide.default>
		</Wrapper>
	{/each}
</Presentation>
