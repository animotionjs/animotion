<script lang="ts">
	import { page } from '$app/stores'
	import Header from './header.svelte'
	import '../app.postcss'

	$: ({ title } = $page.data)
</script>

<svelte:head>
	<title>{title ?? 'Animotion'}</title>

	<meta
		content="Animotion is a presentational framework for creating beautiful slides and visualizing ideas with code."
		name="description"
	/>

	<meta content={title ?? 'Animotion'} property="og:title" />
	<meta content="https://animotion.pages.dev/social.png" property="og:image" />
	<meta content="https://animotion.pages.dev/social.png" property="og:url" />
	<meta
		content="Animotion is a presentational framework for creating beautiful slides and visualizing ideas with code."
		property="og:description"
	/>
	<meta content="Animotion" property="og:site_name" />

	<meta content="@joyofcodedev" name="twitter:creator" />
	<meta content="summary_large_image" name="twitter:card" />
	<meta content={title ?? 'Animotion'} name="twitter:title" />
	<meta
		content="Animotion is a presentational framework for creating beautiful slides and visualizing ideas with code."
		name="twitter:description"
	/>
	<meta content="https://animotion.pages.dev/social.png" name="twitter:image" />
</svelte:head>

<Header />

<slot />
