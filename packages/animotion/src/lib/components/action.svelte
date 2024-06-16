<script lang="ts">
	type ActionProps = {
		do?: () => void
	}

	let { ...props }: ActionProps = $props()
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

<div bind:this={el} class="fragment hidden"></div>
