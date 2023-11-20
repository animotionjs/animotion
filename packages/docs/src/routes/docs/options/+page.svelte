<script lang="ts">
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Options</h1>

<p>
	You can change the default presentation options inside <code>src/config.ts</code>, add
	<a href="https://revealjs.com/plugins/">Reveal plugins</a>, or create your own plugins.
</p>

<Code code={data.examples[0]} />
