import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Presentation, Slide, Notes } from '@components'
</script>

<Presentation>
  <Slide>
    Horizontal 1
    <Notes>Don't make eye contact</Notes>
  </Slide>

  <Slide>Horizontal 2</Slide>
</Presentation>
`.trim(), 'svelte')

const examples = [example1]

export default examples