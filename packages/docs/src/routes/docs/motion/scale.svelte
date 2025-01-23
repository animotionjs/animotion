<script lang="ts">
	import { Action, Embed as Presentation, Slide } from '@animotion/core'
	import { tween } from '@animotion/motion'

	let text = tween(1)

	async function animate() {
		await text.to(3)
		await text.to(1)
	}
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<p style:scale={text.current}>Motion</p>
		<Action do={animate} />
	</Slide>
</Presentation>
