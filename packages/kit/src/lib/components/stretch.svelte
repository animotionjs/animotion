<script lang="ts">
	export let type = 'p'

	delete $$restProps.class
</script>

<svelte:element
	this={type}
	class="r-stretch {$$props.class || ''}"
	{...$$restProps}
>
	<slot />
</svelte:element>
