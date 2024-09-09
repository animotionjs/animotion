<script lang="ts">
	type ActionProps = {
		order?: number
		do?: () => void
		undo?: () => void
		focused?: () => void
	}

	let { order, ...props }: ActionProps = $props()
	let el: HTMLDivElement

	const noop = () => {}
	const action = () => props?.do?.() ?? noop()
	const undo = () => props?.undo?.() ?? noop()

	$effect(() => {
		el.addEventListener('in', action)
		el.addEventListener('out', undo)
		el.addEventListener('current', () => {
			props?.focused?.() ?? noop()
		})
		return () => {
			el.removeEventListener('in', action)
			el.removeEventListener('out', undo)
		}
	})
</script>

<div bind:this={el} class="fragment hidden" data-fragment-index={order}></div>
