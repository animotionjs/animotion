<script lang="ts">
	import Transition from './transition.svelte'
	import TransitionOrder from './order.svelte'
	import LayoutAnimation from './layout-animation.svelte'
</script>

# Transitions

> ⚠️ Animotion uses the [View Transitions API (single document)](https://caniuse.com/view-transitions) which is Baseline newly available since Oct 2025. The core presentation features still work in older browsers, but they might not show all transitions.

## Animating elements

You can use the `<Transition>` component to animate changes in your slide like magic:

<Transition />

```svelte
<script lang="ts">
	import { Presentation, Slide, Transition } from '@animotion/core'

	let text: HTMLParagraphElement
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<Transition visible>
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

## How Transitions Work

Animotion uses the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) to animate the layout of your slides.

The `<Transition>` component is a `<div>` wrapper with a unique `view-transition-name` name, so the browser knows what element should transition after the DOM changed:

```svelte
<div style="view-transition-name: name">
	<!-- ... -->
</div>
```

You can use the `<Transition>` component purely as a layout animation trigger without having to pass any children:

```svelte
<Transition do={() => /* code that causes DOM change */ } />
```

Animotion is going to run the function passed to the `do` prop before animating the layout, and invoke the `startViewTransition()` method on the document.

This is very useful for revealing or hiding elements like a code block and its output:

```svelte
<script>
	import { Code, Slide, Transition } from '@animotion/core'
	import Example from './example.svelte'

	let state = $state('none')
</script>

<Slide>
	{#if state === 'code'}
		<Transition visible>
			<Code />
		</Transition>
	{/if}

	{#if state === 'output'}
		<Transition visible>
			<Example />
		</Transition>
	{/if}

	<Transition do={() => state = 'code'}>
	<Transition do={() => state = 'output'}>
</Slide>
```

In this example we use the `visible` prop to show the element by default, so we can smoothly animate the layout when `state` changes using `<Transition>` as a layout animation trigger.

If you don't want the `<Transition>` element to affect the layout when using it between elements, you can use the `hidden` prop to hide it:

```svelte
<!-- content -->
<Transition do={() => /* code that causes DOM change */ } hidden />
<!-- content -->
```

## Custom Entry And Exit Transitions

You can find the default view transition styles in `app.css`:

```css
/* view transitions */
html {
	view-transition-name: none;
}

/* all view transitions */
::view-transition-group(*) {
	animation-duration: var(--view-transition-duration);
	animation-timing-function: var(--ease);
}

/* entry transition */
::view-transition-new(*):only-child {
	animation: scale-in var(--view-transition-duration) var(--ease);
}

/* exit transition */
::view-transition-old(*):only-child {
	animation: scale-out var(--view-transition-duration) var(--ease);
}

@keyframes scale-in {
	from {
		scale: 0;
		opacity: 0;
	}
}

@keyframes scale-out {
	to {
		scale: 0;
		opacity: 0;
	}
}
```

You can create your own entry and exit animations inside `app.css`:

```css
@keyframes rotate {
	from {
		opacity: 0;
	}
	20% {
		rotate: 0deg;
	}
	40% {
		opacity: 1;
	}
	to {
		rotate: 360deg;
	}
}
```

...then pass the animation to the `entry` and `exit` props of the `<Transition>` component, including the `duration` and `delay` in seconds:

```svelte
{#each items as item, i}
	<Transition
		entry="rotate"
		exit="scale-out"
		duration={1}
		delay={i * 0.1}
		visible
	/>
{/each}
```

## Transition order

You can use the `order` prop to specify the order in which the elements should transition:

<TransitionOrder />

```svelte
<script>
	import { Presentation, Slide, Transition } from '@animotion/core'
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<div class="grid grid-cols-2 grid-rows-2 gap-4">
			<Transition order={4}>1</Transition>
			<Transition order={3}>2</Transition>
			<Transition order={2}>3</Transition>
			<Transition order={1} visible>4</Transition>
		</div>
	</Slide>
</Presentation>
```

## Layout animations

You can do impossible layout animations, like animating between a `flex` and `grid` layout among other things — the only thing you have to do is change the DOM, and leave the rest to Animotion:

<LayoutAnimation />

```svelte
<script>
	import { Presentation, Slide, Transition } from '@animotion/core'

	let items = $state([1, 2, 3, 4])
	let layout = $state('flex gap-4')
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<div class={layout}>
			{#each items as item (item)}
				<Transition
					class="grid h-[180px] w-[180px] place-content-center rounded-2xl border-t-2 border-white bg-gray-200 text-6xl font-semibold text-black shadow-2xl"
					visible
				>
					{item}
				</Transition>
			{/each}
		</div>

		<!-- you can pass a transitions array for convenience -->
		<Transition
			transitions={[
				() => layout = 'grid grid-cols-2 grid-rows-2 gap-4',
				() => items = [4, 3, 2, 1],
				() => items = [2, 1, 4, 3],
				() => items = [4, 3, 2, 1],
				() => items = [1, 2, 3, 4],
				() => layout = 'flex gap-4'
			]}
		/>
	</Slide>
</Presentation>
```