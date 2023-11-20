import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script lang="ts">
  import { Presentation, Slide } from '@components'
  import { signal } from '@motion'

  let circleX = signal(0)

  async function animate() {
    await circleX.to(400).to(0)
  }
</script>

<Presentation>
  <Slide on:in={animate}>
    <svg viewBox="0 0 400 400">
      <circle cx={$circleX} cy={200} r={100} fill="#00ffff" />
    </svg>
  </Slide>
</Presentation>
`.trim(), 'svelte')


const example2 = await highlightCode(`
<script lang="ts">
  import { Presentation, Slide } from '@components'
  import { signal } from '@motion'

  let textScale = signal(1)

  async function animate() {
    await textScale.to(3).to(1)
  }
</script>

<Presentation>
  <Slide on:in={animate}>
    <!-- Using the style attribute -->
    <h1 style="scale: {$textScale}">Motion</h1>

    <!-- Svelte shorthand -->
    <h1 style:scale={$textScale}>Motion</h1>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const example3 = await highlightCode(`
<script lang="ts">
  import { Presentation, Slide } from '@components'
  import { signal } from '@motion'

  let circle = signal({ x: 0, fill: '#00ffff' }, { duration: 1500 })

  async function animate() {
    await circle
      .to({ x: 400, fill: '#ffff00' }, { delay: 300 })
      .to({ x: 0, fill: '#00ffff' })
  }
</script>

<Presentation>
  <Slide on:in={animate}>
    <svg viewBox="0 0 400 400">
      <circle cx={$circle.x} cy={200} r={100} fill={$circle.fill} />
    </svg>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const example4 = await highlightCode(`
<script lang="ts">
  import { Presentation, Slide } from '@components'
  import { signal, all } from '@motion'

  let circle = signal({ x: 0, y: 200, r: 100, fill: '#00ffff' })
  let text = signal({ count: 0 })
  
  async function animate() {
    all(
      circle
        .to({ x: 400, fill: '#ffff00' })
        .to({ x: 0, fill: '#00ffff' }),
      text.to({ count: 400 }).to({ count: 0 })
    )
  }
</script>

<Presentation>
  <Slide on:in={animate}>
    <svg viewBox="0 0 400 400">
      <circle
        cx={$circle.x}
        cy={$circle.x}
        r={$circle.r}
        fill={$circle.fill}
      />
      
      <text
        x={$circle.x}
        y={$circle.y}
        font-size={$circle.r * 0.4}
        text-anchor="middle"
        dominant-baseline="middle"
      >
        {$text.count.toFixed(0)}
      </text>
    </svg>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const example5 = await highlightCode(`
<script lang="ts">
  import { Presentation, Slide } from '@components'
  import { signal } from '@motion'

  let circle = signal({ x: 0 })
  
  async function animate() {
    await circle
      .sfx('/sfx/transition.mp3')
      .to({ x: 400 })
  }
</script>

<Presentation>
  <Slide on:in={animate}>
    <svg viewBox="0 0 400 400">
      <circle cx={$circle.x} cy={200} r={100} fill="#00ffff" />
    </svg>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const example6 = await highlightCode(`
<script lang="ts">
  import { Presentation, Slide } from '@components'
  import { signal } from '@motion'

  let value = signal(0)
</script>

<Presentation>
  <Slide on:out={() => value.reset()}>
    <!-- ... -->
  </Slide>
</Presentation>
`.trim(), 'svelte')

const examples = [example1, example2, example3, example4, example5, example6]

export default examples