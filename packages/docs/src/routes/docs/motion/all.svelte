<script lang="ts">
	import { Embed as Presentation, Slide, Action } from '@animotion/core'
	import { tween, all } from '@animotion/motion'

	let circle = tween({ x: 0, y: 100, r: 80, fill: '#00ffff' })
	let text = tween({ count: 0 })

	async function animate() {
		await all(circle.to({ x: 600, fill: '#ffff00' }), text.to({ count: 600 }))
		await all(circle.to({ x: 0, fill: '#00ffff' }), text.to({ count: 0 }))
	}
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<svg width="800" height="200" viewBox="-100 0 800 200">
			<circle cx={circle.x} cy={circle.y} r={circle.r} fill={circle.fill} />

			<text
				x={circle.x}
				y={circle.y}
				font-family="Monaspace Neon"
				font-size={circle.r * 0.4}
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{text.count.toFixed(0)}
			</text>
		</svg>

		<Action do={animate} />
	</Slide>
</Presentation>
