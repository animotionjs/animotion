<script lang="ts">
	import { Animotion, Slide, Stretch } from '$lib/animotion'
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Stretch</h1>

<p>
	<code>&lt;Stretch&gt;</code> is a helper component for resizing an image, or video for example to cover
	the remaining vertical space in a slide.
</p>

<Animotion>
	<Slide>
		<Stretch class="mx-auto" src="/svelte.png" type="img" />
	</Slide>
</Animotion>

<Code code={data.examples[0]} />
