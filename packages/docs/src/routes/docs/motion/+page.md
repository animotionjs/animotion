<script lang="ts">
  import Tween from './tween.svelte'
  import Scale from './scale.svelte'
  import Options from './options.svelte'
  import All from './all.svelte'
</script>

# Motion

## Procedural Animations

Animotion is great for [animating layouts](/docs/transitions), and [code blocks](/docs/code-blocks), but
Motion is great if you want to animate any value over time.

You can use a `tween` to create a value that changes over time:
- Animate the value using the `to` method
- Use the `await` keyword to start the animation
- You can chain multiple `to` methods together

<Tween />

```svelte
<script>
	import { Presentation, Slide, Step } from '@animotion/core'
	import { tween } from '@animotion/motion'

	let cx = tween(0)

	async function animate() {
		await cx.to(600).to(0, { delay: 0.3 })
	}
</script>

<Presentation>
	<Slide>
		<Step in={animate} />

		<svg viewBox="-100 0 800 200">
			<circle cx={$cx} cy={100} r={100} fill="#00ffff" />
			<text
				x={$cx}
				y={100}
				font-family="JetBrains Mono"
				font-size="48px"
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{$cx.toFixed(0)}
			</text>
		</svg>
	</Slide>
</Presentation>
```

You can animate any value, including CSS properties using the `<style>` tag, or
Svelte's `style:` directive.

<Scale />

```svelte
<script>
  import { Presentation, Slide, Step } from '@animotion/core'
  import { tween } from '@animotion/motion'

  let text = tween(1)

  async function animate() {
    await text.to(3).to(1)
  }
</script>

<Presentation>
  <Slide>
    <Step in={animate} />

    <!-- Using the style attribute -->
    <h1 style="scale: {$text}">Motion</h1>

    <!-- Svelte shorthand -->
    <h1 style:scale={$text}>Motion</h1>
  </Slide>
</Presentation>
```

## Animating multiple values

A `tween` can be a single value, or an object which can interpolate between strings, objects, and arrays. You can also pass options which includes `duration`, `delay`, and `easing`.

<Options />

```svelte
<script>
	import { Presentation, Slide, Step } from '@animotion/core'
	import { tween } from '@animotion/motion'

	const circle = tween(
		{ x: 0, y: 100, r: 100, fill: '#00ffff' },
		{ duration: 1.5 }
	)

	async function animate() {
		await circle
			.to({ x: 600, fill: '#ffff00' }, { delay: 0.3 })
			.to({ x: 0, fill: '#00ffff' })
	}
</script>

<Presentation>
	<Slide>
		<Step in={animate} />

		<svg viewBox="-100 0 800 200">
			<circle
        cx={$circle.x}
        cy={$circle.y}
        r={$circle.r}
        fill={$circle.fill}
      />
		</svg>
	</Slide>
</Presentation>
```

## Combining animations

You can animate different `tween` at the same using the `all` method.

<All />

```svelte
<script>
	import { Presentation, Slide, Step } from '@animotion/core'
	import { tween, all } from '@animotion/motion'

	let circle = tween({ x: 0, y: 100, r: 100, fill: '#00ffff' })
	let text = tween({ count: 0 })

	async function animate() {
		all(
			circle
        .to({ x: 600, fill: '#ffff00' })
        .to({ x: 0, fill: '#00ffff' }),
			text
        .to({ count: 600 })
        .to({ count: 0 })
		)
	}
</script>

<Presentation>
	<Slide>
		<Step in={animate} />

		<svg viewBox="-100 0 800 200">
			<circle
        cx={$circle.x}
        cy={$circle.y}
        r={$circle.r}
        fill={$circle.fill}
      />

			<text
				x={$circle.x}
				y={$circle.y}
				font-family="JetBrains Mono"
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
<script>
  import { Presentation, Slide } from '@animotion/core'
  import { tween } from '@animotion/motion'

  let circle = tween({ x: 0 })
  
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
use the `reset` method on the `tween` to reset the animation back to its initial state.

```svelte
<script>
  import { Presentation, Slide } from '@animotion/core'
  import { tween } from '@animotion/motion'

  let value = tween(0)
</script>

<Presentation>
  <Slide out={() => value.reset()}>
    <!-- ... -->
  </Slide>
</Presentation>
```
