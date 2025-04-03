<script lang="ts">
	import { Embed as Presentation, Slide, Code, Action } from '@animotion/core'

	let code: ReturnType<typeof Code>
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<Code
			bind:this={code}
			class="w-[480px]"
			lang="svelte"
			theme="poimandres"
			code={`
				<script>
					let count = 0
					$: double = count * 2
				<\/script>

				<button on:click={() => count++}>
					{double}
				</button>
			`}
			options={{ duration: 1000, stagger: 0.3, lineNumbers: true, containerStyle: false }}
		/>

		<Action
			do={() =>
				code.update`
					<script>
						let count = $state(0)
						let double = $derived(count * 2)
					<\/script>

					<button onclick={() => count++}>
						{double}
					</button>
				`}
		/>

		<Action do={() => code.selectLines`2,3`} />
		<Action do={() => code.selectLines`2-3,7`} />
		<Action do={() => code.selectToken`double {double}`} />
		<Action do={() => code.selectLines`*`} />
	</Slide>
</Presentation>
