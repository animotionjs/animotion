<script lang="ts">
	import type { Snippet } from 'svelte'

	type NotesProps = {
		children: Snippet
	}

	let { children }: NotesProps = $props()
</script>

<aside class="notes">
	{@render children()}
</aside>
