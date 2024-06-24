<script lang="ts">
	import { Presentation, Slide, Code, Transition, Action } from '$lib/index.js'

	let text: HTMLParagraphElement
	let code: Code
	let boxes = $state([1, 2, 3, 4])
</script>

<!--
	`<Transition />` and `<Action />` are just steps
	so you can use arrow keys to step through the slide:

	`<Transition />` animates the layout and accepts:
		- `do` (optional) callback
		- `name` (optional)	for the transition
		- `order` (optional) option	to specify the step order
		- `transition` (optional)	for custom CSS transitions
		- `class` (optional)	for styling
	
	`<Action />` is just a step like `<Transition />` which:
		- only exists to run arbitrary code
		- doesn't animate the layout
		- is mostly a `<Transition />` alternative using absolute positioning
			to not affect the layout because they're both `<div>` elements
-->

<Presentation options={{ transition: 'slide', controls: true, progress: true, hash: false }}>
	<Slide class="h-full place-content-center place-items-center">
		<Transition>
			<p bind:this={text} class="text-8xl font-bold drop-shadow-sm">🪄 Animotion</p>
		</Transition>

		<Transition do={() => text.classList.replace('text-8xl', 'text-6xl')} class="mt-16">
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
		</Transition>

		<Action do={() => code.selectLines`2,3`} />
		<Action do={() => code.selectLines`2`} />
		<Action do={() => code.selectLines`3`} />
		<Action do={() => code.selectToken`double {double}`} />

		<Action
			do={async () => {
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
		/>
	</Slide>

	<Slide class="h-full place-content-center place-items-center">
		<Transition>
			<h1>Transitions</h1>
		</Transition>

		<div class="mt-16 grid grid-cols-2 grid-rows-2 gap-4">
			{#each boxes as box (box)}
				<Transition
					transition="rotate"
					class="grid h-[200px] w-[200px] place-content-center rounded-2xl border-t-2 border-white bg-gray-200 font-semibold text-black shadow-2xl"
				>
					{box}
				</Transition>
			{/each}
		</div>

		<Transition do={() => (boxes = [4, 3, 2, 1])} />
		<Transition do={() => (boxes = [2, 1, 4, 3])} />
		<Transition do={() => (boxes = [4, 3, 2, 1])} />
		<Transition do={() => (boxes = [1, 2, 3, 4])} />
	</Slide>

	<Slide class="h-full place-content-center place-items-center">
		<Transition>
			<p class="text-8xl font-bold drop-shadow-sm">🪄 Fin</p>
		</Transition>
	</Slide>
</Presentation>
