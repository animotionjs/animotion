<script lang="ts">
	import { Embed as Presentation, Slide } from '@animotion/core'
</script>

<Presentation>
	<Slide animate>
		<div
			data-id="color-picker"
			class="h-[600px] w-[50%] overflow-hidden rounded-2xl"
		>
			<div data-id="color-1" class="h-[40%] bg-gray-400"></div>
			<div data-id="colors" class="grid h-[60%] gap-14 bg-gray-100 p-8">
				<div data-id="color-2" class="w-full rounded-2xl bg-gray-400"></div>
				<div data-id="color-3" class="w-full rounded-2xl bg-gray-400"></div>
				<div data-id="color-4" class="w-full rounded-2xl bg-gray-400"></div>
			</div>
		</div>
	</Slide>

	<Slide animate>
		<div
			data-id="color-picker"
			class="h-[600px] w-[100%] overflow-hidden rounded-2xl"
		>
			<div data-id="color-1" class="h-[40%] bg-teal-400"></div>
			<div data-id="colors" class="grid h-[60%] gap-14 bg-gray-100 p-8">
				<div data-id="color-2" class="w-full rounded-2xl bg-teal-400"></div>
				<div data-id="color-3" class="w-full rounded-2xl bg-teal-400"></div>
				<div data-id="color-4" class="w-full rounded-2xl bg-teal-400"></div>
			</div>
		</div>
	</Slide>
</Presentation>
