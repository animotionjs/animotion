<script lang="ts">
	import Steps from './steps.svelte'
	import Custom from './custom.svelte'
	import Nested from './nested.svelte'
	import StepOrder from './step-order.svelte'
</script>

# Step

You can use steps, or fragments to reveal individual elements on a slide.

<Steps />

```svelte
<script>
  import { Presentation, Slide, Step } from '@animotion/core'
</script>

<Presentation>
  <Slide>
    <Step fadeUp>No care in the world</Step>
    <Step fadeRight>Maybe I'm learning</Step>
    <Step fadeLeft>Why the sea on the tide</Step>
    <Step fadeDown>Has no way of turning</Step>
  </Slide>
</Presentation>
```

Here are the available effects as props:

| Prop                      | Description                                         |
|---------------------------|-----------------------------------------------------|
| **in**                    | Step is shown event                                 |
| **out**                   | Step is hidden event                                |
| **order**                 | Order of nested steps                               |
| **fadeIn**                | Fade in                                             |
| **fadeOut**               | Fade out                                            |
| **fadeUp**                | Slide up while fading in                            |
| **fadeDown**              | Slide down while fading in                          |
| **fadeLeft**              | Slide left while fading in                          |
| **fadeRight**             | Slide right while fading in                         |
| **fadeInThenOut**         | Fade in, then out on the next step                  |
| **currentVisible**        | Fades in, then out on the next step                 |
| **fadeInThenSemiOut**     | Fades in, then to 50% on the next step              |
| **semiFadeOut**           | Fade out to 50%                                     |
| **highlightRed**          | Turns text red                                      |
| **highlightGreen**        | Turns text green                                    |
| **highlightBlue**         | Turns text blue                                     |
| **highlightCurrentRed**   | Turn text red, then back to original on next step   |
| **highlightCurrentGreen** | Turn text green, then back to original on next step |
| **highlightCurrentBlue**  | Turn text blue, then back to original on next step  |
| **grow**                  | Scale up                                            |
| **shrink**                | Scale down                                          |
| **strike**                | Strike through                                      |

## Custom steps

You can make a custom step using CSS by passing a `custom` class and the class you created.

<Custom />

```svelte
<script>
  import { Presentation, Slide, Step } from '@animotion/core'
</script>

<Presentation>
  <Slide>
    <Step class="custom blur">No care in the world</Step>
    <Step class="custom blur">Maybe I'm learning</Step>
    <Step class="custom blur">Why the sea on the tide</Step>
    <Step class="custom blur">Has no way of turning</Step>
  </Slide>
</Presentation>

<style>
  :global(.fragment.blur) {
    filter: blur(5px);
  }

  :global(.fragment.blur.visible) {
    filter: none;
  }
</style>
```

## Nested steps

You can also have nested steps.

<Nested />

```svelte
<script>
  import { Presentation, Slide, Step } from '@animotion/core'
</script>

<Presentation>
  <Slide>
    <Step fadeIn>
      <Step semiFadeOut>
        <Step fadeOut>
          Fade in > Fade 50% > Fade out
        </Step>
      </Step>
    </Step>
  </Slide>
</Presentation>
```

## Step order

You can change the step order with the `order` attribute.

<StepOrder />

```svelte
<script>
  import { Presentation, Slide, Step } from '@animotion/core'
</script>

<Presentation>
  <Slide>
    <Step order="3">Last</Step>
    <Step order="1">First</Step>
    <Step order="2">Second</Step>
  </Slide>
</Presentation>
```