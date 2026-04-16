<script lang="ts">
	import { Action, Code, Path, Presentation, Preview, Slide } from '$lib/index.js'
	import { tween } from '@animotion/motion'

	const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

	let code: ReturnType<typeof Code>
	let preview: ReturnType<typeof Preview>
	let outerPath: ReturnType<typeof Path>
	let innerPath: ReturnType<typeof Path>

	let example: Code
	let example2: Code
	let count = tween(0)
	// setTimeout(() => count.to(10), 2000)
</script>

<Presentation options={{ history: true, transition: 'slide', controls: true, progress: true }}>
	<Slide class="h-full place-content-center place-items-center">
		<div>
			<Code
				bind:this={example2}
				lang="css"
				theme="poimandres"
				code={`
					.item {
						transition:
							opacity 0.5s,
							translate 0.5s;
						transition-duration 2s;
					}
				`}
				options={{ duration: 600, stagger: 0.3, containerStyle: false }}
			/>
		</div>

		<Action
			actions={[
				() => {
					example2.replace(`.item`, `.items`)
				},
				() => {
					example2.replace(
						`translate 0.5s;`,
						`
							translate 0.5s,
							display 0.5s,
							allow-disecrete;
						`
					)
				}
			]}
		/>
	</Slide>

	<Slide class="h-full place-content-center place-items-center">
		<div>
			<Code
				bind:this={example}
				lang="svelte"
				theme="poimandres"
				code={`
					<script lang="ts">
						let count = $state(${count.current.toFixed(0)})
					<\/script>
				`}
				options={{ duration: 600, stagger: 0.3, containerStyle: false }}
			/>
		</div>

		<Action actions={[() => example.insert`3:1 let double = $derived(count * 2)`]} />
	</Slide>

	<Slide class="h-full place-content-center place-items-center">
		<svg viewBox="0 0 110 130" width="300" height="350">
			<Path
				bind:this={outerPath}
				data={[
					'M94.16,22.82c-10.4-14.89-30.94-19.3-45.79-9.83L22.28,29.61A29.92,29.92,0,0,0,8.76,49.65a31.51,31.51,0,0,0,3.11,20.23,30.01,30.01,0,0,0-4.48,11.18,31.88,31.88,0,0,0,5.45,24.12c10.4,14.89,30.94,19.3,45.79,9.83l26.08-17.59A29.92,29.92,0,0,0,98.24,78.35a31.51,31.51,0,0,0-3.11-20.23,30.01,30.01,0,0,0,4.48-11.18,31.88,31.88,0,0,0-5.45-24.12z',
					'M55 15 A50 50 0 1 0 55 115 A50 50 0 1 0 55 15 Z'
				]}
				manual
				fill="#ff3e00"
				stroke="none"
				duration={800}
				easing={easeInOut}
			/>
			<Path
				bind:this={innerPath}
				data={[
					'M45.82,106.58A20.72,20.72,0,0,1,23.58,98.34a19.17,19.17,0,0,1-3.28-14.5,18.19,18.19,0,0,1,.62-2.44l.49-1.5,1.34.98a33.64,33.64,0,0,0,10.2,5.1l.97.29-.09.97a5.85,5.85,0,0,0,1.05,3.88,6.24,6.24,0,0,0,6.7,2.49,5.74,5.74,0,0,0,1.6-.7L69.27,76.28a5.43,5.43,0,0,0,2.45-3.63,5.79,5.79,0,0,0-.99-4.37,6.24,6.24,0,0,0-6.7-2.49,5.74,5.74,0,0,0-1.6.7l-9.95,6.35a19.03,19.03,0,0,1-5.3,2.32,20.72,20.72,0,0,1-22.24-8.24,19.17,19.17,0,0,1-3.28-14.5,17.99,17.99,0,0,1,8.13-12.05L55.88,23.75a19,19,0,0,1,5.3-2.33A20.72,20.72,0,0,1,83.42,29.66a19.17,19.17,0,0,1,3.28,14.5,18.4,18.4,0,0,1-.62,2.44l-.49,1.5-1.34-.98a33.62,33.62,0,0,0-10.2-5.1l-.97-.29.09-.97a5.86,5.86,0,0,0-1.05-3.88,6.24,6.24,0,0,0-6.7-2.49,5.74,5.74,0,0,0-1.6.7L37.73,51.72a5.42,5.42,0,0,0-2.45,3.63,5.79,5.79,0,0,0,.99,4.37,6.24,6.24,0,0,0,6.7,2.49,5.77,5.77,0,0,0,1.6-.7l9.95-6.34a18.98,18.98,0,0,1,5.3-2.33,20.72,20.72,0,0,1,22.24,8.24,19.17,19.17,0,0,1,3.28,14.5,18,18,0,0,1-8.13,12.05L51.12,104.25a19,19,0,0,1-5.3,2.33z',
					'M20 57a19.25 19.25 0 0 1 34-12.87a2 2 0 0 0 2.87 0a19.2 19.2 0 0 1 33.13 12.87c0 8-5.25 14-10.5 19.25l-19.25 18.6a7 7 0 0 1-9.5 0l-19.25-18.6c-5.25-5.25-11.5-11.25-11.5-19.25'
				]}
				manual
				fill="#ffffff"
				stroke="none"
				duration={800}
				easing={easeInOut}
			/>
		</svg>

		<Action
			do={() => {
				Promise.all([outerPath.morph(1), innerPath.morph(1)])
			}}
			undo={() => {
				Promise.all([outerPath.morph(0), innerPath.morph(0)])
			}}
		/>
	</Slide>

	<Slide class="h-full place-content-center place-items-center">
		<Path
			data={[
				'M301.113,12.011L576.715,584.766L25.508,584.766L301.113,12.011z',
				'M25.508,12.011 L576.715,12.011 L576.715,584.766 L25.508,584.766 L25.508,12.011 z'
			]}
			viewBox="-20 -20 640 640"
			width="600"
			height="600"
			stroke="#e13238"
			strokeWidth={4}
			fill="none"
			duration={1000}
		/>
	</Slide>

	<Slide class="h-full place-content-center place-items-center">
		<div class="h-[600px] w-[800px]">
			<Preview
				bind:this={preview}
				code={{
					markup: `
						<h1>Heading</h1>
						<button id="btn">Click</button>
					`,
					styles: `
						h1 { color: orangered; }
					`,
					script: `
						import confetti from 'canvas-confetti';
						btn.onclick = () => confetti();
					`
				}}
				imports={{ 'canvas-confetti': 'https://esm.sh/canvas-confetti@1.6.0' }}
				onmessage={(m) => console.log(m)}
				showConsole={false}
			/>
		</div>

		<Action
			actions={[
				() => preview.markup.append`<p>Append</p>`,
				() => preview.markup.replace('<h1>Heading</h1>', '<h1>Replace</h1>'),
				() => preview.markup.insert`2 <p>Insert</p>`,
				() => preview.markup.remove`2-3`
			]}
		/>
	</Slide>

	<Slide class="h-full place-content-center place-items-center">
		<div class="h-[600px] w-[800px]">
			<Code
				bind:this={code}
				lang="svelte"
				theme="poimandres"
				code={`
					<script lang="ts">
						let count = $state(0)
					<\/script>
				`}
				options={{ duration: 600, stagger: 0.3, containerStyle: false }}
			/>
		</div>

		<Action
			actions={[
				() => code.append`
					<button onclick={() => count += 1}>
						// ...
					</button>
				`,
				() => code.insert`3:1 let double = $derived(count * 2)`,
				() => code.replace('// ...', '{count} * 2 = {double}'),
				() => code.replace('$state(0)', '$state(10)'),
				() => code.remove`3,6-8`
			]}
		/>
	</Slide>
</Presentation>
