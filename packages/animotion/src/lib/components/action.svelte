<script lang="ts">
	type ActionProps = {
		order?: number
		do?: () => void
		undo?: () => void
	}

	let { order, ...props }: ActionProps = $props()
	let el: HTMLDivElement

	const noop = () => {}
	const action = () => props?.do?.() ?? noop()
	const undo = () => props?.undo?.() ?? noop()

	$effect(() => {
		el.addEventListener('current', action)
		el.addEventListener('out', undo)

		return () => {
			el.removeEventListener('current', action)
			el.removeEventListener('out', undo)
		}
	})
</script>

<div bind:this={el} class="fragment hidden" data-fragment-index={order}></div>
