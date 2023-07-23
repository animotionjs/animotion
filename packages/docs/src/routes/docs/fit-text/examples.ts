import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Presentation, Slide, FitText } from '@components'
</script>

<Presentation>
  <Slide>
    <FitText class="uppercase">hello</FitText>
    <FitText class="uppercase">darkness my old friend</FitText>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const example2 = await highlightCode(`
<FitText type="h1">hello</FitText>
<FitText type="p">darkness my old friend</FitText>
`.trim(), 'svelte')

const examples = [example1, example2]

export default examples