<script lang="ts">
	import { page } from '$app/state'
	import { getNavigation } from './navigation'
	import { ArrowLeft, ArrowRight } from 'lucide-svelte'

	const path = $derived(page.route.id)
	const { previous, next } = $derived(getNavigation(path))
</script>

{#if path}
	<nav class="section space-between">
		{#if previous}
			<div class="link">
				<ArrowLeft />
				<a href={previous.path}>{previous.title}</a>
			</div>
		{/if}

		{#if next}
			<div class="link">
				<a href={next.path}>{next.title}</a>
				<ArrowRight />
			</div>
		{/if}
	</nav>
{/if}

<style>
	.link {
		display: flex;
		gap: var(--size-1);
		align-items: center;
	}
</style>
