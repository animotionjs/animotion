<script lang="ts">
	import { Presentation, Slide, Code, Transition, Action } from '@animotion/core'
	import { tween } from '@animotion/motion'

	let text: HTMLParagraphElement
	let code: Code
	let circle = tween({ x: 0, y: 80, r: 80, fill: '#00ffff' })
	let items = $state([1, 2, 3, 4])
	let layout = $state('flex gap-4')
</script>

<Presentation options={{ history: true, transition: 'slide', controls: true, progress: true }}>
	<Slide on:out={() => circle.reset()} class="h-full place-content-center place-items-center">
		<Transition>
			<p bind:this={text} class="text-8xl font-bold drop-shadow-sm">🪄 Animotion</p>
		</Transition>

		<Transition do={() => text.classList.replace('text-8xl', 'text-6xl')} class="mt-16">
			<Code
				bind:this={code}
				lang="ts"
				theme="poimandres"
				code={`
					async function animate() {
						// ...
					}
				`}
				options={{ duration: 600, stagger: 0.3, containerStyle: false }}
			/>
		</Transition>

		<Transition class="mt-16">
			<svg width="560" height={circle.r * 2} viewBox="-80 0 560 {circle.r * 2}">
				<circle cx={circle.x} cy={circle.y} r={circle.r} fill={circle.fill} />
				<text
					x={circle.x}
					y={circle.y}
					font-size={circle.r * 0.4}
					font-family="JetBrains Mono"
					text-anchor="middle"
					dominant-baseline="middle"
				>
					{circle.x.toFixed(0)}
				</text>
			</svg>
		</Transition>

		<Action
			do={async () => {
				await code.update`
					async function animate() {
						await circle.to({ x: 400, fill: '#ffff00' })
					}
				`
				await code.selectLines`2`
				await circle.to({ x: 400, fill: '#ffff00' })
			}}
		/>

		<Action
			do={async () => {
				await code.update`
					async function animate() {
						await circle.to({ x: 400, fill: '#ffff00' })
						await circle.to({ x: 0, fill: '#00ffff' })
					}
				`
				await code.selectLines`3`
				await circle.to({ x: 0, fill: '#00ffff' })
			}}
		/>

		<Action do={() => code.selectLines`*`} />
	</Slide>

	<Slide class="h-full place-content-center place-items-center">
		<Transition>
			<p class="text-6xl font-bold drop-shadow-sm">🪄 Layout Animations</p>
		</Transition>

		<Transition class="mt-16">
			<div class={layout}>
				{#each items as item (item)}
					<Transition
						class="grid h-[180px] w-[180px] place-content-center rounded-2xl border-t-2 border-white bg-gray-200 text-6xl font-semibold text-black shadow-2xl"
						enter="rotate"
						visible
					>
						{item}
					</Transition>
				{/each}
			</div>
		</Transition>

		<Transition do={() => (layout = 'grid grid-cols-2 grid-rows-2 gap-4')} />
		<Transition do={() => (items = [4, 3, 2, 1])} />
		<Transition do={() => (items = [2, 1, 4, 3])} />
		<Transition do={() => (items = [4, 3, 2, 1])} />
		<Transition do={() => (items = [1, 2, 3, 4])} />
		<Transition do={() => (layout = 'flex gap-4')} />
	</Slide>

	<Slide class="h-full place-content-center place-items-center">
		<p class="mt-8 text-6xl font-bold">🪄 Animotion</p>
		<p class="mt-16 text-3xl">
			Learn more by reading the
			<a class="underline" href="https://animotion.pages.dev/docs" target="_blank">
				Animotion docs
			</a>.
		</p>
	</Slide>
</Presentation>
