<script lang="ts">
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	import { confetti } from '@neoconfetti/svelte'

	const count = tweened(0, { duration: 1000, easing: cubicOut })
	const subscribers = 10_000

	$: showConfetti = $count === subscribers
</script>

<Presentation>
	<Slide animate>
		<Code>
			{`
				const bool;
			`}
		</Code>
	</Slide>

	<Slide animate animateRestart>
		<Code>
			{`
				const bool = true;
			`}
		</Code>
	</Slide>

	<Slide animate>
		<Code lines="1|2" offset="4">
			{`
				const bool = true;
				// ...
			`}
		</Code>
	</Slide>

	<Slide animate>
		<p class="text-4xl">Subscribers</p>
	</Slide>

	<Slide
		on:active={() => ($count = subscribers)}
		on:inactive={() => ($count = 0)}
		animate
	>
		<p class="text-6xl">Subscribers</p>
		<p class="text-8xl mt-16 font-bold">
			{$count.toLocaleString('en', { maximumFractionDigits: 0 })}
		</p>

		{#if showConfetti}
			<div class="absolute top-1/2 left-1/2">
				<div use:confetti={{ particleCount: 200 }} />
			</div>
		{/if}
	</Slide>
</Presentation>
