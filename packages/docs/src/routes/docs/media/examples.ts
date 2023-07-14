import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Presentation, Slide, Media } from '@components'
</script>

<Presentation>
  <Slide>
    <Media
      class="h-[600px] w-full"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      type="iframe"
    />
  </Slide>
</Presentation>
`.trim(), 'svelte')

const examples = [example1]

export default examples