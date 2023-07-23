<script lang="ts">
	import { Animotion, Slide, FitText } from '$lib/animotion'
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>FitText</h1>

<p>
	You can use <code>&lt;FitText&gt;</code> to make the text as large as possible without overflowing
	the slide.
</p>

<Animotion>
	<Slide>
		<FitText class="uppercase">Hello</FitText>
		<FitText class="uppercase">Darkness my old friend</FitText>
	</Slide>
</Animotion>

<Code code={data.examples[0]} />

<p>
	By default a <code>h2</code> tag is used for <code>&lt;FitText&gt;</code> for rendering the text but
	you can change it to anything you want.
</p>

<Code code={data.examples[1]} />
