<script lang="ts">
	import { Code, Slide } from '@deck'

	let cx = 300
	let cy = 300
	let centerX = 300
	let centerY = 300
	let r = 50
	let angle = 0
	let speed = 0.04

	function animateCircle() {
		cx = centerX + Math.cos(angle) * r * 2
		cy = centerY + Math.sin(angle) * r * 2
		angle += speed
		requestAnimationFrame(animateCircle)
	}

	let active = false
</script>

{#if active}
	<div class="absolute top-[50%] right-0 -translate-y-[50%] z-20">
		<div class="w-[600px] h-[600px] rounded-md shadow-md">
			<svg viewBox="0 0 600 600">
				<circle {cx} {cy} {r} fill="aqua" />
			</svg>
		</div>
	</div>
{/if}

<Slide
	on:active={() => {
		console.log('active')
		active = true
	}}
	animate
>
	<div>
		<Code lang="ts">
			{`
				function animateCircle() {}
			`}
		</Code>
	</div>
</Slide>

<Slide animate>
	<div>
		<Code lang="ts" lines="3">
			{`
				function animateCircle() {
					// update x position
					cx = centerX + Math.cos(angle) * r
				}
    	`}
		</Code>
	</div>
</Slide>

<Slide animate>
	<Code lang="ts" lines="5">
		{`
			function animateCircle() {
				// update x position
				cx = centerX + Math.cos(angle) * r
				// update y position
				cy = centerY + Math.sin(angle) * r
			}
    `}
	</Code>
</Slide>

<Slide animate>
	<Code lang="ts" lines="7">
		{`
			function animateCircle() {
				// update x position
				cx = centerX + Math.cos(angle) * r
				// update y position
				cy = centerY + Math.sin(angle) * r
				// increase angle
				angle += speed
			}
    `}
	</Code>
</Slide>

<Slide animate>
	<Code lang="ts" lines="9">
		{`
			function animateCircle() {
				// update x position
				cx = centerX + Math.cos(angle) * r
				// update y position
				cy = centerY + Math.sin(angle) * r
				// increase angle
				angle += speed

				requestAnimationFrame(animateCircle)
			}
    `}
	</Code>
</Slide>

<Slide on:active={() => setTimeout(animateCircle, 1000)} animate>
	<Code lang="ts" offset="12" lines="2">
		{`
			// ...
			animateCircle()
    `}
	</Code>
</Slide>

<Slide on:active={() => (active = false)} animate>
	<Code lang="ts" offset="12" lines="2">
		{`
			// ...
			animateCircle()
    `}
	</Code>
</Slide>
