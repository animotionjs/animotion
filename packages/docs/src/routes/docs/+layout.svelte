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
		margin-block-start: var(--size-5);

		@media (width > 600px) {
			display: grid;
			grid-template-columns: 200px 1fr;
		}
	}

	.sections {
		a {
			display: block;
			width: max-content;
			color: var(--text-1);
			font-weight: 600;
			text-decoration: none;
			text-transform: capitalize;

			&:hover,
			&.active {
				color: var(--brand);
			}
		}

		@media (width > 600px) {
			margin-block: var(--size-2);
			border-right: 1px solid var(--border);
		}
	}

	.content {
		margin-block-start: var(--size-5);

		@media (width > 600px) {
			max-width: 60ch;
			margin-block-start: 0rem;
			margin-inline-start: var(--size-5);
		}
	}
</style>
