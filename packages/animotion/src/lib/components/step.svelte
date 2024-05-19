<script lang="ts">
	import type { Snippet } from 'svelte'

	type StepProps = {
		children?: Snippet
		in?: () => void
		out?: () => void
		class?: string
		order?: string | null
		fadeIn?: boolean
		fadeOut?: boolean
		fadeUp?: boolean
		fadeDown?: boolean
		fadeLeft?: boolean
		fadeRight?: boolean
		fadeInThenOut?: boolean
		currentVisible?: boolean
		fadeInThenSemiOut?: boolean
		semiFadeOut?: boolean
		highlightRed?: boolean
		highlightGreen?: boolean
		highlightBlue?: boolean
		highlightCurrentRed?: boolean
		highlightCurrentGreen?: boolean
		highlightCurrentBlue?: boolean
		grow?: boolean
		shrink?: boolean
		strike?: boolean
	}

	let { children, ...props }: StepProps = $props()

	function listeners(el: HTMLElement) {
		const events = ['in', 'out'] as const
		events.forEach((event) => el.addEventListener(event, () => props[event]?.()))
	}
</script>

<p
	use:listeners
	class:fade-in={props.fadeIn}
	class:fade-out={props.fadeOut}
	class:fade-up={props.fadeUp}
	class:fade-down={props.fadeDown}
	class:fade-left={props.fadeLeft}
	class:fade-right={props.fadeRight}
	class:fade-in-then-out={props.fadeInThenOut}
	class:current-visible={props.currentVisible}
	class:fade-in-then-semi-out={props.fadeInThenSemiOut}
	class:semi-fade-out={props.semiFadeOut}
	class:highlight-red={props.highlightRed}
	class:highlight-green={props.highlightGreen}
	class:highlight-blue={props.highlightBlue}
	class:highlight-current-red={props.highlightCurrentRed}
	class:highlight-current-green={props.highlightCurrentGreen}
	class:highlight-current-blue={props.highlightCurrentBlue}
	class:grow={props.grow}
	class:shrink={props.grow}
	class:strike={props.strike}
	class="fragment {props.class}"
	data-fragment-index={props.order}
>
	{#if children}
		{@render children()}
	{/if}
</p>
