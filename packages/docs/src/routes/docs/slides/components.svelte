<script lang="ts">
	import { Embed as Presentation, Slide } from '@animotion/core'
	import { tween } from '@animotion/motion'

	let progress = tween(0)

	async function animate() {
		await progress.to(1_000_000)
	}
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<button onclick={animate} class="text-[100px] font-semibold">
			{progress.current.toLocaleString('en', { maximumFractionDigits: 0 })}
		</button>
		<p class="mt-8 opacity-50">click to animate</p>
	</Slide>
</Presentation>
