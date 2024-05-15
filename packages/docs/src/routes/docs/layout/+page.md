# Layout

## Bring your own layout

Reveal presentation dimensions are **960x700** pixels by default, preserving the aspect ratio, and centering slides vertically, but you can disable the layout and bring your own layout.

![Slides layout](/layout.png)

You can disable the default layout among other options, if you pass the `options` prop to the `<Presentation>` component.

```svelte
<script>
	import { Presentation } from '@animotion/core'
</script>

<Presentation options={{ disableLayout: true }}>
```

You can create a custom `<Layout>` component like one for recording YouTube videos and wrap the presentation in it.

```svelte
<script>
	let { children } = $props()
</script>

<div class="relative h-[1080px] w-[1920px] overflow-hidden">
  <div class="h-full p-16">
    {@render children()}
  </div>
</div>
```

```svelte
<script>
  import { Presentation } from '@animotion/core'
  import Layout from './layout.svelte'
</script>

<Presentation>
	<Layout>
    <!-- ... -->
  <Layout>
</Presentation>
```