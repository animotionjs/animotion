<script>
	import { Embed as Presentation, Slide, Transition } from '@animotion/core'

	const box =
		'grid h-[180px] w-[180px] place-content-center rounded-2xl border-t-2 border-white bg-gray-200 text-6xl font-semibold text-black shadow-2xl'
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<div class="mt-16 grid grid-cols-2 grid-rows-2 gap-4">
			<Transition class={box} order={1} enter="rotate">1</Transition>
			<Transition class={box} order={2} enter="rotate">2</Transition>
			<Transition class={box} order={3} enter="rotate">3</Transition>
			<Transition class={box} order={4} enter="rotate">4</Transition>
		</div>
	</Slide>
</Presentation>
