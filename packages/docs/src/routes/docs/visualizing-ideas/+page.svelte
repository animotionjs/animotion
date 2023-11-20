<script lang="ts">
	import { Animotion, Slide, Code } from '$lib/animotion'
	import CodeBlock from '$lib/components/code.svelte'

	export let data

	let centerX = 200
	let centerY = 200
	let r = 40
	let offset = 4
	let cx = 200 + r * offset
	let cy = 200
	let angle = 0
	let speed = 0.04
	let animate = false

	function circle() {
		cx = centerX + Math.cos(angle) * r * offset
		cy = centerY + Math.sin(angle) * r * offset
		angle += speed

		if (animate) {
			requestAnimationFrame(circle)
		}
	}

	function play() {
		animate = true
		circle()
	}

	function stop() {
		animate = false
	}
</script>

<h1>Visualizing Ideas With Code</h1>

<p>
	Svelte has great <a href="https://svelte.dev/tutorial/tweened">built-in tools for motion</a> but
	you can reach for any animation library like
	<a href="https://greensock.com/gsap/">GSAP</a>
	or
	<a href="https://motion.dev/">Motion One</a>.
</p>

<p>
	You can also try out <a href="/docs/motion">Motion</a>, a new addition to <b>Animotion</b> for bespoke
	animations that uses values that change over time.
</p>

<p>
	You can use the
	<a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">Canvas API</a>
	or <a href="https://developer.mozilla.org/en-US/docs/Web/SVG">SVGs</a> to draw on the screen, but
	you also have the entire JavaScript ecosystem at your fingertips from
	<a href="https://d3js.org/">D3</a>
	for bespoke data visualization to
	<a href="https://threejs.org/">Three.js</a> for 3D.
</p>

<Animotion options={{ hash: true, history: true }}>
	<Slide animate>
		<div class="w-[1020px]">
			<Code lang="html" lines="1-3|1,3|2">
				{`
					<svg width="400" height="400">
						<circle cx="200" cy="200" r="100" fill="aqua" />
					</svg>
				`}
			</Code>
		</div>
	</Slide>

	<Slide animate>
		<div class="w-[1020px]">
			<Code lang="html">
				{`
					<svg width="400" height="400">
						<circle cx="200" cy="200" r="100" fill="aqua" />
					</svg>
				`}
			</Code>
		</div>

		<div data-id="circle" class="mx-auto mt-[48px] w-[400px] rounded-2xl bg-gray-800">
			<svg width="400" height="400">
				<circle cx="200" cy="200" r="100" fill="aqua" />
			</svg>
		</div>
	</Slide>

	<Slide animate>
		<div class="flex">
			<div class="absolute left-[-14%] w-[1020px]">
				<Code lang="ts" lines="1,8|3|5|7|1-8">
					{`
						function animateCircle() {
							// update x position
							cx = centerX + Math.cos(angle) * r
							// update y position
							cy = centerY + Math.sin(angle) * r
							// request animation frame
							requestAnimationFrame(animateCircle)
						}
					`}
				</Code>
			</div>

			<div data-id="circle" class="absolute right-[-14%] w-[400px] bg-gray-800">
				<svg width="400" height="400">
					<circle cx="200" cy="200" r="100" fill="aqua" />
				</svg>
			</div>
		</div>
	</Slide>

	<Slide animate on:in={() => play()} on:out={() => stop()}>
		<div class="absolute top-[160px] w-[400px]">
			<Code lang="ts" offset="10">
				{`
					animateCircle()
				`}
			</Code>
		</div>

		<div data-id="circle" class="absolute left-[50%] w-[400px] bg-gray-800">
			<svg width="400" height="400">
				<circle cx="200" cy="200" r={r * offset} fill="none" stroke="white" stroke-width="2" />
				<circle {cx} {cy} {r} fill="aqua" />
			</svg>
		</div>
	</Slide>
</Animotion>

<CodeBlock code={data.examples[0]} />

<p>
	After you're done you can full screen the presentation and record a voice-over with
	<a href="https://obsproject.com/">OBS</a> and do final edits.
</p>

<p>
	<b>There's no right or wrong way</b> to do something — <b>Animotion</b> is only concerned about
	managing the slides and transitions between them. You can use
	<a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox">Flexbox</a>
	and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout">CSS Grid</a> for the
	layout, or absolute position everything.
</p>

<p>
	The default dimensions for a presentation are <b>960x700</b> pixels preserving the aspect ratio
	but you can
	<a href="/docs/layout">bring your own layout</a> and have complete control over the layout if desired.
</p>

<p>
	If you have a more complicated example you don't want to repeat inside of every slide absolutely
	position it outside the slide.
</p>

<CodeBlock code={data.examples[1]} />

<style>
	:global(code > table) {
		font-size: 32px;
	}
</style>
