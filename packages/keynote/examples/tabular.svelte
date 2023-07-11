<script lang="ts">
	import { Presentation, Slide, Code } from '@components'

	import { tweened } from 'svelte/motion'
	let count = tweened(0, { duration: 4000 })
</script>

<Presentation>
	<Slide
		animate
		on:in={() => {
			setTimeout(() => count.set(20), 1000)
		}}
		on:out={() => count.set(0, { duration: 0 })}
	>
		<div class="flex">
			<div class="mx-auto flex">
				<button class=" p-2 text-[120px]">&lt;</button>
				<span class="border-4 border-[aqua] text-[200px] font-semibold">
					{$count.toFixed(0)}
				</span>
				<button class=" p-2 text-[120px]">&gt;</button>
			</div>
		</div>
	</Slide>

	<Slide animate>
		<div class="mx-auto w-[840px]">
			<Code lang="css">
				{`
					.value {
						font-variant-numeric: tabular-nums;
					}
				`}
			</Code>
		</div>
	</Slide>

	<Slide animate>
		<div class="mx-auto w-[640px]">
			<Code lang="html">
				{`
				<!-- Tailwind -->
				<span class="tabular-nums">
					...
				</span>
			`}
			</Code>
		</div>
	</Slide>

	<Slide
		on:in={() => {
			setTimeout(() => count.set(20), 1000)
		}}
		on:out={() => count.set(0, { duration: 0 })}
	>
		<div class="flex">
			<div class="mx-auto flex">
				<button class=" p-2 text-[120px]">&lt;</button>
				<span
					class="border-4 border-[aqua] text-[200px] font-semibold tabular-nums"
				>
					{$count.toFixed(0)}
				</span>
				<button class=" p-2 text-[120px]">&gt;</button>
			</div>
		</div>
	</Slide>
</Presentation>
