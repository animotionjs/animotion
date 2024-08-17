<script lang="ts">
  import Tween from './tween.svelte'
  import Scale from './scale.svelte'
  import Options from './options.svelte'
  import All from './all.svelte'
</script>

# Motion

## Procedural Animations

`@animotion/core` is great for animating [code](/docs/code), and [layouts](/docs/transitions) while `@animotion/motion` is used for animating values you otherwise can't animate with CSS like SVG and Canvas elements.

<Tween />

Use the `tween` method to create a value that changes over time:
- to animate the value use the `to` method
- you can use the `await` keyword to wait for the animation to finish

```svelte
<script>
	import { Presentation, Slide, Action } from '@animotion/core'
	import { tween } from '@animotion/motion'

	let cx = tween(0)

	async function animate() {
		await cx.to(600)
		await cx.to(0, { delay: 300 })
	}
</script>

<Presentation>
	<Slide>
		<svg width="800" height="200" viewBox="-100 0 800 200">
			<circle cx={cx.value} cy={100} r={100} fill="#00ffff" />
			<text
				x={cx.value}
				y={100}
				font-family="JetBrains Mono"
				font-size="48px"
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{cx.value.toFixed(0)}
			</text>
		</svg>

		<Action do={animate} />
	</Slide>
</Presentation>
```

You can animate any value, including CSS properties using the `style` attribute, or Svelte's `style:` directive.

<Scale />

```svelte
<script>
  import { Presentation, Slide, Action } from '@animotion/core'
  import { tween } from '@animotion/motion'

  let text = tween(1)

  async function animate() {
    await text.to(3)
		await text.to(1)
  }
</script>

<Presentation>
  <Slide>
    <!-- Using the style attribute -->
    <p style="scale: {text.value}">Motion</p>

    <!-- Svelte directive -->
    <p style:scale={text.value}>Motion</p>

    <Action do={animate} />
  </Slide>
</Presentation>
```

## Tween multiple values

<Options />

You can `tween` a single value, objects, arrays, and override the default animation options using the `duration`, `delay`, and `easing` options:

```svelte
<script>
	import { Presentation, Slide, Action } from '@animotion/core'
	import { tween } from '@animotion/motion'

	const circle = tween(
		{ x: 0, y: 100, r: 100, fill: '#00ffff' },
		{ duration: 1500 }
	)

	async function animate() {
		await circle.to({ x: 600, fill: '#ffff00' }, { delay: 300 })
		await circle.to({ x: 0, fill: '#00ffff' })
	}
</script>

<Presentation>
	<Slide>
		<svg viewBox="-100 0 800 200">
			<circle
        cx={circle.x}
        cy={circle.y}
        r={circle.r}
        fill={circle.fill}
      />
		</svg>

		<Action do={animate} />
	</Slide>
</Presentation>
```

## Combine animations

<All />

If you want to combine and play animations at the same time without having to think about where to put `await` you can write a simple `all` function:

```svelte
<script>
	import { Presentation, Slide, Action } from '@animotion/core'
	import { tween, all } from '@animotion/motion'

	let circle = tween({ x: 0, y: 100, r: 100, fill: '#00ffff' })
	let text = tween({ count: 0 })

	async function all(...tweens: Promise<void>[]) {
		return Promise.all([...tweens])
	}

	async function animate() {
		await all(
			circle.to({ x: 600, fill: '#ffff00' }),
			text.to({ count: 600 })
		)

		await all(
			circle.to({ x: 0, fill: '#00ffff' }),
			text.to({ count: 0 })
		)
	}
</script>

<Presentation>
	<Slide>
		<svg width="800" height="200" viewBox="-100 0 800 200">
			<circle
        cx={circle.x}
        cy={circle.y}
        r={circle.r}
        fill={circle.fill}
      />

			<text
				x={circle.x}
				y={circle.y}
				font-family="JetBrains Mono"
				font-size={circle.r * 0.4}
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{text.count.toFixed(0)}
			</text>
		</svg>

		<Action do={animate} />
	</Slide>
</Presentation>
```

## Sound Effects

Besides playing animations you can play sounds using the `sfx` method.

After you place your sounds in the `static` folder at the root of your project, they
become available from the root `/` of your site:

```svelte
<script>
  import { Presentation, Slide } from '@animotion/core'
  import { tween } from '@animotion/motion'

  let circle = tween({ x: 0 })
  
  async function animate() {
    await circle.sfx('/sfx/transition.mp3').to({ x: 400 })
  }
</script>

<Presentation>
  <Slide in={animate}>
    <svg viewBox="0 0 400 400">
      <circle cx={circle.x} cy={200} r={100} fill="#00ffff" />
    </svg>
  </Slide>
</Presentation>
```

## Reset

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
