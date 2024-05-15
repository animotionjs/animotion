<script>
	import { Embed as Presentation, Slide, Step } from '@animotion/core'
</script>

<Presentation>
	<Slide>
		<p class="text-[100px] font-semibold">Events</p>
	</Slide>

	<Slide in={() => alert('slide in')} out={() => alert('slide out')}>
		<p class="text-[100px] font-semibold">Slide</p>

		<Step in={() => alert('step in')} out={() => alert('step out')}>Step</Step>
	</Slide>
</Presentation>
