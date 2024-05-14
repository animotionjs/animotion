<script lang="ts">
	import { Embed as Presentation, Slide } from '@animotion/core'
</script>

<Presentation>
	<Slide>
		<div
			class="animate-width h-[600px] overflow-hidden rounded-2xl"
			style="transform: translateZ(0)"
		>
			<div data-id="color" class="animate-bg h-[40%] bg-gray-400"></div>
			<div data-id="values" class="grid h-[60%] gap-14 bg-gray-100 p-8">
				<div class="animate-bg w-full rounded-2xl bg-gray-400"></div>
				<div class="animate-bg w-full rounded-2xl bg-gray-400"></div>
				<div class="animate-bg w-full rounded-2xl bg-gray-400"></div>
			</div>
		</div>
	</Slide>
</Presentation>

<style>
	.animate-width {
		animation: width 2s ease-in-out infinite alternate;
	}

	.animate-bg {
		animation: background 2s ease-in-out infinite alternate;
	}

	@keyframes width {
		0%,
		10% {
			width: 50%;
		}
		90%,
		100% {
			width: 100%;
		}
	}

	@keyframes background {
		0%,
		10% {
			background-color: #9ca3af;
		}
		90%,
		100% {
			background-color: #2dd4bf;
		}
	}
</style>
