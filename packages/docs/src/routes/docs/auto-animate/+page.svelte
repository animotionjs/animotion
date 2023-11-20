<script lang="ts">
	import { Animotion, Slide } from '$lib/animotion'
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Auto-animate</h1>

<h2>Animating Elements</h2>

<p>
	Thanks to the <a href="https://aerotwist.com/blog/flip-your-animations/">
		FLIP animation technique
	</a>
	under the hood you can animate elements across slides using the
	<code>animate</code> attribute like magic. 🪄
</p>

<Animotion>
	<Slide animate>
		<p class="text-[100px]">Magic</p>
	</Slide>

	<Slide animate>
		<p class="text-[200px] text-teal-300">Magic</p>
	</Slide>

	<Slide animate>
		<p class="text-[200px]">🪄</p>
		<p class="mt-[48px] text-[200px] text-teal-300">Magic</p>
	</Slide>
</Animotion>

<Code code={data.examples[0]} />

<h2>Matching</h2>

<p>
	Matching works by looking at similar elements but sometimes you want to animate elements that
	aren't the same in which case you can use the <code>data-id</code> attribute.
</p>

<Animotion>
	<Slide animate>
		<div class="mx-auto flex w-[800px] justify-between text-gray-900">
			<div
				data-id="circle-1"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-red-400"
			>
				Red
			</div>
			<div
				data-id="circle-2"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-green-400"
			>
				Green
			</div>
			<div
				data-id="circle-3"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-blue-400"
			>
				Blue
			</div>
		</div>
	</Slide>

	<Slide animate>
		<div class="mx-auto flex w-[800px] justify-between text-gray-900">
			<div
				data-id="circle-3"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-blue-400"
			>
				Blue
			</div>

			<div
				data-id="circle-2"
				class="mt-[200px] grid h-[240px] w-[240px] place-content-center rounded-full bg-green-400"
			>
				Green
			</div>

			<div
				data-id="circle-1"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-red-400"
			>
				Red
			</div>
		</div>
	</Slide>
</Animotion>

<Code code={data.examples[1]} />

<h2>When Not To Use Auto-Animate</h2>

<p>Auto-animate is great for animating layouts and code blocks, but not for regular animations.</p>

<Animotion>
	<Slide animate>
		<div data-id="color-picker" class="h-[600px] w-[50%] overflow-hidden rounded-2xl">
			<div data-id="color-1" class="h-[40%] bg-gray-400" />
			<div data-id="colors" class="grid h-[60%] gap-14 bg-gray-100 p-8">
				<div data-id="color-2" class="w-full rounded-2xl bg-gray-400" />
				<div data-id="color-3" class="w-full rounded-2xl bg-gray-400" />
				<div data-id="color-4" class="w-full rounded-2xl bg-gray-400" />
			</div>
		</div>
	</Slide>

	<Slide animate>
		<div data-id="color-picker" class="h-[600px] w-[100%] overflow-hidden rounded-2xl">
			<div data-id="color-1" class="h-[40%] bg-teal-400" />
			<div data-id="colors" class="grid h-[60%] gap-14 bg-gray-100 p-8">
				<div data-id="color-2" class="w-full rounded-2xl bg-teal-400" />
				<div data-id="color-3" class="w-full rounded-2xl bg-teal-400" />
				<div data-id="color-4" class="w-full rounded-2xl bg-teal-400" />
			</div>
		</div>
	</Slide>
</Animotion>

<p>
	You should animate the <code>width</code> and <code>color</code>
	properties with CSS, or using a JavaScript animation library instead.
</p>

<Animotion>
	<Slide>
		<div
			class="animate-width h-[600px] overflow-hidden rounded-2xl"
			style="transform: translateZ(0)"
		>
			<div data-id="color" class="animate-bg h-[40%] bg-gray-400" />
			<div data-id="values" class="grid h-[60%] gap-14 bg-gray-100 p-8">
				<div class="animate-bg w-full rounded-2xl bg-gray-400" />
				<div class="animate-bg w-full rounded-2xl bg-gray-400" />
				<div class="animate-bg w-full rounded-2xl bg-gray-400" />
			</div>
		</div>
	</Slide>
</Animotion>

<h2>Grouping Animated Slides</h2>

<p>
	You might want to start a new slide in which case you can prevent auto-animate by using
	<code>animateId</code> or you can use <code>animateRestart</code> to prevent auto-animate between two
	slides even if they have the same id.
</p>

<Animotion>
	<Slide animate>
		<p class="">Group A</p>
	</Slide>

	<Slide animate>
		<p class="text-red-400">Group A</p>
	</Slide>

	<Slide animate animateId="two">
		<p>Group B</p>
	</Slide>

	<Slide animate animateId="two">
		<p class="text-green-400">Group B</p>
	</Slide>

	<Slide animate animateId="two" animateRestart>
		<p>Group C</p>
	</Slide>

	<Slide animate animateId="two">
		<p class="text-blue-400">Group C</p>
	</Slide>
</Animotion>

<Code code={data.examples[2]} />

<style>
	.animate-width {
		animation: width 2s ease-in-out infinite alternate;
	}

	.animate-bg {
		animation: background 2s ease-in-out infinite alternate;
	}

	@keyframes width {
		0%,
		10% {
			width: 50%;
		}
		90%,
		100% {
			width: 100%;
		}
	}

	@keyframes background {
		0%,
		10% {
			background-color: #9ca3af;
		}
		90%,
		100% {
			background-color: #2dd4bf;
		}
	}
</style>
