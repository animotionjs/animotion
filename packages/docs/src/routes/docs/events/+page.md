<script lang="ts">
	import Actions from './actions.svelte'
</script>

# Events

## Actions

You can pass the `in` and `out` function to the `<Slide>` and `<Step>` components to trigger an event.

<Actions />

```svelte
<script>
  import { Presentation, Slide, Step } from '@animotion/core'
</script>

<Presentation>
  <Slide>
    <p class="text-[100px] font-semibold">Events</p>
  </Slide>

  <Slide
    in={() => alert('slide in')}
    out={() => alert('slide out')}
  >
    <p class="text-[100px] font-semibold">Slide</p>

    <Step
      in={() => alert('step in')}
      out={() => alert('step out')}
    >
      Step
    </Step>
  </Slide>
</Presentation>
```
