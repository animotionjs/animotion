<script lang="ts">
	import { Embed as Presentation, Slide, Step } from '@animotion/core'
</script>

<Presentation>
	<Slide>
		<Step class="custom blur">No care in the world</Step>
		<Step class="custom blur">Maybe I'm learning</Step>
		<Step class="custom blur">Why the sea on the tide</Step>
		<Step class="custom blur">Has no way of turning</Step>
	</Slide>
</Presentation>

<style>
	:global(.fragment.blur) {
		filter: blur(5px);
	}

	:global(.fragment.blur.visible) {
		filter: none;
	}
</style>
