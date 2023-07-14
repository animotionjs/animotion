<script lang="ts">
	import { Keynote, Slide } from '$lib/keynote'
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Auto-animate</h1>

<h2>Animating Elements</h2>

<p>
	You can animate anything from styles (regardless of the styling method) to change in size,
	position and most animatable CSS properties.
</p>

<p>
	Thanks to the <a href="https://aerotwist.com/blog/flip-your-animations/">
		FLIP animation technique
	</a>
	under the hood you can animate elements across slides using the
	<code>animate</code> attribute like magic. 🪄
</p>

<Keynote>
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
</Keynote>

<Code code={data.examples[0]} />

<h2>Matching</h2>

<p>
	Matching works by looking at similar elements but sometimes you want to animate elements that
	aren't the same in which case you can use the <code>data-id</code> attribute.
</p>

<Keynote>
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
</Keynote>

<Code code={data.examples[1]} />

<p>
	Here's a more complicated example where you might want to animate multiple values at the same
	time.
</p>

<Keynote>
	<Slide animate>
		<div data-id="container" class="h-[600px] w-[50%] overflow-hidden rounded-2xl">
			<div data-id="color-1" class="h-[40%] bg-gray-400" />
			<div data-id="colors" class="grid h-[60%] gap-14 bg-gray-100 p-8">
				<div data-id="color-2" class="w-full bg-gray-400" />
				<div data-id="color-3" class="w-full bg-gray-600" />
				<div data-id="color-4" class="w-full bg-gray-800" />
			</div>
		</div>
	</Slide>

	<Slide animate>
		<div data-id="container" class="h-[600px] w-[100%] overflow-hidden rounded-2xl">
			<div data-id="color-1" class="h-[50%] bg-teal-400" />
			<div data-id="colors" class="grid h-[50%] gap-14 bg-gray-100 p-8">
				<div data-id="color-2" class="w-full bg-teal-400" />
				<div data-id="color-3" class="w-full bg-teal-600" />
				<div data-id="color-4" class="w-full bg-teal-800" />
			</div>
		</div>
	</Slide>
</Keynote>

<Code code={data.examples[2]} />

<p>
	Don't forget that you can componetize everything and throw long class names into a variable for
	reuse to make your life easier.
</p>

<h2>Grouping Animated Slides</h2>

<p>
	You might want to start a new slide in which case you can prevent auto-animate by using
	<code>animateId</code> or you can use <code>animateRestart</code> to prevent auto-animate between two
	slides even if they have the same id.
</p>

<Keynote>
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
</Keynote>

<Code code={data.examples[3]} />

<p>
	I never find myself in a situation where I need to use <code>animateId</code> and use
	<code>animateRestart</code> when I have to.
</p>
