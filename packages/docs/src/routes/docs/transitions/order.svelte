<script>
	import { Embed as Presentation, Slide, Transition } from '@animotion/core'

	const box =
		'grid h-[180px] w-[180px] place-content-center rounded-2xl border-t-2 border-white bg-gray-200 text-6xl font-semibold text-black shadow-2xl'
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<div class="grid grid-cols-2 grid-rows-2 gap-4">
			<Transition class={box} order={4}>1</Transition>
			<Transition class={box} order={3}>2</Transition>
			<Transition class={box} order={2}>3</Transition>
			<Transition class={box} order={1} visible>4</Transition>
		</div>
	</Slide>
</Presentation>
