<script lang="ts">
	import { Embed as Presentation, Slide } from '@animotion/core'
</script>

<Presentation>
	<Slide animate>
		<div
			class="mx-auto flex w-[800px] justify-between font-semibold text-gray-900"
		>
			<div
				data-id="circle-1"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-red-400"
			>
				red
			</div>
			<div
				data-id="circle-2"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-green-400"
			>
				green
			</div>
			<div
				data-id="circle-3"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-blue-400"
			>
				blue
			</div>
		</div>
	</Slide>

	<Slide animate>
		<div
			class="mx-auto flex w-[800px] justify-between font-semibold text-gray-900"
		>
			<div
				data-id="circle-3"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-blue-400"
			>
				blue
			</div>
			<div
				data-id="circle-2"
				class="mt-[200px] grid h-[240px] w-[240px] place-content-center rounded-full bg-green-400"
			>
				green
			</div>
			<div
				data-id="circle-1"
				class="grid h-[240px] w-[240px] place-content-center rounded-full bg-red-400"
			>
				red
			</div>
		</div>
	</Slide>
</Presentation>
