<script lang="ts">
	type Bool = boolean | null
	type Element = 'video' | 'img' | 'iframe'

	export let type: Element
	export let src: string
	export let autoplay: Bool = null
	export let preload: Bool = null

	delete $$restProps.class
</script>

<svelte:element
	this={type}
	data-src={src}
	data-autoplay={autoplay}
	data-prelod={preload}
	class={$$props.class || ''}
	{...$$restProps}
>
	<slot />
</svelte:element>
