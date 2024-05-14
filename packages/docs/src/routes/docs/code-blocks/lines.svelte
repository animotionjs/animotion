<script lang="ts">
	import { Embed as Presentation, Slide, Code } from '@animotion/core'
</script>

<Presentation>
	<Slide animate>
		<div class="mx-auto w-[500px]">
			<Code lang="html" lines="2|3">
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
		<div class="mx-auto w-[800px]">
			<Code lang="html" lines="6,8|3,7|1-8">
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
