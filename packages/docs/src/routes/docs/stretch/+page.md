<script lang="ts">
	import Stretch from './stretch.svelte'
</script>

# Stretch

The `<Stretch>` component is a helper for resizing an image, or video for example to cover the remaining vertical space in a slide.

<Stretch />

```svelte
<script>
  import { Presentation, Slide, Stretch } from '@animotion/core'
</script>

<Presentation>
  <Slide>
    <Stretch
      class="mx-auto"
      src="svelte.png"
      type="img"
    />
  </Slide>
</Presentation>
```
