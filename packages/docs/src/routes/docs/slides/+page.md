<script lang="ts">
	import Slides from './slides.svelte'
	import Components from './components.svelte'
</script>

# Slides

## Creating Slides

<Slides />

To create a slide use the `<Slide>` component inside the `<Presentation>` component.

```svelte
<script>
	import { Presentation, Slide } from '@animotion/core'
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<p class="text-8xl font-bold drop-shadow-sm">🪄 Animotion</p>
	</Slide>
  
	<Slide class="h-full place-content-center place-items-center">
		<p>Visualize ideas with code</p>
	</Slide>
</Presentation>
```

The `<Slide>` component uses CSS grid by default for the layout, so it's not necessary to specify the display mode. 

## Using components

Components are a great way to organize, and make your code more reusable.

<Components />

This could be a `<Progress>` component inside the `lib` folder.

```svelte
<script>
  import { Slide } from '@animotion/core'
  import { tween } from '@animotion/motion'

  let progress = tween(0)

	async function animate() {
		await progress.to(1_000_000)
	}  
</script>

<button onclick={animate}>
  {$progress}
</button>
```

You can import, and use the `<Progress>` component inside the slide.

```svelte
<script>
  import { Presentation, Slide } from '@animotion/core'
  import Progress from '$lib/progress.svelte'
</script>

<Presentation>
	<Slide>
  	<Progress />
	</Slide>
</Presentation>
```

## Presentation options

You can pass `options` to the `<Presentation>` component.

```svelte
<script>
  import { Presentation } from '@animotion/core'
</script>

<!-- show current slide in the URL hash -->
<Presentation options={{ hash: true }} />	
```