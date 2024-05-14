<script lang="ts">
	import AutoAnimate from './auto-animate.svelte'
	import Lines from './lines.svelte'
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
    <div class="mx-auto w-[800px]">
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
    <div class="mx-auto w-[800px]">
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

## Indentation

If you use tabs to indent the code you don't have to think about whitespace.

```svelte
<Code lang="ts">
  {`
    const bool = true
  `}
</Code>
```

If you use spaces for indentation the code has to be at the start of a new line.

```svelte
<Code lang="ts">
  {`
const bool = true
  `}
</Code>
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
    <div class="mx-auto w-[400px]">
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
    <div class="mx-auto w-[800px]">
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

```svelte
<Code
  lang="ts"
  lines="1,4|2|3|1-4"
  steps={{
    '2': async () => await circle.to({ x: 400, fill: '#ffff00' }),
    '3': async () => await circle.to({ x: 0, fill: '#00ffff' }),
    '1-4': () => circle.reset(),
	}}
>
  {`
    async function animate() {
      await circle.to({ x: 400, fill: '#ffff00' })
      await circle.to({ x: 0, fill: '#00ffff' })
    }
  `}
</Code>
```

## Escaping closing tags

Having a closing tag like `</script>` in your code block is going to cause problems because Svelte thinks you're trying to close the `<script>` tag in your component. To solve this problem use the backslash character to escape it:

```svelte
<script>
	// ...
<\/script>
```
