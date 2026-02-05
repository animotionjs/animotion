# Animotion 2

## Changes

- [@animotion/core](https://www.npmjs.com/package/@animotion/core) standalone package
- [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions) for layout animations
- [Slide events](slides) are now props
- [Svelte 5](https://svelte-5-preview.vercel.app/)
- [SvelteKit](https://kit.svelte.dev/) template
- [Tailwind 4](https://tailwindcss.com/blog/tailwindcss-v4-alpha) for styling

## Animotion Core

Animotion is now a standalone package named `@animotion/core`. This makes it easy to update to future versions, and using Animotion inside existing Svelte projects:

```svelte
<script>
  import { Presentation, Slide } from '@animotion/core'
</script>

<Presentation>
  <Slide>
    <p>🪄 Animotion</p>
  </Slide>
</Presentation>
```

## View Transitions API

Animotion takes advantage of the View Transitions API for layout animations. You can use the `<Transition>` component to assign a `view-transition-name` to an element: 

> ⚠️ Animotion uses the [View Transitions API (single document)](https://caniuse.com/view-transitions) which is Baseline newly available since Oct 2025. The core presentation features still work in older browsers, but they might not show all transitions.

```svelte
<script>
  import { Presentation, Slide, Transition } from '@animotion/core'
</script>

<Presentation>
  <Slide>
    <Transition>
      <p>🪄 Animotion</p>
    </Transition>
  </Slide>
</Presentation>
```

Besides [transitions](/docs/transitions), you can use [actions](/docs/actions) which lets you step through the slide, and run code that updates the presentation.

## Slide Events

The previous `on:in` and `on:out` events are now regular props:

```svelte
<script>
	import { Presentation, Slide } from '@animotion/core'
</script>

<Presentation>
	<Slide in={() => alert('in')} out={() => alert('out')}>
		<p class="text-8xl">Slide</p>
	</Slide>
</Presentation>
```

## Svelte 5

Animotion uses [signals](https://svelte-5-preview.vercel.app/docs/runes) for reactivity:

```svelte
<script>
  let diameter = $state(4)
  let radius = $derived(diameter / 2)
</script>

<p>Radius of the circle is: {radius}</p>
```

The same is true for `tween` which is no longer a Svelte store requiring the `$` prefix to subscribe to the value:

```svelte
<script>
	import { tween } from '@animotion/motion'

	let coords = tween({ x: 0, y: 0 })
</script>

<button onclick={() => coords.to({ x: 100, y: 100 })}>
  x: {coords.x}
  y: {coords.y}
</button>
```

## SvelteKit

Animotion is now a SvelteKit template, so you don't need a separate server if you need an endpoint, or embed an `<iframe>` in your slide. Learn more by reading the [SvelteKit docs](https://kit.svelte.dev/docs/introduction).

## Tailwind 4

Tailwind 4 is a huge leap in terms of developer experience over older versions of Tailwind, as it makes the framework feel CSS-native, and less like a JavaScript library.