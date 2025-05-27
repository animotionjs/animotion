<script lang="ts">
	import { Transition } from '@animotion/core'

	let items = $state([1, 2, 3, 4])
	let layout = $state('flex gap-4')
</script>

<Transition
	do={async () => {
		text.classList.replace('text-6xl', 'text-8xl')
		await code.update``
	}}
>
	<p bind:this={text} class="text-8xl font-bold drop-shadow-sm">🪄 Animotion</p>
</Transition>

<Transition
	do={async () => {
		text.classList.replace('text-8xl', 'text-6xl')
		await code.update`
					async function animate() {
						// ...
					}
				`
		await circle.to({ x: 0, fill: '#00ffff' })
	}}
	class="mt-16"
>
	<Code
		bind:this={code}
		lang="ts"
		theme="poimandres"
		code={``}
		options={{ duration: 600, stagger: 0.3, containerStyle: false }}
	/>
</Transition>

<Transition
	do={async () => {
		await code.update`
					async function animate() {
						// ...
					}
				`
		await circle.to({ x: 0, fill: '#00ffff' })
	}}
	class="mt-16"
>
	<svg width="560" height={circle.r * 2} viewBox="-80 0 560 {circle.r * 2}">
		<circle cx={circle.x} cy={circle.y} r={circle.r} fill={circle.fill} />
		<text
			x={circle.x}
			y={circle.y}
			font-size={circle.r * 0.4}
			font-family="Monaspace Neon"
			text-anchor="middle"
			dominant-baseline="middle"
		>
			{circle.x.toFixed(0)}
		</text>
	</svg>
</Transition>

<Action
	actions={[
		async () => {
			await code.update`
						async function animate() {
							await circle.to({ x: 400, fill: '#ffff00' })
						}
					`
			await code.selectLines`2`
			await circle.to({ x: 400, fill: '#ffff00' })
		},
		async () => {
			await code.update`
						async function animate() {
							await circle.to({ x: 400, fill: '#ffff00' })
							await circle.to({ x: 0, fill: '#00ffff' })
						}
					`
			await code.selectLines`3`
			await circle.to({ x: 0, fill: '#00ffff' })
		},
		async () => {
			await code.selectLines`*`
			await code.update`
						async function animate() {
							await circle.to({ x: 400, fill: '#ffff00' })
							await circle.to({ x: 0, fill: '#00ffff' })
						}
					`
			await circle.to({ x: 0, fill: '#00ffff' })
		},
	]}
/>
