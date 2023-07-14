import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`npm install -g pnpm`, 'text')
const example2 = await highlightCode(`npm create keynote`, 'text')
const example3 = await highlightCode(`pnpm i`, 'text')
const example4 = await highlightCode(`pnpm run dev`, 'text')

const examples = [ example1, example2, example3, example4]

export default examples