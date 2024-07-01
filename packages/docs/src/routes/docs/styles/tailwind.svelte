<script lang="ts">
	import { Embed as Presentation, Slide } from '@animotion/core'

	let circle = 'grid h-[200px] w-[200px] place-content-center rounded-full'
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<div class="flex font-semibold text-gray-900" style:--gap="var(--size-4)">
			<div class="{circle} bg-red-400">red</div>
			<div class="{circle} bg-green-400">green</div>
			<div class="{circle} bg-blue-400">blue</div>
		</div>
	</Slide>
</Presentation>
