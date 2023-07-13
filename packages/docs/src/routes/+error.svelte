<script lang="ts">
	import { page } from '$app/stores'
</script>

<div class="container">
	<h1>{$page.status}: {$page.error?.message}</h1>
	<p>The route is in another castle.</p>
</div>

<style>
	.container {
		margin-block-start: var(--size-6);
		text-align: center;
	}

	p {
		color: var(--text-2);
	}
</style>
