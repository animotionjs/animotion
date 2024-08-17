<script lang="ts">
	import { Embed as Presentation, Slide, Action } from '@animotion/core'
	import { tween } from '@animotion/motion'

	const circle = tween({ x: 0, y: 100, r: 80, fill: '#00ffff' }, { duration: 1500 })

	async function animate() {
		await circle.to({ x: 600, fill: '#ffff00' }, { delay: 300 })
		await circle.to({ x: 0, fill: '#00ffff' })
	}
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<svg width="800" height="200" viewBox="-100 0 800 200">
			<circle cx={circle.x} cy={circle.y} r={circle.r} fill={circle.fill} />
		</svg>

		<Action do={animate} />
	</Slide>
</Presentation>
