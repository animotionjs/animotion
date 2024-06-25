<script lang="ts">
	type ActionProps = {
		order?: number
		do?: () => void
	}

	let { order, ...props }: ActionProps = $props()
	let el: HTMLDivElement

	function action() {
		const noop = () => {}
		props?.do?.() ?? noop()
	}

	$effect(() => {
		el.addEventListener('in', action)
		return () => el.removeEventListener('in', action)
	})
</script>

<div bind:this={el} class="fragment hidden" data-fragment-index={order}></div>
