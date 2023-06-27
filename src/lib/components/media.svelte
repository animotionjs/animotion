<script lang="ts">
	type Element = 'video' | 'image' | 'iframe'

	export let type: Element
	export let src: string
	export let autoplay = null
	export let preload = null
</script>

<svelte:element
	this={type}
	data-src={src}
	data-autoplay={autoplay}
	data-prelod={preload}
	{...$$props}
>
	<slot />
</svelte:element>
