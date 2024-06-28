# Transitions

## Layout animations

You can use the `<Transition>` component to animate elements across slides thanks to the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API).


```svelte
<script>
	import { Presentation, Slide, Transition } from '@animotion/core'

	let text
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<Transition>
			<p bind:this={text} class="text-8xl font-bold drop-shadow-sm">🪄 Animotion</p>
		</Transition>

		<Transition do={() => text.classList.replace('text-8xl', 'text-6xl')} class="mt-16">
			<img class="w-[600px] rounded-lg shadow-lg" src="./nod-of-approval.gif" />
		</Transition>
	</Slide>
</Presentation>
```