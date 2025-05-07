<script lang="ts">
	import { Action } from '$lib/index.js'

	type ActionProps = {
		order?: number
		do?: () => void
		undo?: () => void
		actions?: Array<() => void>
	}

	let { order, actions, ...props }: ActionProps = $props()
	let el = $state<HTMLDivElement>()

	const noop = () => {}
	const action = () => props?.do?.() ?? noop()
	const undo = () => props?.undo?.() ?? noop()

	$effect(() => {
		el?.addEventListener('current', action)
		el?.addEventListener('out', undo)

		return () => {
			el?.removeEventListener('current', action)
			el?.removeEventListener('out', undo)
		}
	})
</script>

{#if actions}
	{#each actions as action, i}
		{@const previousAction = i === 0 ? undo : actions[i - 1]}
		<Action do={action} undo={previousAction} />
	{/each}
{:else}
	<div bind:this={el} class="fragment hidden" data-fragment-index={order}></div>
{/if}
