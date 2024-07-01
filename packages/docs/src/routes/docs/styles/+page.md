<script lang="ts">
	import Tailwind from './tailwind.svelte'
</script>

# Styling

## Using Tailwind CSS

You have complete control over unstyled elements using Tailwind:

<Tailwind />

```svelte
<script>
	import { Presentation, Slide } from '@animotion/core'

	let circle = 'grid h-[200px] w-[200px] place-content-center rounded-full'
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<div class="flex gap-8 font-semibold text-gray-900">
			<div class="{circle} bg-red-400">red</div>
			<div class="{circle} bg-green-400">green</div>
			<div class="{circle} bg-blue-400">blue</div>
		</div>
	</Slide>
</Presentation>
```

Thanks to the Tailwind compiler you can pass arbitrary values surrounded by brackets like `h-[240px]` if the provided utility classes aren't enough.

If you enjoy Tailwind get the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension for VS Code to make your life easier. To keep things organized Animotion also sorts the Tailwind classes for you.

## Using regular CSS

You can write regular CSS inside a `<style>` tag in Svelte. Styles are scoped to the component, so you don't have to worry about the class name being unique:

```svelte
<script>
  import { Presentation, Slide } from '@animotion/core'
</script>

<Presentation>
  <Slide>
      <div class="circles">
        <div class="circle red">red</div>
        <div class="circle green">green</div>
        <div class="circle blue">blue</div>
      </div>
  </Slide>
</Presentation>

<style>
  .circles {
    display: flex;
    gap: 2rem;
    font-weight: 600;
    color: #111827;
  }

  .circle {
    width: 240px;
    height: 240px;
    display: grid;
    place-content: center;
    border-radius: 50%;
  }

  .red {
    background-color: #f87171;
  }

  .green {
    background-color: #4ade80;
  }

  .blue {
    background-color: #1e3a8a;
  }
</style>
```