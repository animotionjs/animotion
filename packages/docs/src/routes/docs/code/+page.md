<script lang="ts">
	import CodeBlock from './code.svelte'
</script>

# Code

## Animating code

The `<Code>` component uses [Shiki](https://shiki.style/) for beautiful syntax highlighting, and [Shiki Magic Move](https://shiki-magic-move.netlify.app/) for animating the code:

<CodeBlock />

```svelte
<script lang="ts">
	import { Presentation, Slide, Code, Action } from '@animotion/core'

	let code: Code
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<Code
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

You can pick one of many themes that come with Shiki, choose a language, and provide options to the `<Code />` component.

## Animating Code Changes

You can animate changes in your code by using the `update` method:

```ts
code.update`
	<script>
		let count = $state(0)
		let double = $derived(count * 2)
	<\/script>

	<button onclick={() => count++}>
		{double}
	</button>
`}
```

Animotion uses [Shiki Magic Move](https://shiki-magic-move.netlify.app/) to animate the code changes which does the diffing to know what changed, and then animates the changes.

## Code Highlighting

You can highlight lines, and tokens in your code:

```ts
// select individual lines
code.selectLines`2,3`
// select ranges of lines, and individual lines
code.selectLines`2-3,7`
// select tokens
code.selectToken`double {double}`
// select all lines
code.selectLines`*`
```

You can also use `await` since the `<Code />` component methods return a promise. 

## Code Indentation

If you use tabs Animotion auto-indents your code for you:

```svelte
<script>
->let count = 0
->$: double = count * 2
</script>

<button on:click={() => count++}>
->{double}
</button>
```

If you want to opt-out of this feature, you can set `autoIndent` to false:


```svelte
<Code	autoIndent={false} />
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
