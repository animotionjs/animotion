<script lang="ts">
	import { Embed as Presentation, Slide, Code } from '@animotion/core'
	import { signal } from '@animotion/motion'

	const circle = signal(
		{ x: 0, y: 50, r: 50, fill: '#00ffff' },
		{ duration: 2 }
	)

	async function moveCircleRight() {
		await circle.to({ x: 400, fill: '#ffff00' })
	}

	async function moveCircleLeft() {
		await circle.to({ x: 0, fill: '#00ffff' })
	}

	function resetAnimation() {
		circle.reset()
	}
</script>

<Presentation>
	<Slide class="text-[54px]">
		<Code
			id="steps"
			lang="ts"
			lines="1,4|2|3|1-4"
			steps={{
				'2': moveCircleRight,
				'3': moveCircleLeft,
				'1-4': resetAnimation
			}}
		>
			{`
				async function animate() {
					await circle.to({ x: 400, fill: '#ffff00' })
					await circle.to({ x: 0, fill: '#00ffff' })
				}
      `}
		</Code>

		<svg viewBox="-50 0 500 100" class="mt-32 mx-auto">
			<circle cx={$circle.x} cy={$circle.y} r={$circle.r} fill={$circle.fill} />
			<text
				x={$circle.x}
				y={$circle.y}
				font-family="JetBrains Mono"
				font-size={$circle.r * 0.4}
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{$circle.x.toFixed(0)}
			</text>
		</svg>
	</Slide>
</Presentation>
