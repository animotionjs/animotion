<script lang="ts">
	import { Presentation, Slide } from '$lib/animotion'
	import { signal } from '@animotion/motion'

	let progress = signal(0)

	async function animate() {
		await progress.to(1_000_000)
	}
</script>

<Presentation>
	<Slide>
		<div class="mt-8 text-[100px]">
			{$progress.toLocaleString('en', { maximumFractionDigits: 0 })}
		</div>
		<button onclick={animate} class="mt-16 p-8 bg-gray-700 rounded-2xl">
			animate
		</button>
	</Slide>
</Presentation>
