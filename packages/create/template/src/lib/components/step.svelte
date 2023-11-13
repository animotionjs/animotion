<script lang="ts">
	export let order: string | null = null
	export let fadeIn = false
	export let fadeOut = false
	export let fadeUp = false
	export let fadeDown = false
	export let fadeLeft = false
	export let fadeRight = false
	export let fadeInThenOut = false
	export let currentVisible = false
	export let fadeInThenSemiOut = false
	export let semiFadeOut = false
	export let highlightRed = false
	export let highlightGreen = false
	export let highlightBlue = false
	export let highlightCurrentRed = false
	export let highlightCurrentGreen = false
	export let highlightCurrentBlue = false
	export let grow = false
	export let shrink = false
	export let strike = false

	delete $$restProps.class
</script>

<p
	on:in
	on:out
	class:fade-in={fadeIn}
	class:fade-out={fadeOut}
	class:fade-up={fadeUp}
	class:fade-down={fadeDown}
	class:fade-left={fadeLeft}
	class:fade-right={fadeRight}
	class:fade-in-then-out={fadeInThenOut}
	class:current-visible={currentVisible}
	class:fade-in-then-semi-out={fadeInThenSemiOut}
	class:semi-fade-out={semiFadeOut}
	class:highlight-red={highlightRed}
	class:highlight-green={highlightGreen}
	class:highlight-blue={highlightBlue}
	class:highlight-current-red={highlightCurrentRed}
	class:highlight-current-green={highlightCurrentGreen}
	class:highlight-current-blue={highlightCurrentBlue}
	class:grow
	class:shrink
	class:strike
	class="fragment {$$props.class || ''}"
	data-fragment-index={order}
	{...$$restProps}
>
	<slot />
</p>
