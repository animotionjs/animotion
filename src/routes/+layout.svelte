<script lang="ts">
	import '../styles/app.css'
	import type { Snippet } from 'svelte'

	let { children }: { children: Snippet } = $props()
</script>

<svelte:head>
	<title>Animotion</title>
</svelte:head>

{@render children()}
