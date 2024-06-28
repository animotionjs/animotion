# Actions

## Lights, camera, action

You can use the `<Action>` component to step through the presentation, and run some code that updates the presentation.


```svelte
<script>
	import { Presentation, Slide, Code, Transition, Action } from '@animotion/core'
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<Transition>
			<Code ...>
		</Transition>

    <Action do={() => code.selectLines`2`} />
    <Action do={() => code.selectToken`5 count ++`} />
    <Action do={() => code.selectToken`{count}`} />
    <Action do={() => code.selectLines`*`} />
	</Slide>
</Presentation>
```