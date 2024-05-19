<script lang="ts">
	import AutoAnimate from './auto-animate.svelte'
	import Lines from './lines.svelte'
	import Steps from './steps.svelte'
</script>

# Code blocks

## Animating code

You can use the `<Code>` component and auto-animate the code. The `<Code>` component accepts a `lang` prop which supports close to 200 languages out of the box thanks to [highlight.js](https://highlightjs.org/).

<AutoAnimate />

```svelte
<script>
  import { Presentation, Slide, Code } from '@animotion/core'
</script>

<Presentation>
  <Slide animate>
    <div class="w-[800px] mx-auto text-8xl">
      <Code lang="svelte">
        {`
					<script>
						let count = $state(0)
						let double = $derived(count * 2)
					<\/script>
        `}
      </Code>
    </div>
  </Slide>

  <Slide animate>
    <div class="w-[800px] mx-auto text-8xl">
      <Code lang="html">
        {`
					<script>
						let count = $state(0)
						let double = $derived(count * 2)
					<\/script>

          <button onclick={() => count ++}>
            {double}
          </button>
        `}
      </Code>
    </div>
  </Slide>
</Presentation>
```

## Line highlights and offsets

You can animate line highlights using the `lines` prop and offset the line start by passing the `offset` prop.

- `lines="1-4"` highlights lines 1 to 4
- `lines="1,4"` highlights lines 1 and 4
- `lines="1-2|4"` first highlights lines 1 to 2 then highlight line 4

<Lines />

```svelte
<script>
  import { Presentation, Slide, Code } from '@animotion/core'
</script>

<Presentation>
  <Slide animate>
    <div class="w-[800px] mx-auto text-8xl">
      <Code lang="svelte" lines="2|3">
        {`
          <script>
            let count = 0
            $: double = count * 2
          </script>
        `}
      </Code>
    </div>
  </Slide>

  <Slide animate>
    <div class="w-[800px] mx-auto text-8xl">
      <Code lang="svelte" lines="6,8|3,7|1-8">
        {`
          <script>
            let count = 0
            $: double = count * 2
          </script>

          <button on:click={() => count += 1}>
            {double}
          </button>
        `}
      </Code>
    </div>
  </Slide>
</Presentation>
```

## Highlighted code animations

You can provide a `steps` prop to specify what animations you want to play based on the currently highlighted line.

<Steps />

```svelte
<script lang="ts">
	import { Presentation, Slide, Code } from '@animotion/core'
	import { signal } from '@animotion/motion'

	const circle = signal(
		{ x: 100, y: 100, r: 100, fill: '#00ffff' },
		{ duration: 2 }
	)

  async function moveCircleRight() {
    await circle.to({ x: 800, fill: '#ffff00' })
  }

  async function moveCircleLeft() {
    await circle.to({ x: 100, fill: '#00ffff' })
  }

  function resetAnimation() {
    circle.reset()
  }
</script>

<Presentation>
	<Slide class="text-[56px]">
		<Code
			id="steps"
			lang="ts"
			lines="1,4|2|3|1-4"
			steps={{
        '2': moveCircleRight,
        '3': moveCircleLeft,
        '1-4': resetAnimation
			}}
		>
			{`
				async function animate() {
					await circle.to({ x: 800, fill: '#ffff00' })
					await circle.to({ x: 100, fill: '#00ffff' })
				}
      `}
		</Code>

		<svg class="w-[900px] h-[200px] mt-32 mx-auto">
			<circle cx={$circle.x} cy={$circle.y} r={$circle.r} fill={$circle.fill} />
			<text
				x={$circle.x}
				y={$circle.y}
				font-size={$circle.r * 0.4}
				font-family="JetBrains Mono"
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{$circle.x.toFixed(0)}
			</text>
		</svg>
	</Slide>
</Presentation>
```

## Theming code blocks

The default theme is [Poimandres](https://github.com/drcmda/poimandres-theme), but you can use any of the [themes](https://github.com/highlightjs/highlight.js/tree/main/src/styles) provided by highlight.js. You can also create your own theme. The default code block styles are imported in `styles/app.css`:

```css
@import '@animotion/core/code';
```

## Escaping closing tags

Having a closing tag like `</script>` in your code block is going to cause problems because Svelte thinks you're trying to close the `<script>` tag in your component. To solve this problem use the backslash character to escape it:

```svelte
<Code>
  {`
    <script>
      // ...
    <\/script>
  `}
<Code>
```
