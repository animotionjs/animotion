<script lang="ts">
	import { Embed as Presentation, Slide } from '@animotion/core'
</script>

<Presentation>
	<Slide animate>
		<p>Group A</p>
	</Slide>

	<Slide animate>
		<p class="text-red-400">Group A</p>
	</Slide>

	<Slide animate animateId="two">
		<p>Group B</p>
	</Slide>

	<Slide animate animateId="two">
		<p class="text-green-400">Group B</p>
	</Slide>

	<Slide animate animateId="two" animateRestart>
		<p>Group C</p>
	</Slide>

	<Slide animate animateId="two">
		<p class="text-blue-400">Group C</p>
	</Slide>
</Presentation>
