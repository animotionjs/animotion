<script lang="ts">
	import { page } from '$app/stores'
	import { getNavigation } from './navigation'

	$: path = $page.route.id
	$: ({ previous, next } = getNavigation(path))
</script>

{#if path}
	<nav class="section space-between">
		{#if previous}
			<a class="previous" href="{previous.path}">{previous.title}</a>
		{/if}

		{#if next}
			<a class="next" href="{next.path}">{next.title}</a>
		{/if}
	</nav>
{/if}
