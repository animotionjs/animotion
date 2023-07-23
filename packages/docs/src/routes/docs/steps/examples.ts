import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Presentation, Slide, Step } from '@components'
</script>

<Presentation>
  <Slide>
    <Step fadeUp>No care in the world</Step>
    <Step fadeRight>Maybe I'm learning</Step>
    <Step fadeLeft>Why the sea on the tide</Step>
    <Step fadeDown>Has no way of turning</Step>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const example2 = await highlightCode(`
<script>
  import { Presentation, Slide, Step } from '@components'
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
`.trim(), 'svelte')

const example3 = await highlightCode(`
<script>
  import { Presentation, Slide, Step } from '@components'
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
`.trim(), 'svelte')

const example4 = await highlightCode(`
<script>
  import { Presentation, Slide, Step } from '@components'
</script>

<Presentation>
  <Slide>
    <Step order="3">Last</Step>
    <Step order="1">First</Step>
    <Step order="2">Second</Step>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const examples = [example1, example2, example3, example4]

export default examples