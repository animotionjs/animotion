<script lang="ts">
	import { Embed as Presentation, Slide, Transition } from '@animotion/core'

	let text: HTMLParagraphElement
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<Transition visible>
			<p bind:this={text} class="text-8xl font-bold drop-shadow-sm">🪄 Animotion</p>
		</Transition>

		<Transition do={() => text.classList.replace('text-8xl', 'text-6xl')} class="mt-16">
			<img
				class="w-[400px] rounded-lg drop-shadow-sm"
				src="https://c.tenor.com/J5A9wZzn3ZYAAAAd/tenor.gif"
				alt="Nod of approval"
			/>
		</Transition>
	</Slide>
</Presentation>
