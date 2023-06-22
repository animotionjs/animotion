<script lang="ts">
	export let type = 'p'
</script>

<svelte:element
	this={type}
	class="r-fit-text {$$props.class || ''}"
	{...$$restProps}
>
	<slot />
</svelte:element>
