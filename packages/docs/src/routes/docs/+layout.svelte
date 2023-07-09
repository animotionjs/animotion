<script lang="ts">
	import { page } from '$app/stores'
	import { base } from '$app/paths'
	import { sections } from '$lib/navigation/navigation'
	import Links from '$lib/navigation/links.svelte'
</script>

<div class="container">
	<aside class="sections space-y" style:--margin="var(--size-2)">
		{#each sections as { path, title, section }}
			{@const active = $page.route.id === path}
			{#if section}
				<h4 class="section">{section}</h4>
			{:else}
				<a href="{base}{path}" class:active>{title}</a>
			{/if}
		{/each}
	</aside>

	<main class="content space-y" style:--margin="var(--size-4)">
		<slot />
		<Links />
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
		& .section {
			color: var(--text-2);
			text-transform: capitalize;

			&:not(:first-of-type) {
				margin-block-start: var(--size-4);
			}
		}

		& a {
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
			max-width: 70ch;
			margin-block-start: 0rem;
			margin-inline-start: var(--size-5);
		}
	}
</style>
