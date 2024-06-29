<script lang="ts">
	import Transition from './transition.svelte'
	import TransitionOrder from './order.svelte'
	import LayoutAnimation from './layout.svelte'
</script>

# Transitions

## Animating elements

You can use the `<Transition>` component to animate changes in your slide like magic:

<Transition />

```svelte
<script>
	import { Presentation, Slide, Transition } from '@animotion/core'

	let text: HTMLParagraphElement
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<Transition>
			<p bind:this={text} class="text-8xl font-bold drop-shadow-sm">
				🪄 Animotion
			</p>
		</Transition>

		<Transition
			do={() => text.classList.replace('text-8xl', 'text-6xl')}
			class="mt-16"
		>
			<img class="rounded-lg drop-shadow-sm" src="/nod-of-approval.gif" />
		</Transition>
	</Slide>
</Presentation>
```

The `<Transition>` component accepts the following props:

- `class`: styles to apply to the element
- `do`: callback function to change the DOM before animating the layout
- `order`: specify in which order the elements should transition
- `enter`: the animation to use for the transition
- `name`: view transition name (generates random name by default)

You have to use a Chromium based browser since the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) is not available in every browser yet.


You can change the default animation, or create your own animations inside `app.css` since transitions are just CSS animations:

```css
/* default animation */

.enter {
	animation: enter 0.6s var(--ease);
}

@keyframes enter {
	from {
		filter: blur(40px);
		scale: 0;
		translate: 0px 100vh;
	}
}

/* custom animation */

.rotate {
	animation: rotate 0.6s var(--ease);
}

@keyframes rotate {
	from {
		filter: blur(4px);
		scale: 2;
		rotate: -1turn;
	}
}
```

## Transition order

If the elements you want to transition are out of order in the DOM, you can use the `order` prop to specify the order which element should transition:

<TransitionOrder />

```svelte
<script>
	import { Presentation, Slide, Transition } from '@animotion/core'
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<div class="mt-16 grid grid-cols-2 grid-rows-2 gap-4">
			<Transition order={1} enter="rotate">1</Transition>
			<Transition order={2} enter="rotate">2</Transition>
			<Transition order={3} enter="rotate">3</Transition>
			<Transition order={4} enter="rotate">4</Transition>
		</div>
	</Slide>
</Presentation>
```

## Layout animations

You can use the `<Transition />` component to do layout animations:

<LayoutAnimation />

```svelte
<script lang="ts">
	import { Presentation, Slide, Transition } from '@animotion/core'

	let items = $state([1, 2, 3, 4])
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<div class="grid grid-cols-2 grid-rows-2 gap-4">
			{#each items as item (item)}
				<Transition class="grid h-[180px] w-[180px] place-content-center rounded-2xl border-t-2 border-white bg-gray-200 text-6xl font-semibold text-black shadow-2xl">
					{item}
				</Transition>
			{/each}
		</div>

		<Transition do={() => (items = [4, 3, 2, 1])} />
		<Transition do={() => (items = [2, 1, 4, 3])} />
		<Transition do={() => (items = [4, 3, 2, 1])} />
		<Transition do={() => (items = [1, 2, 3, 4])} />
	</Slide>
</Presentation>
```