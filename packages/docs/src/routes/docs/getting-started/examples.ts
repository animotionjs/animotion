import { highlightCode } from '$lib/components/shiki.server'

const example1 = await highlightCode(`npm install -g pnpm`, 'text')
const example2 = await highlightCode(`npm create @animotion`, 'text')
const example3 = await highlightCode(`
┌ Welcome to Animotion!
│
◇ Where should I create your project?
│  (press Enter to use the current directory)
│
◇ Install dependencies? (requires pnpm)
│  Yes
│
◇ Installed dependencies.
│
└  Done. 🪄

💿️ Start the development server:
pnpm run dev

💬 Discord
https://joyofcode.xyz/invite
`, 'text')
const example4 = await highlightCode(`pnpm i`, 'text')
const example5 = await highlightCode(`pnpm run dev`, 'text')

const examples = [ example1, example2, example3, example4, example5]

export default examples