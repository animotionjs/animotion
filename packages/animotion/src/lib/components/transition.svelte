<script lang="ts">
	import type { Snippet } from 'svelte'

	type TransitionProps = {
		children?: Snippet
		order?: number
		name?: string
		enter?: string
		do?: () => void
		class?: string
	}

	const noop = () => {}

	let { children, order, name, enter = 'enter', ...props }: TransitionProps = $props()

	let el: HTMLDivElement
	let viewTransitionName = name ? `transition-${name}` : `transition-${crypto.randomUUID()}`

	function viewTransition(fn: () => void) {
		if (!document.startViewTransition) {
			console.warn('The View Transitions API is not supported by your browser')
			fn()
			return
		}
		document.startViewTransition(fn)
	}

	function enterTransition() {
		viewTransition(() => {
			props?.do?.() ?? noop()
			el.classList.add(enter)
			el.classList.remove('hidden')
		})
	}

	function leaveTransition() {
		viewTransition(() => {
			el.classList.remove(enter)
			el.classList.remove('hidden')
		})
	}

	$effect(() => {
		el.addEventListener('in', enterTransition)
		el.addEventListener('out', leaveTransition)

		return () => {
			el.removeEventListener('in', enterTransition)
			el.removeEventListener('out', leaveTransition)
		}
	})
</script>

<div
	bind:this={el}
	class="fragment hidden {props.class}"
	data-fragment-index={order}
	style:view-transition-name={viewTransitionName}
>
	{#if children}
		{@render children()}
	{/if}
</div>
