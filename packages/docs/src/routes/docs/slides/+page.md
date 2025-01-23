<script lang="ts">
	import Slides from './slides.svelte'
	import Events from './events.svelte'
	import Components from './components.svelte'
</script>

# Slides

## Creating Slides

To create a slide use the `<Slide>` component inside the `<Presentation>` component:

<Slides />

```svelte
<script>
	import { Presentation, Slide } from '@animotion/core'
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<p class="text-8xl font-bold drop-shadow-sm">🪄 Animotion</p>
	</Slide>
  
	<Slide class="h-full place-content-center place-items-center">
		<img class="rounded-lg drop-shadow-sm" src="/nod-of-approval.gif" />
	</Slide>
</Presentation>
```

The `<Slide>` component uses CSS grid by default for the layout, so it's not necessary to specify the display mode.

## Slide Events

You can use the `in` and `out` props to pass a callback which runs when the slide enters and exits the viewport:

<Events />

```svelte
<script>
	import { Presentation, Slide } from '@animotion/core'
</script>

<Presentation>
	<Slide in={() => alert('slide 1 enter')} out={() => alert('slide 1 exit')}>
		<p class="text-8xl font-bold drop-shadow-sm">Slide 1</p>
	</Slide>

	<Slide in={() => alert('slide 2 enter')} out={() => alert('slide 2 exit')}>
		<p class="text-8xl font-bold drop-shadow-sm">Slide 2</p>
	</Slide>
</Presentation>
```

## Components

Svelte is a declarative JavaScript framework, so components are a great way to organize, and make your code reusable. This could be a `<Progress>` component inside the `lib` folder:

<Components />

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
	{progress.current.toLocaleString('en', { maximumFractionDigits: 0 })}
</button>
```

You can import, and use the `<Progress>` component inside the slide:

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

## Options

You can pass an `options` prop to the `<Presentation>` component:

```svelte
<script>
  import { Presentation } from '@animotion/core'
</script>

<Presentation options={{ transition: 'slide' }}>
	<!-- ... -->
</Presentation>
```

You can change the slide animation, show or hide the controls, and show the current slide in the URL hash among other options.