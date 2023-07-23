import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
const options = {
  // bring your own layout
  disableLayout: true,
  // display mode used to show slides
  display: 'grid'
}
`.trim(), 'ts')

const example2 = await highlightCode(`
<!-- layout.svelte -->
<div class="relative h-[1080px] w-[1920px] overflow-hidden">
  <div class="h-full p-16">
    <slot />
  </div>
</div>
`.trim(), 'svelte')

const example3 = await highlightCode(`
<script>
  import { Presentation, Slide } from '@components'
  import Layout from './layout.svelte'
</script>

<Presentation>
  <Slide>
    <Layout>
      <!-- ... -->
    <Layout>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const examples = [example1, example2, example3]

export default examples