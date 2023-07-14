import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Presentation, Slide } from '@components'
</script>

<Presentation>
  <Slide animate>
    <p class="text-[100px]">Magic</p>
  </Slide>

  <Slide animate>
    <p class="text-[200px] text-teal-300">Magic</p>
  </Slide>

  <Slide animate>
    <p class="text-[200px]">🪄</p>
    <p class="mt-[48px] text-[200px] text-teal-300">Magic</p>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const example2 = await highlightCode(`
<script>
  import { Presentation, Slide } from '@components'
</script>

<Presentation>
  <Slide animate>
    <div class="mx-auto flex w-[800px] justify-between text-gray-900">
      <div
        data-id="circle-1"
        class="grid h-[240px] w-[240px] place-content-center rounded-full bg-red-400"
      >
        Red
      </div>

      <div
        data-id="circle-2"
        class="grid h-[240px] w-[240px] place-content-center rounded-full bg-green-400"
      >
        Green
      </div>

      <div
        data-id="circle-3"
        class="grid h-[240px] w-[240px] place-content-center rounded-full bg-blue-400"
      >
        Blue
      </div>
    </div>
  </Slide>

  <Slide animate>
    <div class="mx-auto flex w-[800px] justify-between text-gray-900">
      <div
        data-id="circle-3"
        class="grid h-[240px] w-[240px] place-content-center rounded-full bg-blue-400"
      >
        Blue
      </div>

      <div
        data-id="circle-2"
        class="mt-[200px] grid h-[240px] w-[240px] place-content-center rounded-full bg-green-400"
      >
        Green
      </div>
      
      <div
        data-id="circle-1"
        class="grid h-[240px] w-[240px] place-content-center rounded-full bg-red-400"
      >
        Red
      </div>
    </div>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const example3 = await highlightCode(`
<script>
  import { Presentation, Slide } from '@components'
</script>

<Presentation>
  <Slide animate>
    <div
      data-id="container"
      class="h-[600px] w-[50%] overflow-hidden rounded-2xl"
    >
      <div data-id="color-1" class="h-[40%] bg-gray-400" />
      <div data-id="colors" class="grid h-[60%] gap-14 bg-gray-100 p-8">
        <div data-id="color-2" class="w-full bg-gray-400" />
        <div data-id="color-3" class="w-full bg-gray-600" />
        <div data-id="color-4" class="w-full bg-gray-800" />
      </div>
    </div>
  </Slide>

  <Slide animate>
    <div
      data-id="container"
      class="h-[600px] w-[100%] overflow-hidden rounded-2xl"
    >
      <div data-id="color-1" class="h-[40%] bg-teal-400" />
      <div data-id="colors" class="grid h-[60%] gap-14 bg-gray-100 p-8">
        <div data-id="color-2" class="w-full bg-teal-400" />
        <div data-id="color-3" class="w-full bg-teal-600" />
        <div data-id="color-4" class="w-full bg-teal-800" />
      </div>
    </div>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const example4 = await highlightCode(`
<script>
  import { Presentation, Slide } from '@components'
</script>

<Presentation>
  <!-- Group A -->
  <Slide animate>
    <p class="">Group A</p>
  </Slide>

  <Slide animate>
    <p class="text-red-400">Group A</p>
  </Slide>

  <!-- Group B -->
  <Slide animate animateId="two">
    <p>Group B</p>
  </Slide>

  <Slide animate animateId="two">
    <p class="text-green-400">Group B</p>
  </Slide>

  <!-- Group C -->
  <Slide animate animateId="two" animateRestart>
    <p>Group C</p>
  </Slide>

  <Slide animate animateId="two">
    <p class="text-blue-400">Group C</p>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const examples = [example1, example2, example3, example4]

export default examples