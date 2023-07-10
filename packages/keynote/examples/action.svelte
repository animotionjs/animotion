<script lang="ts">
	import { Code, Slide } from '@components'

	let videoEl
	let show = false

	function fade(element, { duration = 1_000, delay = 0 } = {}) {
		const keyframes = {
			opacity: [0, 1],
		}
		const options = {
			fill: 'both',
			duration,
			delay,
		}
		const animation = element.animate(keyframes, options)
		animation.onfinish = () => {
			element.dispatchEvent(new CustomEvent('finish'))
		}
	}
</script>

{#if show}
	<div class="absolute right-[20%] top-[50%] z-20 translate-y-[-50%]">
		<h1 use:fade={{ delay: 600 }} on:finish={() => videoEl.play()}>Fade</h1>
		<video
			use:fade
			class="mt-4 aspect-video rounded-xl"
			bind:this={videoEl}
			src="video.mp4"
			muted
			loop
		/>
	</div>
{/if}

<Slide animate>
	<Code lang="ts">
		{`
				function fade()
			`}
	</Code>
</Slide>

<Slide animate>
	<Code lang="ts" lines="2-3">
		{`
				function fade(
					element,
					{ duration = 1_000, delay = 0 } = {}
				)
			`}
	</Code>
</Slide>

<Slide animate>
	<Code lang="ts" lines="5">
		{`
				function fade(
					element,
					{ duration = 1_000, delay = 0 } = {}
				) {
					const keyframes = { opacity: [0, 1]	}
				}
			`}
	</Code>
</Slide>

<Slide animate>
	<Code lang="ts" lines="6">
		{`
				function fade(
					element,
					{ duration = 1_000, delay = 0 } = {}
				) {
					const keyframes = {	opacity: [0, 1]	}
					const options = {	fill: 'both', duration,	delay	}
				}
			`}
	</Code>
</Slide>

<Slide animate>
	<Code lang="ts" lines="7">
		{`
				function fade(
					element,
					{ duration = 1_000, delay = 0 } = {}
				) {
					const keyframes = {	opacity: [0, 1]	}
					const options = {	fill: 'both', duration,	delay	}
					const animation = element.animate(keyframes, options)
				}
			`}
	</Code>
</Slide>

<Slide animate>
	<Code lang="ts" lines="9-11">
		{`
				function fade(
					element,
					{ duration = 1_000, delay = 0 } = {}
				) {
					const keyframes = {	opacity: [0, 1]	}
					const options = {	fill: 'both', duration,	delay	}
					const animation = element.animate(keyframes, options)

					animation.onfinish = () => {
						element.dispatchEvent(new CustomEvent('finish'))
					}
				}
			`}
	</Code>
</Slide>

<Slide animate>
	<Code lang="svelte">
		{`
				<script>
					let videoEl
				<\/script>

				<h1>Fade</h1>

				<video bind:this={videoEl} src="video.mp4" muted loop />
			`}
	</Code>
</Slide>

<Slide animate>
	<Code lang="svelte" offset="5" lines="2">
		{`
				<h1
					use:fade
				>
					Fade
				</h1>
			`}
	</Code>
</Slide>

<Slide animate>
	<Code lang="svelte" offset="5" lines="3">
		{`
				<h1
					use:fade
					on:finish={() => videoEl.play()}
				>
					Fade
				</h1>
			`}
	</Code>
</Slide>

<Slide on:in={() => (show = true)} style="translate: -18% 0%" animate>
	<Code lang="svelte" offset="5" lines="|">
		{`
				<h1
					use:fade
					on:finish={() => videoEl.play()}
				>
					Fade
				</h1>
			`}
	</Code>
</Slide>

<style>
	:global(pre) {
		translate: 25% 0%;
	}
</style>
