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

<h2>
	Create a new <b>Animotion</b> presentation
</h2>

<Code code={data.examples[1]} />

<p>
	This is going to copy the <a href="https://github.com/animotionjs/animotion/tree/main/packages/create/template">Animotion template</a> and install the dependencies for you.
</p>

<Code code={data.examples[2]} />

<p>If you're on Windows and <code>npm create @animotion</code> doesn't work, then instead you can do <code>npx @animotion/create</code> and it should work.</p>

<h2>Install the dependencies (if you haven't during the setup)</h2>

<Code code={data.examples[3]} />

<h2>Start the development server</h2>

<Code code={data.examples[4]} />

<p>
	Open <a href="http://localhost:5173/">http://localhost:5173/</a>.
</p>
