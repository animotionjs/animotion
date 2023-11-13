import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Presentation, Slide, Vertical } from '@components'
</script>

<Presentation>
  <Slide
    on:in={() => console.log('in')}
    on:out={() => console.log('out')}
  >
    Horizontal
  </Slide>

  <Vertical>
    <Slide
      on:in={() => console.log('in')}
      on:out={() => console.log('out')}
    >
      Vertical
    </Slide>
  </Vertical>
</Presentation>
`.trim(), 'svelte')

const examples = [example1]

export default examples