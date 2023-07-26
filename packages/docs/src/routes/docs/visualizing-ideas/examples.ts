import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Presentation, Slide, Code } from '@components'

  let centerX = 200
  let centerY = 200
  let r = 40
  let offset = 4
  let cx = 200 + r * offset
  let cy = 200
  let angle = 0
  let speed = 0.04
  let animate = false

  function circle() {
    cx = centerX + Math.cos(angle) * r * offset
    cy = centerY + Math.sin(angle) * r * offset
    angle += speed

    if (animate) {
      requestAnimationFrame(circle)
    }
  }

  function play() {
    animate = true
    circle()
  }

  function stop() {
    animate = false
  }
</script>

<Presentation>
  <Slide animate>
    <div class="w-[1020px]">
      <Code lang="svelte" lines="1-3|1,3|2">
        {\`
          <svg width="400" height="400">
            <circle cx="200" cy="200" r="100" fill="aqua" />
          </svg>
        \`}
      </Code>
    </div>
  </Slide>

  <Slide animate>
    <div class="w-[1020px]">
      <Code lang="svelte">
        {\`
          <svg width="400" height="400">
            <circle cx="200" cy="200" r="100" fill="aqua" />
          </svg>
        \`}
      </Code>
    </div>

    <div data-id="circle" class="mx-auto mt-[48px] w-[400px] rounded-2xl bg-gray-800">
      <svg width="400" height="400">
        <circle cx="200" cy="200" r="100" fill="aqua" />
      </svg>
    </div>
  </Slide>

  <Slide animate>
    <div class="flex">
      <div class="absolute left-[-14%] w-[1020px]">
        <Code lang="ts" lines="1,8|3|5|7|1-8">
          {\`
            function animateCircle() {
              // update x position
              cx = centerX + Math.cos(angle) * r
              // update y position
              cy = centerY + Math.sin(angle) * r
              // request animation frame
              requestAnimationFrame(animateCircle)
            }
          \`}
        </Code>
      </div>

      <div data-id="circle" class="absolute right-[-14%] w-[400px] bg-gray-800">
        <svg width="400" height="400">
          <circle cx="200" cy="200" r="100" fill="aqua" />
        </svg>
      </div>
    </div>
  </Slide>

  <Slide
    animate
    on:in={() => play()}
    on:out={() => stop()}
  >
    <div class="absolute top-[160px] w-[400px]">
      <Code lang="ts" offset="10">
        {\`
          animateCircle()
        \`}
      </Code>
    </div>

    <div data-id="circle" class="absolute left-[50%] w-[400px] bg-gray-800">
      <svg width="400" height="400">
        <circle cx="200" cy="200" r={r * offset} fill="none" stroke="white" stroke-width="2" />
        <circle {cx} {cy} {r} fill="aqua" />
      </svg>
    </div>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const example2 = await highlightCode(`
<script>
  import { Presentation, Slide } from '@components'

  let visible = false
</script>

<Presentation>
  {#if visible}
    <!-- example -->
  {/if}

  <Slide
    on:in={() => visible = true}
    on:out={() => visible = false}
  >
    <!-- slide with example -->
  </Slide>

  <Slide>
    <!-- new slide -->
  </Slide>
</Presentation>
`.trim(), 'svelte')

const examples = [example1, example2]

export default examples