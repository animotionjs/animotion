<script lang="ts">
	import { Presentation, Slide, Code } from '@components'
	import { signal } from '@motion'

	const circle = signal(
		{ x: 0, y: 200, r: 80, fill: '#00ffff' },
		{ duration: 2000 }
	)
</script>

<Presentation>
	<Slide animate>
		<p class="font-bold text-8xl">🪄 Animotion</p>
	</Slide>

	<Slide animate>
		<p class="font-bold text-6xl mt-8">🪄 Animotion</p>

		<div class="w-max mx-auto mt-16">
			<Code lang="ts" lines="1,4|2|3|1-4">
				{`
					const circle = signal(
						{ x: 0, y: 200, r: 80, fill: '#00ffff' },
						{ duration: 2000 }
					)
				`}
			</Code>
		</div>
	</Slide>

	<Slide on:out={() => circle.reset()} animate>
		<p class="font-bold text-6xl mt-8">🪄 Animotion</p>

		<div class="w-max mx-auto mt-16">
			<Code
				lang="ts"
				lines="1,4|2|3|1-4"
				steps={[
					['2', async () => await circle.to({ x: 400, fill: '#ffff00' })],
					['3', async () => await circle.to({ x: 0, fill: '#00ffff' })],
					['1-4', () => circle.reset()],
				]}
			>
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

	<Slide animate>
		<p class="font-bold text-6xl mt-8">🪄 Animotion</p>
		<p class="mt-16 text-3xl">
			Learn more by reading the
			<a
				class="underline"
				href="https://animotion.pages.dev/docs"
				target="_blank"
			>
				Animotion docs
			</a>.
		</p>
	</Slide>
</Presentation>
