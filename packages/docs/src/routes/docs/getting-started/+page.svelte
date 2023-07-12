<script lang="ts">
	import Code from '$lib/components/code.svelte'
</script>

<h1>Getting started</h1>

<p>
	The project uses <a href="https://pnpm.io/">pnpm</a> as the package manager — if you don't have
	pnpm installed the easiest method to install it is using npm assuming you have
	<a href="https://nodejs.org/en">Node.js</a> installed.
</p>

<Code lang="text">
	{`
    npm install -g pnpm
	`}
</Code>

<p>
	Create a new <b>Keynote</b> presentation.
</p>

<Code lang="text">
	{`
    npm create keynote
	`}
</Code>

<p>Install the dependencies.</p>

<Code lang="text">
	{`
    pnpm i
	`}
</Code>

<p>Start the development server.</p>

<Code lang="text">
	{`
    pnpm run dev
	`}
</Code>

<p>
	Visit <a href="http://localhost:5173/">http://localhost:5173/</a>.
</p>
