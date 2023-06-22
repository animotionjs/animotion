<script lang="ts">
	type Element = 'video' | 'image' | 'iframe'

	export let type: Element
	export let src: string
	export let autoplay = false
	export let preload = false
</script>

<svelte:element
	this={type}
	data-src={src}
	data-autoplay={autoplay || null}
	data-prelod={preload || null}
	{...$$props}
>
	<slot />
</svelte:element>
