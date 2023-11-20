import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Presentation, Slide, Stack, Step } from '@components'
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
`.trim(), 'svelte')

const examples = [example1]

export default examples