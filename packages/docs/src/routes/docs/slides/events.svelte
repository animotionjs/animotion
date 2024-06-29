<script lang="ts">
	import { Embed as Presentation, Slide } from '@animotion/core'
</script>

<Presentation>
	<Slide
		class="h-full place-content-center place-items-center"
		in={() => alert('slide 1 enter')}
		out={() => alert('slide 1 exit')}
	>
		<p class="text-8xl font-bold drop-shadow-sm">Slide 1</p>
	</Slide>

	<Slide
		class="h-full place-content-center place-items-center"
		in={() => alert('slide 2 enter')}
		out={() => alert('slide 2 exited')}
	>
		<p class="text-8xl font-bold drop-shadow-sm">Slide 2</p>
	</Slide>
</Presentation>
