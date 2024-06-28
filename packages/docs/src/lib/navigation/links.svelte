<script lang="ts">
	import { page } from '$app/stores'
	import { getNavigation } from './navigation'

	const path = $derived($page.route.id)
	const { previous, next } = $derived(getNavigation(path))
</script>

{#if path}
	<nav class="section space-between">
		{#if previous}
			<a class="previous" href={previous.path}>{previous.title}</a>
		{/if}

		{#if next}
			<a class="next" href={next.path}>{next.title}</a>
		{/if}
	</nav>
{/if}
