<script lang="ts">
	import type { Snippet } from 'svelte'

	type StackProps = {
		children: Snippet
	}

	let { children }: StackProps = $props()
</script>

<div class="r-stack">
	{@render children()}
</div>
