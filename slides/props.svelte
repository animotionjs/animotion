<Slide animate>
  <Code lang="svelte">
    {`
        <!-- 👍️ -->
        <Shape circle={{ cx: 100, cy: 100, r: 50 }} />
      `}
  </Code>
</Slide>

<Slide animate>
  <Code lang="svelte">
    {`
        <!-- 👍️ -->
        <Shape
          circle={{ cx: 100, cy: 100, r: 50 }}
        />
      `}
  </Code>
</Slide>

<Slide animate>
  <Code lang="svelte" lines="4|1-5">
    {`
        <!-- 💩 -->
        <Shape
          circle={{ cx: 100, cy: 100, r: 50 }}
          rect={{ width: 100, height: 100 }}
        />
      `}
  </Code>
</Slide>

<Slide animate>
  <Code lang="svelte" lines="2-3|5-7|10-16|4">
    {`
      <script lang="ts">
        type CircleAttr = { cx: number; cy: number; r: number }
        type RectAttr = { width: number; height: number }

        export let circle: CircleAttr = null
        export let rect: RectAttr = null
        export let fill = 'aqua'
      <\/script>

      <svg viewBox="0 0 200 200">
        {#if circle}
          <circle {...circle} {fill} />
        {:else if rect}
          <rect {...rect} {fill} />
        {/if}
      </svg>
      `}
  </Code>
</Slide>

<Slide animate>
  <Code lang="svelte" lines="5">
    {`
      <script lang="ts">
        type CircleAttr = { cx: number; cy: number; r: number }
        type RectAttr = { width: number; height: number }

        type Circle = { circle: CircleAttr; rect?: never }

        export let circle: CircleAttr = null
        export let rect: RectAttr = null
        export let fill = 'aqua'
      <\/script>

      <svg viewBox="0 0 200 200">
        {#if circle}
          <circle {...circle} {fill} />
        {:else if rect}
          <rect {...rect} {fill} />
        {/if}
      </svg>
      `}
  </Code>
</Slide>

<Slide animate>
  <Code lang="svelte" lines="6">
    {`
      <script lang="ts">
        type CircleAttr = { cx: number; cy: number; r: number }
        type RectAttr = { width: number; height: number }

        type Circle = { circle: CircleAttr; rect?: never }
        type Rect = { rect: RectAttr; circle?: never }

        export let circle: CircleAttr = null
        export let rect: RectAttr = null
        export let fill = 'aqua'
      <\/script>

      <svg viewBox="0 0 200 200">
        {#if circle}
          <circle {...circle} {fill} />
        {:else if rect}
          <rect {...rect} {fill} />
        {/if}
      </svg>
      `}
  </Code>
</Slide>

<Slide animate>
  <Code lang="svelte" lines="8">
    {`
      <script lang="ts">
        type CircleAttr = { cx: number; cy: number; r: number }
        type RectAttr = { width: number; height: number }

        type Circle = { circle: CircleAttr; rect?: never }
        type Rect = { rect: RectAttr; circle?: never }
        
        type $$Props = Circle | Rect

        export let circle: CircleAttr = null
        export let rect: RectAttr = null
        export let fill = 'aqua'
      <\/script>

      <svg viewBox="0 0 200 200">
        {#if circle}
          <circle {...circle} {fill} />
        {:else if rect}
          <rect {...rect} {fill} />
        {/if}
      </svg>
      `}
  </Code>
</Slide>

<Slide animate>
  <Code lang="svelte">
    {`
        <Shape
          circle={{ cx: 100, cy: 100, r: 50 }}
          rect={{ width: 100, height: 100 }}
        />
      `}
  </Code>
</Slide>

<Slide
  animate
  on:active={() => {
    const el = document.querySelectorAll('.hljs-name')
    Array.from(el).forEach((el) => {
      el.classList.add('underline', 'decoration-wavy', 'decoration-red-400')
    })
  }}
>
  <Code lang="svelte">
    {`
        <!-- 👍️ -->
        <Shape
          circle={{ cx: 100, cy: 100, r: 50 }}
          rect={{ width: 100, height: 100 }}
        />
      `}
  </Code>
</Slide>
</Presentation>