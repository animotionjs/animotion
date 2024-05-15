<script lang="ts">
	import { Embed as Presentation, Slide, Code } from '@animotion/core'
</script>

<Presentation>
	<Slide animate>
		<div class="w-[800px] mx-auto text-8xl">
			<Code lang="html" lines="2|3" id="lines">
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
			<Code lang="html" lines="6,8|3,7|1-8" id="lines">
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
