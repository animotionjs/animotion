<script lang="ts">
	import type { Snippet } from 'svelte'

	type MarkdownProps = {
		children: Snippet
		file?: string
	}

	let { children, file }: MarkdownProps = $props()
</script>

{#if file}
	<section data-markdown={file}></section>
{:else}
	<section data-markdown>
		<div data-template>
			{@render children()}
		</div>
	</section>
{/if}
