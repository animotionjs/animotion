<script lang="ts">
	import { Embed as Presentation, Slide, Action } from '@animotion/core'
	import { tween } from '@animotion/motion'

	let cx = tween(0)

	async function animate() {
		await cx.to(600)
		await cx.to(0, { delay: 300 })
	}
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<svg width="800" height="200" viewBox="-100 0 800 200">
			<circle cx={cx.current} cy={100} r={80} fill="#00ffff" />
			<text
				x={cx.current}
				y={100}
				font-family="Monaspace Neon"
				font-size="40px"
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{cx.current.toFixed(0)}
			</text>
		</svg>

		<Action do={animate} />
	</Slide>
</Presentation>
