<script lang="ts">
	import { Embed as Presentation, Slide, Transition } from '@animotion/core'

	let items = $state([1, 2, 3, 4])
	let layout = $state('flex gap-4')
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<Transition>
			<div class={layout} style="--gap: var(--size-2)">
				{#each items as item, i (item)}
					<Transition
						class="grid h-[180px] w-[180px] place-content-center rounded-2xl border-t-2 border-white bg-gray-200 text-6xl font-semibold text-black shadow-2xl"
						enter="rotate"
						visible
					>
						{item}
					</Transition>
				{/each}
			</div>
		</Transition>

		<Transition do={() => (layout = 'grid grid-cols-2 grid-rows-2 gap-4')} />
		<Transition do={() => (items = [4, 3, 2, 1])} />
		<Transition do={() => (items = [2, 1, 4, 3])} />
		<Transition do={() => (items = [4, 3, 2, 1])} />
		<Transition do={() => (items = [1, 2, 3, 4])} />
		<Transition do={() => (layout = 'flex gap-4')} />
	</Slide>
</Presentation>
