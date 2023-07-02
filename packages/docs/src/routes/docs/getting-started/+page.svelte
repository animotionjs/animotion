<script lang="ts">
	import { base } from '$app/paths'
	import Code from '$lib/components/code.svelte'
</script>

<h1>Getting started</h1>

<p>
	The project uses <a href="https://pnpm.io/">pnpm</a> as the package manager — if you don't have pnpm
	installed the easiest method is using npm.
</p>

<Code lang="text">
	{`
    npm install -g pnpm
	`}
</Code>

<h3>
	1. Create a new <b>Keynote</b> project
</h3>

<Code lang="text">
	{`
    pnpm create @magic/keynote
	`}
</Code>

<h3>2. Install the dependencies</h3>

<Code lang="text">
	{`
    pnpm i
	`}
</Code>

<h3>3. Start the development server</h3>

<Code lang="text">
	{`
    pnpm run dev
	`}
</Code>

<p>
	Visit <a href="http://localhost:5173/">http://localhost:5173/</a>.
</p>

<p>That's it! 🥳</p>

<a class="btn" href="{base}/docs/creating-slides">Creating Slides</a>
