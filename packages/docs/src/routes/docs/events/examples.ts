import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Presentation, Slide, Vertical } from '@components'
</script>

<Presentation>
  <Slide>
    <p class="text-[100px] font-semibold">Events</p>
  </Slide>

  <Slide
    on:in={() => alert('slide in')}
    on:out={() => alert('slide out')}
  >
    <p class="text-[100px] font-semibold">Slide</p>

    <Step
      on:in={() => alert('step in')}
      on:out={() => alert('step out')}
    >
      Step
    </Step>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const examples = [example1]

export default examples