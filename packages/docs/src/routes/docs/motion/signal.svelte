<script lang="ts">
	import { Embed as Presentation, Slide, Step } from '@animotion/core'
	import { signal } from '@animotion/motion'

	let cx = signal(0)

	async function animate() {
		await cx.to(600).to(0, { delay: 0.3 })
	}
</script>

<Presentation>
	<Slide>
		<Step in={animate} />

		<svg viewBox="-100 0 800 200">
			<circle cx={$cx} cy={100} r={100} fill="#00ffff" />
			<text
				x={$cx}
				y={100}
				font-family="JetBrains Mono"
				font-size="48px"
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{$cx.toFixed(0)}
			</text>
		</svg>
	</Slide>
</Presentation>
