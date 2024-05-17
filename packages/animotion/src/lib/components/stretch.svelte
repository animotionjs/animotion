<script lang="ts">
	import type { Snippet } from 'svelte'

	type StretchProps = {
		[key: string]: any
		children?: Snippet
		type?: string
		class?: string
	}

	let { children, type = 'p', ...props }: StretchProps = $props()
</script>

<svelte:element this={type} {...props} class="r-stretch {props.class}">
	{#if children}
		{@render children()}
	{/if}
</svelte:element>
