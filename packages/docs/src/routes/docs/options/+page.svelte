<script lang="ts">
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Options</h1>

<p>
	You can open <code>src/config.ts</code> to change the default presentation options and add
	<a href="https://revealjs.com/plugins/">plugins</a> including creating your own plugins.
</p>

<Code code={data.examples[0]} />
