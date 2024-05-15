<script lang="ts">
	import Stack from './stack.svelte'
</script>

# Stack

You can use the `<Stack>` component to stack things on top of each other.

<Stack />

```svelte
<script>
  import { Presentation, Slide, Stack, Step } from '@animotion/core'
</script>

<Presentation>
  <Slide>
    <Stack>
      <img src="https://picsum.photos/400/400" />

      <Step>
        <img src="https://picsum.photos/500/300" />
      </Step>
      
			<Step>
        <img src="https://picsum.photos/300/340" />
      </Step>
    </Stack>
  </Slide>
</Presentation>
```