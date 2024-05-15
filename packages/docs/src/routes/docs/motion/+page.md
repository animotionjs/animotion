<!-- <script lang="ts">
	import { Animotion, Slide } from "$lib/animotion"
	import CodeBlock from "$lib/components/code.svelte"
	import { all, signal } from '$lib/motion'

	export let data

	let circleX = signal(0)
	async function animateValues()	{
		await circleX.to(400).to(0)
		animateValues()
 	}
	animateValues()

	let textScale = signal(1, { duration: 2000 })
	async function animateStyle()	{
		await textScale.to(3).to(1)
		animateStyle()
 	}
	animateStyle()

	let circle = signal(
    { x: 0, y: 200, r: 100, fill: '#00ffff' },
    { duration: 1500 }
  )
	async function animateMultipleValues() {
    await circle
      .to({ x: 400, fill: '#ffff00' }, { delay: 300 })
      .to({ x: 0, fill: '#00ffff' })
		animateMultipleValues()
  }
	animateMultipleValues()

	let circleText = signal({ x: 0, y: 200, r: 100, fill: '#00ffff' }, { duration: 2000 })
	let textCount = signal({ count: 0 }, { duration: 2000 })
	async function animateCombined() {
		all(
			circleText
				.to({ x: 400, fill: '#ffff00' })
				.to({ x: 0, fill: '#00ffff' }),
				textCount.to({ count: 400 }).to({ count: 0 })
		)
		animateCombined()
  }
	animateCombined()
</script> -->

<script lang="ts">
  import Cx from './cx.svelte'
</script>

# Motion

## Procedural Animations

Animotion is great for [animating layouts](/docs/auto-animate), and [code blocks](/docs/code-blocks), but
Motion is great if you want to animate any value over time.

You can use a `signal` to create a value that changes over time:
- Animate the value using the `to` method
- Use the `await` keyword to start the animation
- You can chain multiple `to` methods together

<Cx />

```svelte
<script lang="ts">
  import { Presentation, Slide } from '@animotion/core'
  import { signal } from '@animotion/motion'

  let cx = signal(0)

  async function animate() {
    await cx.to(400).to(0)
  }
</script>

<Presentation>
  <Slide in={animate}>
    <svg viewBox="0 0 400 400">
      <circle cx={$cx} cy={200} r={100} fill="#00ffff" />
    </svg>
  </Slide>
</Presentation>
```

You can animate any value, including CSS properties using the `<style>` tag, or
Svelte's `style:` directive.

<!-- <Animotion>
	<Slide>
		<h1 style:scale={$textScale}>Motion</h1>
	</Slide>
</Animotion> -->

```svelte
<script lang="ts">
  import { Presentation, Slide } from '@animotion/core'
  import { signal } from '@animotion/motion'

  let scale = signal(1)

  async function animate() {
    await scale.to(3).to(1)
  }
</script>

<Presentation>
  <Slide in={animate}>
    <!-- Using the style attribute -->
    <h1 style="scale: {$scale}">Motion</h1>

    <!-- Svelte shorthand -->
    <h1 style:scale={$scale}>Motion</h1>
  </Slide>
</Presentation>
```

## Animating multiple values

A `signal` can be a single value, or an object which can interpolate between strings, objects, and arrays — it also accepts an options object that includes a `duration`, `delay`, and `easing` option.

<!-- <Animotion>
	<Slide>
		<svg class="w-full h-[400px]" viewBox="0 0 400 400">
			<circle cx={$circle.x} cy={$circle.y} r={$circle.r} fill={$circle.fill} />
		</svg>
	</Slide>
</Animotion> -->

```svelte
<script lang="ts">
  import { Presentation, Slide } from '@animotion/motion'
  import { signal } from '@animotion/motion'

  let circle = signal({ x: 0, fill: '#00ffff' }, { duration: 1500 })

  async function animate() {
    await circle
      .to({ x: 400, fill: '#ffff00' }, { delay: 300 })
      .to({ x: 0, fill: '#00ffff' })
  }
</script>

<Presentation>
  <Slide in={animate}>
    <svg viewBox="0 0 400 400">
      <circle cx={$circle.x} cy={200} r={100} fill={$circle.fill} />
    </svg>
  </Slide>
</Presentation>
```

## Combining animations

You can animate different `signals` at the same using the `all` method.

<!-- <Animotion>
	<Slide>
		<svg class="w-full h-[400px]" viewBox="0 0 400 400">
			<circle cx={$circleText.x} cy={$circleText.y} r={$circleText.r} fill={$circleText.fill} />

			<text
				x={$circleText.x}
				y={$circleText.y}
				font-size={$circleText.r * 0.4}
				font-family="JetBrains Mono"
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{$textCount.count.toFixed(0)}
			</text>
		</svg>
	</Slide>
</Animotion> -->

```svelte
<script lang="ts">
  import { Presentation, Slide } from '@animotion/core'
  import { signal, all } from '@animotion/motion'

  let circle = signal({ x: 0, y: 200, r: 100, fill: '#00ffff' })
  let text = signal({ count: 0 })
  
  async function animate() {
    all(
      circle
        .to({ x: 400, fill: '#ffff00' })
        .to({ x: 0, fill: '#00ffff' }),
      text.to({ count: 400 }).to({ count: 0 })
    )
  }
</script>

<Presentation>
  <Slide in={animate}>
    <svg viewBox="0 0 400 400">
      <circle
        cx={$circle.x}
        cy={$circle.x}
        r={$circle.r}
        fill={$circle.fill}
      />
      
      <text
        x={$circle.x}
        y={$circle.y}
        font-size={$circle.r * 0.4}
        text-anchor="middle"
        dominant-baseline="middle"
      >
        {$text.count.toFixed(0)}
      </text>
    </svg>
  </Slide>
</Presentation>
```

## Playing sounds

Besides playing animations you can play sounds using the `sfx` method.

After you place your sounds in the `static` folder at the root of your project, they
become available from the root `/` of your site.

```svelte
<script lang="ts">
  import { Presentation, Slide } from '@animotion/core'
  import { signal } from '@animotion/motion'

  let circle = signal({ x: 0 })
  
  async function animate() {
    await circle
      .sfx('/sfx/transition')
      .to({ x: 400 })
  }
</script>

<Presentation>
  <Slide in={animate}>
    <svg viewBox="0 0 400 400">
      <circle cx={$circle.x} cy={200} r={100} fill="#00ffff" />
    </svg>
  </Slide>
</Presentation>
```

## Animation reset

If you mess up your delivery, instead of reloading the slide to reset the state of your animation,
use the `reset` method on the `signal` to reset the animation back to its initial state.

```svelte
<script lang="ts">
  import { Presentation, Slide } from '@animotion/core'
  import { signal } from '@animotion/motion'

  let value = signal(0)
</script>

<Presentation>
  <Slide out={() => value.reset()}>
    <!-- ... -->
  </Slide>
</Presentation>
```
