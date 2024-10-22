<script lang="ts">
	import Actions from './actions.svelte'
</script>

# Actions

## Control the presentation

You can use the `<Action>` component to step through the presentation, and run code that updates the presentation:

<Actions />

```svelte
<script lang="ts">
	import { Presentation, Slide, Code, Action } from '@animotion/core'

	let code: ReturnType<typeof Code>
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

## Multiple actions

Instead of having to define each action separately, you can use the `actions` prop to define multiple actions.

```svelte
<Action
	undo={() => {
		example.selectLines`*`
	}}
	actions={[
		() => example.selectLines`2`,
		() => example.selectLines`5 count ++`,
		() => example.selectLines`{count}`,
		() => example.selectLines`*`
	]}
/>
```

## Undo

You can pass an optional `undo` prop with a callback to the `<Action>` component that runs when you go back a step if you need to revert to some previous state:

```svelte
<Action
	do={() => /* ... */}
	undo={() => /* ... */}
/>
```