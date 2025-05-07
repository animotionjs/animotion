<script lang="ts">
	import { Transition } from '$lib/index.js'
	import type { Snippet } from 'svelte'

	type TransitionProps = {
		[key: string]: unknown
		children?: Snippet
		do?: () => void
		undo?: () => void
		class?: string
		style?: string
		order?: number
		stepDuration?: number
		name?: string
		enter?: string
		visible?: boolean
		hidden?: boolean
		transitions?: Array<() => void>
	}

	const noop = () => {}

	let {
		children,
		order,
		stepDuration,
		name,
		enter = 'enter',
		visible = false,
		transitions,
		hidden,
		...props
	}: TransitionProps = $props()

	let el = $state<HTMLDivElement>()
	let viewTransitionName = name ? `transition-${name}` : `transition-${crypto.randomUUID()}`

	function viewTransition(fn: () => void) {
		if (!document.startViewTransition) {
			console.warn('The View Transitions API is not supported by your browser')
			fn()
			return
		}
		document.startViewTransition(fn)
	}

	/**
	 * Transition elements are hidden so we can animate the change in position
	 * otherwise the layout would never change if they're already in the DOM
	 * so this checks for fragments that aren't visible and hides them.
	 */
	function prepareTransition() {
		const currentSlide = el?.closest('section')!
		currentSlide.querySelectorAll('.fragment').forEach((fragment) => {
			if (!fragment.classList.contains('visible')) {
				fragment.classList.add('hidden')
			}
		})
	}

	function enterTransition() {
		prepareTransition()

		viewTransition(() => {
			props?.do?.() ?? noop()
			el?.classList.remove(enter)
			el?.classList.add(enter)
			el?.classList.remove('hidden')
		})
	}

	function leaveTransition() {
		prepareTransition()

		viewTransition(() => {
			props?.undo?.() ?? noop()
			el?.classList.remove(enter)
		})
	}

	$effect(() => {
		if (!el) return

		// if element should be visible animate it
		if (visible) {
			el.classList.add(enter)
			return
		}

		el.addEventListener('current', enterTransition)
		el.addEventListener('out', leaveTransition)

		return () => {
			el?.addEventListener('current', enterTransition)
			el?.removeEventListener('out', leaveTransition)
		}
	})
</script>

{#if transitions}
	{#each transitions as transition, i}
		{@const previousTransition = i === 0 ? noop : transitions[i - 1]}
		<Transition do={transition} undo={previousTransition} />
	{/each}
{:else}
	<div
		bind:this={el}
		class:fragment={!visible}
		class={[{ hidden: !visible, ignore: hidden }, props.class]}
		data-fragment-index={order}
		data-autoslide={stepDuration}
		style:view-transition-name={viewTransitionName}
		style={props.style}
	>
		{@render children?.()}
	</div>
{/if}

<style>
	.ignore {
		display: none;
	}
</style>
