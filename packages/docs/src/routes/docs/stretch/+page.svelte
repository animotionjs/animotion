<script lang="ts">
	import { base } from '$app/paths'
	import { Keynote, Slide, Stretch } from '$lib/keynote'
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Stretch</h1>

<p>
	<code>&lt;Stretch&gt;</code> is a helper component for resizing an element like an image or video for
	example to cover the remaining vertical space in a slide.
</p>

<Keynote>
	<Slide>
		<Stretch class="mx-auto" src="{base}/svelte.png" type="img" />
	</Slide>
</Keynote>

<Code code={data.examples[0]} />
