<script lang="ts">
	import { Presentation, Slide, Code } from '@components'
	import { signal } from '@motion'

	const circle = signal(
		{ x: 0, y: 200, r: 80, fill: '#00ffff' },
		{ duration: 2000 }
	)

	async function animate() {
		await circle.to({ x: 400, fill: '#ffff00' }, { delay: 600 })
		await circle.to({ x: 0, fill: '#00ffff' }, { delay: 300 })
	}

	function resetAnimation() {
		circle.reset()
	}
</script>

<Presentation>
	<Slide animate>
		<p class="font-bold text-8xl">🪄 Animotion</p>
	</Slide>

	<Slide animate>
		<p class="font-bold text-6xl mt-8">🪄 Animotion</p>

		<div class="w-max mx-auto mt-16">
			<Code lang="ts" lines="1,4|2|3">
				{`
					const circle = signal(
						{ x: 0, y: 200, r: 80, fill: '#00ffff' },
						{ duration: 2000 }
					)
				`}
			</Code>
		</div>
	</Slide>

	<Slide animate>
		<p class="font-bold text-6xl mt-8">🪄 Animotion</p>

		<div class="w-max mx-auto mt-16">
			<Code lang="ts" lines="1,4|2|3">
				{`
					async function animate() {
						await circle.to({ x: 400, fill: '#ffff00' })
						await circle.to({ x: 0, fill: '#00ffff' })
					}
				`}
			</Code>
		</div>

		<svg
			class="w-full h-[400px] mx-auto"
			viewBox="0 0 400 400"
			data-id="animation"
		>
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

	<Slide on:in={animate} on:out={resetAnimation} animate>
		<p class="font-bold text-6xl mt-8">🪄 Animotion</p>

		<svg
			class="w-full h-[400px] mx-auto"
			viewBox="0 0 400 400"
			data-id="animation"
		>
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
