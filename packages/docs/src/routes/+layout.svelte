<script lang="ts">
	import { page } from '$app/stores'
	import Header from './header.svelte'
	import '../app.postcss'

	$: ({ title, content } = $page.data)
</script>

<svelte:head>
	<title>{title ?? 'Keynote'}</title>
	<meta name="description" {content} />
</svelte:head>

<Header />

<slot />
