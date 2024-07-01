# Animotion 2

## Changes

- [Svelte 5](https://svelte-5-preview.vercel.app/)
- [SvelteKit](https://kit.svelte.dev/) template
- [Tailwind 4](https://tailwindcss.com/blog/tailwindcss-v4-alpha) for styling
- [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions) for layout animations
- [@animotion/core](https://www.npmjs.com/package/@animotion/core) standalone package

## Animotion Core

Animotion is now a standalone package named `@animotion/core`. This makes it easy to update to future versions, and using Animotion inside an existing Svelte project:

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

## Svelte 5

Animotion takes advantage of [Svelte 5 runes](https://svelte-5-preview.vercel.app/docs/runes) for reactivity:

```svelte
<script>
  let diameter = $state(4)
  let radius = $derived(diameter / 2)
</script>

<p>Radius of the circle is: {radius}</p>
```

## SvelteKit

Animotion is now a SvelteKit template, so you don't need a separate server if you need an endpoint, and can embed the `<iframe>` directly in your slide. Learn more by reading the [SvelteKit docs](https://kit.svelte.dev/docs/introduction).

## Tailwind 4

Tailwind 4 is a huge leap in terms of developer experience over older versions of Tailwind, as it makes the framework feel CSS-native, and less like a JavaScript library.

## View Transitions API

Animotion takes advantage of the View Transitions API for layout animations. You can use the `<Transition>` component to assign a `view-transition-name` to an element: 

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

> ⚠️ The View Transitions API is only supported in Chromium based browsers at the moment. 

Besides [transitions](/docs/transitions), you can use [actions](/docs/actions) which lets you step through the slide, and run code that updates the presentation.