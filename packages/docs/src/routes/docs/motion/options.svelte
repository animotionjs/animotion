<script lang="ts">
	import { Embed as Presentation, Slide, Step } from '@animotion/core'
	import { tween } from '@animotion/motion'

	const circle = tween(
		{ x: 0, y: 100, r: 100, fill: '#00ffff' },
		{ duration: 1.5 }
	)

	async function animate() {
		await circle
			.to({ x: 600, fill: '#ffff00' }, { delay: 0.3 })
			.to({ x: 0, fill: '#00ffff' })
	}
</script>

<Presentation>
	<Slide>
		<Step in={animate} />

		<svg viewBox="-100 0 800 200">
			<circle cx={$circle.x} cy={$circle.y} r={$circle.r} fill={$circle.fill} />
		</svg>
	</Slide>
</Presentation>
