<script lang="ts">
	import { tweened } from 'svelte/motion'
	import { draw, fade } from 'svelte/transition'
	import { quadInOut } from 'svelte/easing'
	import { Slide, Code } from '@deck'

	let cx = tweened(300, { duration: 1000, easing: quadInOut })
	let cy = tweened(300, { duration: 1000, easing: quadInOut })
	let r = tweened(100, { duration: 1000, easing: quadInOut })
	let centerX = 300
	let centerY = 300
	let angle = 0
	let speed = 0.02
	let offset = 140

	let animationId: number

	async function setupCircle() {
		$r = 28
		$cx += offset
	}

	async function animateCircle() {
		cx.set(centerX + Math.cos(angle) * offset, { duration: 0 })
		cy.set(centerY + Math.sin(angle) * offset, { duration: 0 })
		angle += speed
		animationId = requestAnimationFrame(animateCircle)
	}

	let show = true
	let showCircle = false
</script>

{#if show}
	<div
		transition:fade
		class="absolute top-[50%] right-[4%] -translate-y-[50%] rounded-2xl
    z-20"
		style:background="hsl(226 19% 16%)"
	>
		<div class="w-[600px] h-[600px]">
			<svg viewBox="0 0 600 600">
				{#if showCircle}
					<circle
						transition:draw={{ duration: 1000 }}
						on:introend={animateCircle}
						cx="300"
						cy="300"
						r="140"
						fill="none"
						stroke="hsl(226 19% 60%)"
					/>
					<line
						transition:draw={{ duration: 1000 }}
						x1="300"
						x2="300"
						y1="600"
						y2="0"
						stroke="hsl(226 19% 30%)"
					/>
					<line
						transition:draw={{ duration: 1000 }}
						x1="0"
						x2="600"
						y1="300"
						y2="300"
						stroke="hsl(226 19% 30%)"
					/>
				{/if}
				<circle class="drop-shadow-md" cx={$cx} cy={$cy} r={$r} fill="aqua" />
				{#if showCircle}
					<rect
						x={$cx - 80}
						y={$cy - 67}
						width="160"
						height="24"
						fill="hsl(226 19% 10%)"
					/>
					<text
						transition:fade
						class="drop-shadow-md"
						x={$cx}
						y={$cy - 54}
						text-anchor="middle"
						alignment-baseline="middle"
						font-size="40%"
						fill="hsl(226 19% 90%)"
					>
						x: {$cx.toFixed(0)}, y: {$cy.toFixed(0)}
					</text>
				{/if}
			</svg>
		</div>
	</div>
{/if}

<Slide
	on:in={(e) => {
		show = true
	}}
	animate
>
	<Code lang="ts">
		{`
      function animateCircle() {}
    `}
	</Code>
</Slide>

<Slide animate>
	<Code lang="ts" lines="3">
		{`
      function animateCircle() {
        // update x position
        cx = centerX + Math.cos(angle) * r
      }
    `}
	</Code>
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

<Slide
	on:in={(e) => {
		setTimeout(setupCircle, 500)
		setTimeout(() => (showCircle = true), 1500)
	}}
	on:out={(e) => {
		cancelAnimationFrame(animationId)
		show = false
	}}
	animate
>
	<Code lang="ts" offset="12" lines="2">
		{`
      // ...
      animateCircle()
    `}
	</Code>
</Slide>

<Slide animateRestart>
	<h1>Slide</h1>
</Slide>

<style>
	:global(pre) {
		left: 4%;
	}
</style>
