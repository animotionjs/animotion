import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`
const options = {
  // bring your own layout
  disableLayout: true,
  // display mode used to show slides
  display: 'grid'
}
`.trim(), 'ts')

const examples = [example1]

export default examples