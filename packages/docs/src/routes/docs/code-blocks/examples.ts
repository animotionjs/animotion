import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Presentation, Slide, Code } from '@components'
</script>

<Presentation>
  <Slide animate>
    <div class="mx-auto w-[800px]">
      <Code lang="svelte">
        {\`
          <script>
            let count = 0
            $: double = count * 2
          </script>
        \`}
      </Code>
    </div>
  </Slide>

  <Slide animate>
    <div class="mx-auto w-[800px]">
      <Code lang="html">
        {\`
          <script>
            let count = 0
            $: double = count * 2
          </script>

          <button on:click={() => count += 1}>
            {double}
          </button>
        \`}
      </Code>
    </div>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const example2 = await highlightCode(`
<Code lang="ts">
  {\`
    const bool = true
  \`}
</Code>
`.trim(), 'svelte')

const example3 = await highlightCode(`
<Code lang="ts">
  {\`
const bool = true
  \`}
</Code>
`.trim(), 'svelte')

const example4 = await highlightCode(`
<script>
  import { Presentation, Slide, Code } from '@components'
</script>

<Presentation>
  <Slide animate>
    <div class="mx-auto w-[400px]">
      <Code lang="svelte" lines="2|3">
        {\`
          <script>
            let count = 0
            $: double = count * 2
          </script>
        \`}
      </Code>
    </div>
  </Slide>

  <Slide animate>
    <div class="mx-auto w-[800px]">
      <Code lang="svelte" lines="6,8|3,7|1-8">
        {\`
          <script>
            let count = 0
            $: double = count * 2
          </script>

          <button on:click={() => count += 1}>
            {double}
          </button>
        \`}
      </Code>
    </div>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const example5 = await highlightCode(`
<Code
  lang="ts"
  lines="1,4|2|3|1-4"
  steps={[
    ['2', async () => await circle.to({ x: 400, fill: '#ffff00' })],
    ['3', async () => await circle.to({ x: 0, fill: '#00ffff' })],
    ['1-4', () => circle.reset()],
  ]}
>
  {\`
    async function animate() {
      await circle.to({ x: 400, fill: '#ffff00' })
      await circle.to({ x: 0, fill: '#00ffff' })
    }
  \`}
</Code>
`.trim(), 'svelte')

const example6 = await highlightCode(`
<Code
  lang="ts"
  lines="1,4|2|3|1-4"
  on:change={(e) => {
    const { lines } = e.detail
    if (lines === '2') && await circle.to({ x: 400, fill: '#ffff00' })
    if (lines === '3') && await circle.to({ x: 0, fill: '#00ffff' })
    if (lines === '1-4') && circle.reset()
  }}
>
  {\`
    async function animate() {
      await circle.to({ x: 400, fill: '#ffff00' })
      await circle.to({ x: 0, fill: '#00ffff' })
    }
  \`}
</Code>
`.trim(), 'svelte')

const example7 = await highlightCode(`
.reveal pre code {
  max-height: 600px;
  /* ... */
}
`.trim(), 'css')

const example8 = await highlightCode(`
import { svelte } from './svelte'

export function registerLanguages(hljs) {
  hljs.registerLanguage('svelte', svelte)
}
`.trim(), 'ts')

const examples = [example1, example2, example3, example4, example5, example6, example7, example8]

export default examples