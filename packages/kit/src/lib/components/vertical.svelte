<script lang="ts">
	import type { Snippet } from 'svelte'

	type VerticalProps = {
		children: Snippet
	}

	let { children }: VerticalProps = $props()
</script>

<section>
	{@render children()}
</section>
