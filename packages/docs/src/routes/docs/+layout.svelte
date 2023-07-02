<script lang="ts">
	import { page } from '$app/stores'
	import { base } from '$app/paths'

	const sections = [
		{ title: 'Introduction', path: '/docs' },
		{ title: 'Getting started', path: '/docs/getting-started' },
		{ title: 'Creating slides', path: '/docs/creating-slides' },
		{ title: 'Auto-animate', path: '/docs/auto-animate' },
		{ title: 'Code blocks', path: '/docs/code-blocks' },
		{ title: 'Steps', path: '/docs/steps' },
		{ title: 'Media', path: '/docs/media' },
		{ title: 'Markdown', path: '/docs/markdown' },
		{ title: 'Options', path: '/docs/options' }
	]
</script>

<div class="container">
	<aside class="sections space-y" style:--margin="var(--size-2)">
		{#each sections as { path, title }}
			{@const active = $page.route.id === path}
			<a href="{base}{path}" class:active>{title}</a>
		{/each}
	</aside>

	<main class="content space-y" style:--margin="var(--size-4)">
		<slot />
	</main>
</div>

<style lang="postcss">
	.container {
		margin-top: var(--size-5);

		@media (width > 600px) {
			display: grid;
			grid-template-columns: 280px 1fr;
		}
	}

	.sections {
		a {
			display: block;
			text-transform: capitalize;
		}
	}

	.active {
		color: var(--brand);
	}

	.content {
		margin-top: var(--size-5);

		@media (width > 600px) {
			max-width: 60ch;
			margin-top: 0rem;
		}
	}
</style>
