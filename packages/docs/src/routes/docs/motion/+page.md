<script lang="ts">
  import Tween from './tween.svelte'
  import Scale from './scale.svelte'
  import Options from './options.svelte'
  import All from './all.svelte'
</script>

# Motion

## Procedural Animations

Sometimes you need to animate values outside of CSS like SVG and Canvas values. Instead of reaching for a JavaScript library, you can use Motion by importing `@animotion/motion`:

<Tween />

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
			<circle cx={cx.current} cy={100} r={100} fill="#00ffff" />
			<text
				x={cx.current}
				y={100}
				font-family="Monaspace Neon"
				font-size="48px"
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{cx.current.toFixed(0)}
			</text>
		</svg>

		<Action do={animate} />
	</Slide>
</Presentation>
```

To create a value that you want to animate over time, use the `tween` method. To animate the value, use the `to` method. You can use the `await` keyword to wait for the animation to finish.

You can animate any value, including CSS properties using the `style` attribute, or Svelte's `style:` directive:

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
    <!-- using the style attribute -->
    <p style="scale: {text.current}">Motion</p>

    <!-- using the Svelte directive -->
    <p style:scale={text.current}>Motion</p>

    <Action do={animate} />
  </Slide>
</Presentation>
```

## Tween multiple values

You can `tween` a single value, objects, arrays, and override the default animation options using the `duration`, `delay`, and `easing` options:

<Options />

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

You can use `obj.current.property` to access the object property, but Motion creates an accessor for every property, so you can omit `.current` and say `obj.property`.

## Combine animations

If you want to play multiple animations at the same time without having to think about where to put the `await` keyword you can combine them using the `all` helper method:

<All />

```svelte
<script>
	import { Presentation, Slide, Action } from '@animotion/core'
	import { tween, all } from '@animotion/motion'

	let circle = tween({ x: 0, y: 100, r: 100, fill: '#00ffff' })
	let text = tween({ count: 0 })

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
				font-family="Monaspace Neon"
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

Besides playing animations you can play sounds using the `sfx` method. After you place your sounds in the `static` folder at the root of your project, they
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

Instead of reloading the page to reset the state of your animation,
you can use the `reset` method on the `tween` to reset the animation back to its initial state.

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
