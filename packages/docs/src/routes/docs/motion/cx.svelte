<script lang="ts">
	import { Embed as Presentation, Slide } from '@animotion/core'
	import { signal } from '@animotion/motion'

	let cx = signal(0)

	async function animate() {
		await cx.to(400).to(0)
	}
</script>

<Presentation>
	<Slide in={animate}>
		<svg viewBox="0 0 400 400">
			<circle cx={$cx} cy={200} r={100} fill="#00ffff" />
		</svg>
	</Slide>
</Presentation>
