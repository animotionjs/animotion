# Code blocks

## Animating code

You can use the `<Code>` component which uses [Shiki](https://shiki.style/) for beautiful syntax highlighting.

```svelte
<script lang="ts">
	import { Presentation, Slide, Code, Transition, Action } from '@animotion/core'
	import { tween } from '@animotion/motion'

	let code: Code
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<Transition>
			<Code
				bind:this={code}
				lang="svelte"
				theme="poimandres"
				code={`
					<script>
						let count = 0
						$: double = count * 2
					</script>

					<button on:click={() => count++}>
						{double}
					</button>
				`}
				options={{ duration: 600, stagger: 0.3 }}
			/>
		</Transition>

		<Action do={() =>
			code.selectLines`
				<script>
					let count = $state(0)
					let double = $derived(count * 2)
				</script>

				<button onclick={() => count++}>
					{double}
				</button>
			`
		}/>

		<Action do={() => code.selectLines`2,3`} />
		<Action do={() => code.selectLines`2-3,7`} />
		<Action do={() => code.selectToken`double {double}`} />
		<Action do={() => code.selectToken`double *`} />
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
