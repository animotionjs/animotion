<script lang="ts">
	import { Embed as Presentation, Slide, Code } from '@animotion/core'
</script>

<Presentation>
	<Slide animate>
		<div class="w-[800px] mx-auto text-8xl">
			<Code id="auto-animate" lang="html">
				{`
					<script>
						let count = $state(0)
						let double = $derived(count * 2)
					<\/script>
				`}
			</Code>
		</div>
	</Slide>

	<Slide animate>
		<div class="w-[800px] mx-auto text-8xl">
			<Code id="auto-animate" lang="html">
				{`
					<script>
						let count = $state(0)
						let double = $derived(count * 2)
					<\/script>

					<button onclick={() => count++}>
						{double}
					</button>
				`}
			</Code>
		</div>
	</Slide>
</Presentation>
