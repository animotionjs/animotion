<script lang="ts">
	import { Embed as Presentation, Slide, Step } from '@animotion/core'
	import { signal, all } from '@animotion/motion'

	let circle = signal({ x: 0, y: 100, r: 100, fill: '#00ffff' })
	let text = signal({ count: 0 })

	async function animate() {
		all(
			circle.to({ x: 600, fill: '#ffff00' }).to({ x: 0, fill: '#00ffff' }),
			text.to({ count: 600 }).to({ count: 0 })
		)
	}
</script>

<Presentation>
	<Slide>
		<Step in={animate} />

		<svg viewBox="-100 0 800 200">
			<circle cx={$circle.x} cy={$circle.y} r={$circle.r} fill={$circle.fill} />

			<text
				x={$circle.x}
				y={$circle.y}
				font-family="JetBrains Mono"
				font-size={$circle.r * 0.4}
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{$text.count.toFixed(0)}
			</text>
		</svg>
	</Slide>
</Presentation>
