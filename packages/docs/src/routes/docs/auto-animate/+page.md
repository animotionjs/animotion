<script lang="ts">
	import AutoAnimate from './auto-animate.svelte'
	import Matching from './matching.svelte'
	import Bad from './bad.svelte'
	import Good from './good.svelte'
	import Grouping from './grouping.svelte'
</script>

# Auto-animate

## Animating elements

You can use the `animate` attribute to animate elements across slides thanks to the [FLIP](https://aerotwist.com/blog/flip-your-animations/) animation technique. 🪄

<AutoAnimate />

```svelte
<script>
  import { Presentation, Slide } from '@animotion/core'
</script>

<Presentation>
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
</Presentation>
```

## Matching

Matching works by looking at similar elements, but sometimes you want to animate elements that aren't the same in which case you can use the `data-id` attribute.

<Matching />

```svelte
<script>
  import { Presentation, Slide } from '@animotion/core'
</script>


<Presentation>
	<Slide animate>
		<div
			class="mx-auto flex w-[800px] justify-between font-semibold text-gray-900"
		>
			<div
				data-id="circle-1"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-red-400"
			>
				red
			</div>
			<div
				data-id="circle-2"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-green-400"
			>
				green
			</div>
			<div
				data-id="circle-3"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-blue-400"
			>
				blue
			</div>
		</div>
	</Slide>

	<Slide animate>
		<div
			class="mx-auto flex w-[800px] justify-between font-semibold text-gray-900"
		>
			<div
				data-id="circle-3"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-blue-400"
			>
				blue
			</div>
			<div
				data-id="circle-2"
				class="mt-[200px] grid h-[240px] w-[240px] place-content-center rounded-full bg-green-400"
			>
				green
			</div>
			<div
				data-id="circle-1"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-red-400"
			>
				red
			</div>
		</div>
	</Slide>
</Presentation>
```

## Don't auto-animate everything

You might be tempted to animate CSS properties such as `width` with auto-animate which can lead to janky animations.

<Bad />

Auto-animate is best used for doing layout animations. For regular CSS properties you should rely on using CSS animations, or using a JavaScript animation library.

<Good />

## Grouping animated slides

You can stop auto-animate on a new slide by using `animateId`, or you can use `animateRestart` to prevent auto-animate between two slides even if they have the same id.

<Grouping />

```svelte
<script>
  import { Presentation, Slide } from '@animotion/core'
</script>

<Presentation>
  <!-- Group A -->
  <Slide animate>
    <p>Group A</p>
  </Slide>

  <Slide animate>
    <p class="text-red-400">Group A</p>
  </Slide>

  <!-- Group B -->
  <Slide animate animateId="two">
    <p>Group B</p>
  </Slide>

  <Slide animate animateId="two">
    <p class="text-green-400">Group B</p>
  </Slide>

  <!-- Group C -->
  <Slide animate animateId="two" animateRestart>
    <p>Group C</p>
  </Slide>

  <Slide animate animateId="two">
    <p class="text-blue-400">Group C</p>
  </Slide>
</Presentation>
```
