<script lang="ts">
	import type { Snippet } from 'svelte'

	type MediaProps = {
		children: Snippet
		src: string
		type: 'video' | 'img' | 'iframe'
		autoplay?: boolean
		preload?: boolean
		class?: string
	}

	let { children, src, type, autoplay, preload, ...props }: MediaProps = $props()
</script>

<svelte:element
	this={type}
	data-src={src}
	data-autoplay={autoplay}
	data-prelod={preload}
	{...props}
	class={props.class}
>
	{@render children()}
</svelte:element>
