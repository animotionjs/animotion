<script lang="ts">
	import { page } from '$app/stores'
	import Header from './header.svelte'
	import '../app.postcss'

	$: ({ title } = $page.data)
</script>

<svelte:head>
	<title>{title ?? 'Keynote'}</title>

	<meta
		content="Keynote is a presentational framework for creating beautiful slides and visualizing ideas with code."
		name="description"
	/>

	<meta content={title ?? 'Keynote'} property="og:title" />
	<!-- <meta content={social} property="og:image" /> -->
	<!-- <meta content="https://joyofcode.xyz/" property="og:url" /> -->
	<meta
		content="Keynote is a presentational framework for creating beautiful slides and visualizing ideas with code."
		property="og:description"
	/>
	<meta content="Keynote" property="og:site_name" />

	<meta content="@joyofcodedev" name="twitter:creator" />
	<meta content="summary_large_image" name="twitter:card" />
	<meta content={title ?? 'Keynote'} name="twitter:title" />
	<meta
		content="Keynote is a presentational framework for creating beautiful slides and visualizing ideas with code."
		name="twitter:description"
	/>
	<!-- <meta content={social} name="twitter:image" /> -->
</svelte:head>

<Header />

<slot />
