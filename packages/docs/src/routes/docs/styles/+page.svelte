<script lang="ts">
	import { Keynote, Slide } from '$lib/keynote/index'
	import Code from '$lib/components/code.svelte'
</script>

<h1>Styling</h1>

<h2>Tailwind CSS</h2>

<p>
	Every element is unstyled by default giving you complete control to style it how you want and text
	is scaled based on the size of your presentation which you can also override with CSS.
</p>

<p>
	To style your slides you can use Tailwind utility classes. Thanks to the Tailwind compiler you can
	also pass arbitrary values if the provided utility classes aren't enough.
</p>

<Keynote>
	<Slide>
		<div class="mx-auto flex w-[800px] justify-between text-gray-900">
			<div class="grid h-[240px] w-[240px] place-content-center rounded-full bg-red-400">Red</div>
			<div class="grid h-[240px] w-[240px] place-content-center rounded-full bg-green-400">
				Green
			</div>
			<div class="grid h-[240px] w-[240px] place-content-center rounded-full bg-blue-400">Blue</div>
		</div>
	</Slide>
</Keynote>

<Code lang="svelte">
	{`
		<Slide>
			<div class="mx-auto flex w-[800px] justify-between text-gray-900">
				<div class="grid h-[240px] w-[240px] place-content-center rounded-full bg-red-400">Red</div>
				<div class="grid h-[240px] w-[240px] place-content-center rounded-full bg-green-400">Green</div>
				<div class="grid h-[240px] w-[240px] place-content-center rounded-full bg-blue-400">Blue</div>
			</div>
		</Slide>
  `}
</Code>

<p>
	Don't be intimidated by the long class names because you're going to cruise compared to writing
	regular CSS and you can put long class names into variables.
</p>

<p>
	To make your life easier get the <a
		href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss"
		>Tailwind CSS IntelliSense</a
	>
	extension for VS Code and <b>Keynote</b> is even set up to sort Tailwind classes on your behalf to
	keep things organized.
</p>

<h2>Regular CSS</h2>

<p>
	You can write regular CSS inside a
	<code>&lt;style&gt</code> tag in Svelte. Styles are scoped to the component meaning you don't have
	to worry about using unique class names. PostCSS works out of the box but you can also set up SASS.
</p>

<Code lang="svelte">
	{`
		<Slide>
				<div class="circles">
					<div class="circle red">Red</div>
					<div class="circle green">Green</div>
					<div class="circle blue">Blue</div>
				</div>
		</Slide>

		<style>
			.circles {
				width: 800px;
				display: flex;
				justify-content: space-between;
				margin: 0 auto;
				color: #111827;
			}

			.circle {
				width: 240px;
				height: 240px;
				display: grid;
				place-content: center;
				rounded: 9999px;
			}
			
			.red {
				background-color: #f87171;
			}

			.green {
				background-color: #4ade80;
			}

			.blue {
				background-color: #1e3a8a;
			}
		</\style>
  `}
</Code>
