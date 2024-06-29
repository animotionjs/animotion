<script lang="ts">
	import CodeBlock from './code.svelte'
</script>

# Code

## Animating code

The `<Code>` component uses [Shiki](https://shiki.style/) for beautiful syntax highlighting, and [Shiki Magic Move](https://shiki-magic-move.netlify.app/) for animating the code:

<CodeBlock />

```svelte
<script lang="ts">
	import { Embed as Presentation, Slide, Code, Action } from '@animotion/core'

	let code: Code
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<Code
			class="w-[480px]"
			bind:this={code}
			lang="svelte"
			theme="poimandres"
			code={`
				<script>
					let count = 0
					$: double = count * 2
				<\/script>

				<button on:click={() => count++}>
					{double}
				</button>
			`}
			options={{ duration: 1000, stagger: 0.3, containerStyle: false }}
		/>

		<Action
			do={() =>
				code.update`
					<script>
						let count = $state(0)
						let double = $derived(count * 2)
					<\/script>

					<button onclick={() => count++}>
						{double}
					</button>
				`}
		/>

		<Action do={() => code.selectLines`2,3`} />
		<Action do={() => code.selectLines`2-3,7`} />
		<Action do={() => code.selectToken`double {double}`} />
		<Action do={() => code.selectLines`*`} />
	</Slide>
</Presentation>
```

## Escape closing tags

Having a closing tag like `</script>` in your code block is going to cause problems because Svelte thinks you're trying to close the `<script>` tag in your component. To solve this problem use the backslash character to escape it:

```svelte
<Code>
  code={`
    <script>
      // ...
    <\/script>
  `}
<Code>
```
