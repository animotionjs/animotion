import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Presentation, Slide } from '@components'
</script>

<Presentation>
  <Slide>
    <div class="mx-auto flex w-[800px] justify-between text-gray-900">
      <div class="grid h-[240px] w-[240px] place-content-center rounded-full bg-red-400">Red</div>
      <div class="grid h-[240px] w-[240px] place-content-center rounded-full bg-green-400">Green</div>
      <div class="grid h-[240px] w-[240px] place-content-center rounded-full bg-blue-400">Blue</div>
    </div>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const example2 = await highlightCode(`
<script>
  import { Presentation, Slide } from '@components'
</script>

<Presentation>
  <Slide>
      <div class="circles">
        <div class="circle red">Red</div>
        <div class="circle green">Green</div>
        <div class="circle blue">Blue</div>
      </div>
  </Slide>
</Presentation>

<style>
  .circles {
    width: 800px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    color: #111827;
  }

  .circle {
    width: 240px;
    height: 240px;
    display: grid;
    place-content: center;
    rounded: 9999px;
  }

  .red {
    background-color: #f87171;
  }

  .green {
    background-color: #4ade80;
  }

  .blue {
    background-color: #1e3a8a;
  }
</style>
`.trim(), 'svelte')

const examples = [example1, example2]

export default examples