<script lang="ts">
	type ActionProps = {
		order?: number
		do?: () => void
	}

	let { order, ...props }: ActionProps = $props()
	let el: HTMLDivElement

	const noop = () => {}
	const action = () => props?.do?.() ?? noop()

	$effect(() => {
		el.addEventListener('current', action)

		return () => {
			el.removeEventListener('current', action)
		}
	})
</script>

<div bind:this={el} class="fragment hidden" data-fragment-index={order}></div>
