<script lang="ts">
	import Slides from './slides.svelte'
	import Components from './components.svelte'
</script>

# Creating slides

## Slide away

<Slides />

To create a slide use the `<Slide>` component inside your presentation.

```svelte
<script>
  import { Presentation, Slide, Vertical } from '@animotion/core'
</script>

<Presentation>
  <Slide>Horizontal 1</Slide>
  <Slide>Horizontal 2</Slide>

  <Vertical>
    <Slide>Vertical 1</Slide>  
    <Slide>Vertical 2</Slide>  
  </Vertical>
</Presentation>
```

## Using components

Stateful slides are easier to split into separate components.

<Components />

This could be a `<Progress>` component inside the `lib` folder.

```svelte
<script>
  import { Slide } from '@animotion/core'
  import { signal } from '@animotion/motion'

  let progress = signal(0)

	async function animate() {
		await progress.to(1_000_000)
	}  
</script>

<div class="mt-8 text-[100px]">
	{$progress.toLocaleString('en', { maximumFractionDigits: 0 })}
</div>
<button	onclick={animate}	class="mt-16 p-8 bg-gray-700 rounded-2xl">
	animate
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

## Slide props

| Prop                 | Description                                                         |
|----------------------|---------------------------------------------------------------------|
| **animate**          | Animate elements between slides                                     |
| **animateEasing**    | Pass CSS easing                                                     |
| **animateUnmatched** | Animate elements that aren't a match                                |
| **animateId**        | Change the animate id for a slide                                   |
| **animateRestart**   | Don't auto-animate from previous slide even if the animate id match |
| **background**       | Set slide background color                                          |
| **gradient**         | Set gradient background                                             |
| **image**            | Set image background                                                |
| **video**            | Set video background                                                |
| **iframe**           | Set iframe background                                               |
| **interactive**      | Make iframe background interactive                                  |
| **transition**       | none, fade, slide, convex, concave, zoom		                  			 |
