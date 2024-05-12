<script lang="ts">
	import type { Snippet } from 'svelte'

	type FitProps = {
		children: Snippet
		type?: string
		class?: string
	}

	let { children, type = 'h2', ...props }: FitProps = $props()
</script>

<svelte:element this={type} {...props} class="r-fit-text {props.class}">
	{@render children()}
</svelte:element>
