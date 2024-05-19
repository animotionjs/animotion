<script lang="ts">
	import Slides from './slides.svelte'
	import Components from './components.svelte'
</script>

# Slides

## Creating Slides

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

## Presentation layout

The presentation dimensions are **960x700** pixels by default, preserving the aspect ratio, and centering slides vertically.

![Slides layout](/layout.png)

You can disable the default slide layout (scaling and centering), and use a custom CSS layout if you pass the `options` prop to the `<Presentation>` component.

```svelte
<script>
	import { Presentation } from '@animotion/core'
</script>

<Presentation options={{ disableLayout: true }}>
```

## Using components

Components are a great way to organize, and make your code more reusable.

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

## Slide props

Here are the props you can pass to the `<Slide>` component.

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
