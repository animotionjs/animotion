<script lang="ts">
	import type { Snippet } from 'svelte'
	import { page } from '$app/state'
	import { sections } from '$lib/navigation/navigation'
	import Links from '$lib/navigation/links.svelte'

	type LayoutProps = { children: Snippet }

	let { children }: LayoutProps = $props()
</script>

<div class="container">
	<aside class="sections">
		<div class="sticky">
			{#each sections as { path, title, section }}
				{@const active = page.route.id === path}
				{#if section}
					<h4 class="section">{section}</h4>
				{:else}
					<a href={path} class:active>{title}</a>
				{/if}
			{/each}
		</div>
	</aside>

	<main class="content space-y" style:--margin="var(--size-4)">
		{@render children()}
		<Links />
	</main>
</div>

<style>
	.container {
		margin-block-start: var(--size-5);

		aside {
			view-transition-name: sidebar;
		}

		@media (width > 600px) {
			display: grid;
			grid-template-columns: 240px 1fr;
		}
	}

	.sections {
		.sticky {
			position: sticky;
			top: 24px;
		}

		& .section {
			color: var(--text-3);
			text-transform: capitalize;

			&:not(:first-of-type) {
				margin-block-start: var(--size-2);
			}
		}

		& a {
			display: block;
			width: max-content;
			color: var(--text-1);
			text-decoration: none;
			text-transform: capitalize;

			&:hover,
			&.active {
				color: var(--brand);
			}
		}

		@media (width > 1000px) {
			margin-block: var(--size-2);
			border-right: 1px solid var(--border);
		}
	}

	.content {
		margin-block-start: var(--size-5);
		view-transition-name: content;

		& :global(h2) {
			margin-block-start: var(--size-5);
		}

		@media (width > 1000px) {
			max-width: 80ch;
			margin-block-start: 0rem;
			margin-inline-start: var(--size-5);
		}
	}
</style>
