<script lang="ts">
	import { page } from '$app/state'
	import type { Snippet } from 'svelte'
	import PageTransition from '$lib/components/transition.svelte'
	import Header from '$lib/components/header.svelte'
	import '../app.css'

	type LayoutProps = { children: Snippet }

	let { children }: LayoutProps = $props()
	const { title = 'Animotion' } = $derived(page.data)
</script>

<PageTransition />

<svelte:head>
	<title>{title}</title>
	<meta
		content="Animotion is a presentational framework for creating beautiful slides and visualizing ideas with code."
		name="description"
	/>
	<meta content={title} property="og:title" />
	<meta content="https://animotion.pages.dev/social.png" property="og:image" />
	<meta content="https://animotion.pages.dev/social.png" property="og:url" />
	<meta
		content="Animotion is a presentational framework for creating beautiful slides and visualizing ideas with code."
		property="og:description"
	/>
	<meta content="Animotion" property="og:site_name" />
	<meta content="@joyofcodedev" name="twitter:creator" />
	<meta content="summary_large_image" name="twitter:card" />
	<meta content={title} name="twitter:title" />
	<meta
		content="Animotion is a presentational framework for creating beautiful slides and visualizing ideas with code."
		name="twitter:description"
	/>
	<meta content="https://animotion.pages.dev/social.png" name="twitter:image" />
</svelte:head>

<Header />

{@render children()}
