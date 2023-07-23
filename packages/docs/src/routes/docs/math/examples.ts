import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Animotion, Slide, Step } from '@components'
</script>

<Presentation>
  <Slide>
    <p>
      The probability of getting {\`\\\\(k\\\\)\`} heads when flipping {\`\\\\(n\\\\)\`} coins
    </p>

    <Step>
      {\`
        \\\\[P(E) = {n \\\\choose k} p^k (1-p)^{ n-k} \\\\]
      \`}
    </Step>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const examples = [example1]

export default examples