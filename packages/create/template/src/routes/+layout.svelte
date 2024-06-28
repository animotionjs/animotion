<script lang="ts">
	import '../styles/app.css'

	let { children } = $props()
</script>

<svelte:head>
	<title>Animotion</title>
</svelte:head>

{@render children()}