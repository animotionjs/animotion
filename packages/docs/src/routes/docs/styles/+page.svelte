<script lang="ts">
	import { Animotion, Slide } from '$lib/animotion'
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Styling</h1>

<h2>Use any CSS framework</h2>

<p>
	You can use any CSS framework like <a href="https://unocss.dev/">UnoCSS</a> because
	<b>Animotion</b> is just a Svelte project using Vite as the build tool.
</p>

<p>
	You can completely remove Tailwind CSS and replace it with the CSS framework of your choice by
	reading their guide on how to set it up for Svelte.
</p>

<h2>Using Tailwind CSS</h2>

<p>
	Every element is unstyled by default giving you complete control over the styles using Tailwind
	and text is scaled based on the size of your presentation which you can also override with CSS.
</p>

<Animotion>
	<Slide>
		<div class="mx-auto flex w-[800px] justify-between text-gray-900">
			<div class="grid h-[240px] w-[240px] place-content-center rounded-full bg-red-400">Red</div>
			<div class="grid h-[240px] w-[240px] place-content-center rounded-full bg-green-400">
				Green
			</div>
			<div class="grid h-[240px] w-[240px] place-content-center rounded-full bg-blue-400">Blue</div>
		</div>
	</Slide>
</Animotion>

<Code code={data.examples[0]} />

<p>
	Thanks to the Tailwind compiler you can also pass arbitrary values surrounded by brackets like
	<code>h-[240px]</code> if the provided utility classes aren't enough.
</p>

<p>
	Use the
	<a href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss">
		Tailwind CSS IntelliSense
	</a>
	extension for VS Code to not have to memorize the utility classes and to make your life easier
	<b>Animotion</b> is set up to sort Tailwind classes on your behalf to keep things organized.
</p>

<h2>Using Regular CSS</h2>

<p>
	You can write regular CSS inside a
	<code>&lt;style&gt</code> tag in Svelte. Styles are scoped to the component meaning you don't have
	to worry about unique class names — <b>PostCSS</b> works out of the box and you can also set up
	<b>Sass</b>.
</p>

<Code code={data.examples[1]} />
