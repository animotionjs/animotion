<script lang="ts">
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Getting started</h1>

<p>
	The project uses <a href="https://pnpm.io/">pnpm</a> as the package manager — if you don't have
	pnpm installed the easiest method to install it is using npm assuming you have
	<a href="https://nodejs.org/en">Node.js</a> installed.
</p>

<Code code={data.examples[0]} />

<p>
	Create a new <b>Keynote</b> presentation.
</p>

<Code code={data.examples[1]} />

<p>Install the dependencies.</p>

<Code code={data.examples[2]} />

<p>Start the development server.</p>

<Code code={data.examples[3]} />

<p>
	Visit <a href="http://localhost:5173/">http://localhost:5173/</a>.
</p>
