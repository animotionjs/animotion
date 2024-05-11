<script lang="ts">
	export let file: string | null = null
</script>

{#if file}
	<section data-markdown={file} />
{:else}
	<section data-markdown>
		<div data-template>
			<slot />
		</div>
	</section>
{/if}
