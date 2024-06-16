<script lang="ts">
	import type { Snippet } from 'svelte'

	type TransitionProps = {
		children?: Snippet
		order?: number
		name?: string
		transition?: string
		action?: () => void
		class?: string
	}

	const noop = () => {}

	let {
		children,
		order,
		name,
		transition = 'transition-enter',
		action = noop,
		...props
	}: TransitionProps = $props()

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

	function enter() {
		viewTransition(() => {
			action()
			el.classList.add(transition)
			el.classList.remove('hidden')
		})
	}

	function leave() {
		viewTransition(() => {
			el.classList.remove(transition)
			el.classList.remove('hidden')
		})
	}

	$effect(() => {
		el.addEventListener('in', enter)
		el.addEventListener('out', leave)

		return () => {
			el.removeEventListener('in', enter)
			el.removeEventListener('out', leave)
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
