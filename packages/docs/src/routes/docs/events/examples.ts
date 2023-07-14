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

const example2 = await highlightCode(`
<script>
  import { navigation } from '@stores/navigation'
</script>

<pre>
  {JSON.stringify($navigation, null, 2)}
</pre>
`.trim(), 'svelte')

const examples = [example1, example2]

export default examples