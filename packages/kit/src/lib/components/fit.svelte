<script lang="ts">
	export let type = 'h2'

	delete $$restProps.class
</script>

<svelte:element
	this={type}
	class="r-fit-text {$$props.class || ''}"
	{...$$restProps}
>
	<slot />
</svelte:element>
