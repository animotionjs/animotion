<script lang="ts">
	export let cx
	export let cy
	export let r
</script>

<div class="absolute top-[50%] right-0 -translate-y-[50%] z-20">
	<div class="w-[600px] h-[600px] rounded-md shadow-md">
		<svg viewBox="0 0 600 600">
			<circle {cx} {cy} {r} fill="aqua" />
		</svg>
	</div>
</div>
