<script lang="ts">
	import { Presentation, Slide, Code, transition, action } from '$lib/index.js'
	import type Reveal from 'reveal.js'

	const options: Reveal.Options = {
		display: 'grid',
		disableLayout: true,
		transition: 'slide',
		controls: true,
		progress: true,
		hash: false
	}

	let text: HTMLParagraphElement
	let code: Code
	let boxes = $state([1, 2, 3, 4])
</script>

<!--
	`use:transition` and `use:action` are just steps
	so you can use arrow keys to step through	the slide:

	`transition` animates the layout and accepts:
		- `action` (optional) callback
		- `name` (optional)	for the transition
		- `order` (optional) option	to specify the step order
		- `transition` (optional)	for custom CSS transitions
	
	`action` is just a step like `transition`:
		- doesn't animate the layout
		- mostly exists as `transition` alternative but	uses
			absolute positioning to not affect the layout
-->

<Presentation {options}>
	<Slide class="h-full place-content-center place-items-center">
		<div use:transition>
			<p bind:this={text} class="text-8xl font-bold drop-shadow-sm">🪄 Animotion</p>
		</div>

		<div
			use:transition={{
				action: () => {
					// change the DOM and animate the layout
					text.classList.replace('text-8xl', 'text-6xl')
				}
			}}
			class="mt-16"
		>
			<Code
				bind:this={code}
				lang="svelte"
				theme="poimandres"
				code={`
					<script>
						let count = 0
						let double = count * 2
					<\/script>

					<button on:click={() => count++}>
						{double}
					</button>
				`}
				options={{ duration: 1, stagger: 0.3, containerStyle: false }}
			/>
		</div>

		<!-- run arbitrary code -->
		<div use:action={() => code.selectLines`2`}></div>
		<div use:action={() => code.selectLines`3`}></div>
		<div use:action={() => code.selectToken`double {double}`}></div>

		<!-- code returns promise -->
		<div
			use:action={async () => {
				await code.selectLines`*`
				await code.update`
					<script>
						let count = $state(0)
						let double = $derived(count * 2)
					<\/script>

					<button onclick={() => count++}>
						{double}
					</button>
				`
			}}
		></div>
	</Slide>

	<Slide class="h-full place-content-center place-items-center">
		<h1 use:transition>Shuffle</h1>

		<div class="mt-16 grid grid-cols-2 grid-rows-2 gap-4">
			{#each boxes as box (box)}
				<!-- custom CSS transition -->
				<div
					use:transition={{ transition: 'rotate' }}
					class="grid h-[200px] w-[200px] place-content-center rounded-2xl bg-gray-100 font-semibold text-black shadow-2xl"
				>
					{box}
				</div>
			{/each}
		</div>

		<div use:transition={{ action: () => (boxes = [4, 3, 2, 1]) }}></div>
		<div use:transition={{ action: () => (boxes = [2, 1, 4, 3]) }}></div>
		<div use:transition={{ action: () => (boxes = [4, 3, 2, 1]) }}></div>
		<div use:transition={{ action: () => (boxes = [1, 2, 3, 4]) }}></div>
	</Slide>

	<Slide class="h-full place-content-center place-items-center">
		<div use:transition>
			<p class="text-8xl font-bold drop-shadow-sm">🪄 Fin</p>
		</div>
	</Slide>
</Presentation>
