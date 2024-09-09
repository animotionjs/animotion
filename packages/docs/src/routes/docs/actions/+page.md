<script lang="ts">
	import Actions from './actions.svelte'
</script>

# Actions

## Tying everything together

You can use the `<Action>` component to step through the presentation, and run code that updates the presentation:

<Actions />

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
					let count = $state(0)
				<\/script>

				<button onclick={() => count++}>
					{count}
				</button>
      `}
		/>

		<Action do={() => code.selectLines`2`} />
		<Action do={() => code.selectToken`5 count ++`} />
		<Action do={() => code.selectToken`{count}`} />
		<Action do={() => code.selectLines`*`} />
	</Slide>
</Presentation>
```