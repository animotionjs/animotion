# File-based slides

You can have slides in one file or split them into multiple files by default, but Animotion also provides a file-based slides option during the setup if you want the slides to be managed for you.

## Using File-based Slides

This is how you create slides using the default setup:

```svelte
<!-- routes/+page.svelte -->
<script>
	import { Presentation, Slide } from '@animotion/core'
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<p class="text-8xl font-bold drop-shadow-sm">🪄 Animotion</p>
	</Slide>
  
	<Slide class="h-full place-content-center place-items-center">
		<img class="rounded-lg drop-shadow-sm" src="/nod-of-approval.gif" />
	</Slide>
</Presentation>
```

This is how you create slides using file-based slides:

```svelte
<!-- slides/100/slide.svelte -->
<p class="text-8xl font-bold drop-shadow-sm">🪄 Animotion</p>
```

```svelte
<!-- slides/200/slide.svelte -->
<img class="rounded-lg drop-shadow-sm" src="/nod-of-approval.gif" />
```

You can number the slides however you want since slides are sorted lowest to highest based on the number — another benefit of file-based slides is that you can have assets related to the slide in the same folder.

## Passing Props

If you need to pass props to the `<Slide>` use `<script module>`:

```svelte
<script module>
	import { defineProps } from '@animotion/core'

	export const props = defineProps({
		in: () => alert('in'),
		out: () => alert('out')
	})
</script>

<!-- /slides/100/slide.svelte -->
<p class="text-8xl font-bold drop-shadow-sm">🪄 Animotion</p>
```

For regular imports use the `<script>` tag:

```svelte
<script module>
	import { defineProps } from '@animotion/core'

	export const props = defineProps({
    in: () => alert('in'),
    out: () => alert('out')
	})
</script>

<script>
  import { Transition } from '@animotion/core'
</script>

<!-- slides/100/slide.svelte -->
<Transition>
  <p class="text-8xl font-bold drop-shadow-sm">🪄 Animotion</p>
</Transition>
```


## File-Based Slides Setup

You can also set up file-based slides yourself by copying this code inside `src/routes/+page.svelte`:

```svelte
<!-- routes/+page.svelte -->
<script>
	import { Presentation, Slides } from '@animotion/core'
</script>

<Presentation
	options={{
		history: true,
		transition: 'slide',
		controls: false,
		progress: true,
	}}
>
	<Slides center={true} />
</Presentation>
```

After that you can create slides inside the `src/slides` folder.