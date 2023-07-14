import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
<script>
  import { Presentation, Slide, Stack, Step } from '@components'
</script>

<Presentation>
  <Slide>
    <Stack>
      <img src="https://place-puppy.com/400x400" />

      <Step>
        <img src="https://place-puppy.com/500x300" />
      </Step>

      <Step>
        <img src="https://place-puppy.com/300x340" />
      </Step>
    </Stack>
  </Slide>
</Presentation>
`.trim(), 'svelte')

const examples = [example1]

export default examples