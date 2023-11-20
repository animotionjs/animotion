import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Presentation, Slide, Vertical } from '@components'
</script>

<Presentation>
  <Slide>Horizontal 1</Slide>
  <Slide>Horizontal 2</Slide>

  <Vertical>
    <Slide>Vertical 1</Slide>  
    <Slide>Vertical 2</Slide>  
  </Vertical>
</Presentation>
`.trim(), 'svelte')

const example2 = await highlightCode(`
<div class="reveal">
  <div class="slides">
    <section>Horizontal 1</section>
    <section>Horizontal 2</section>

    <section>
      <section>Vertical 1</section>
      <section>Vertical 2</section>
    </section>
  </div>
</div>
`.trim(), 'svelte')

const example3 = await highlightCode(`
<!-- src/progress.svelte -->
<script>
  import { Slide } from '@components'
  import { animate, signal } from '@motion'

  let progress = signal(0)
  
  animate(async () => {
    await progress.to(10_000)
  })
</script>

<Slide>
  {$progress.toLocaleString('en', { maximumFractionDigits: 0 })}
</Slide>
`.trim(), 'svelte')

const example4 = await highlightCode(`
<!-- src/slides.svelte -->
<script>
  import { Presentation } from '@components'
  import { Progress } from './progress.svelte'
</script>

<Presentation>
  <Progress />
</Presentation>
`.trim(), 'svelte')

const examples = [example1, example2, example3, example4]

export default examples