<script lang="ts">
	import { Embed as Presentation, Slide, Step } from '@animotion/core'
	import { signal } from '@animotion/motion'

	let text = signal(1)

	async function animate() {
		await text.to(3).to(1)
	}
</script>

<Presentation>
	<Slide>
		<Step in={animate} />
		<h1 style:scale={$text}>Motion</h1>
	</Slide>
</Presentation>
