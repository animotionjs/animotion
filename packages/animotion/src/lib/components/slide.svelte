<script lang="ts">
	import type { Snippet } from 'svelte'

	type SlideProps = {
		children?: Snippet
		in?: () => void
		out?: () => void
		animate?: boolean
		animateEasing?: string
		animateUnmatched?: boolean
		animateId?: string
		animateRestart?: boolean
		stepDuration?: number
		background?: string
		gradient?: string
		image?: string
		video?: string
		iframe?: string
		interactive?: boolean
		transition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom'
		class?: string
	}

	let { children, ...props }: SlideProps = $props()

	function listeners(el: HTMLElement) {
		const events = ['in', 'out'] as const
		events.forEach((event) => el.addEventListener(event, () => props[event]?.()))
	}
</script>

<section
	use:listeners
	data-auto-animate={props.animate}
	data-auto-animate-easing={props.animateEasing}
	data-auto-animate-unmatched={props.animateUnmatched}
	data-auto-animate-id={props.animateId}
	data-auto-animate-restart={props.animateRestart}
	data-autoslide={props.stepDuration}
	data-background-color={props.background}
	data-background-gradient={props.gradient}
	data-background-image={props.image}
	data-background-video={props.video}
	data-background-iframe={props.iframe}
	data-background-interactive={props.interactive}
	data-transition={props.transition}
	class={props.class}
>
	{#if children}
		{@render children()}
	{/if}
</section>
