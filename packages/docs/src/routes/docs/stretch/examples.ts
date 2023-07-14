import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Presentation, Slide, Stretch } from '@components'
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
`.trim(), 'svelte')

const examples = [example1]

export default examples