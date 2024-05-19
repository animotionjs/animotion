<script lang="ts">
	import { Embed as Presentation, Slide, Code } from '@animotion/core'
	import { signal } from '@animotion/motion'

	const circle = signal(
		{ x: 100, y: 100, r: 100, fill: '#00ffff' },
		{ duration: 2 }
	)

	async function moveCircleRight() {
		await circle.to({ x: 800, fill: '#ffff00' })
	}

	async function moveCircleLeft() {
		await circle.to({ x: 100, fill: '#00ffff' })
	}

	function resetAnimation() {
		circle.reset()
	}
</script>

<Presentation>
	<Slide class="text-[56px]">
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
					await circle.to({ x: 800, fill: '#ffff00' })
					await circle.to({ x: 100, fill: '#00ffff' })
				}
      `}
		</Code>

		<svg class="w-[900px] h-[200px] mt-32 mx-auto">
			<circle cx={$circle.x} cy={$circle.y} r={$circle.r} fill={$circle.fill} />
			<text
				x={$circle.x}
				y={$circle.y}
				font-size={$circle.r * 0.4}
				font-family="JetBrains Mono"
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{$circle.x.toFixed(0)}
			</text>
		</svg>
	</Slide>
</Presentation>
