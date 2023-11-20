<script lang="ts">
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Layout</h1>

<h2>Bring Your Own Layout</h2>

<p>
	Reveal presentation dimensions are
	<b>960x700</b> pixels by default, preserving the aspect ratio, and centering slides vertically, but
	you can disable the layout and bring your own layout.
</p>

<img src="/layout.png" alt="Slides layout" />

<p>
	You can change the slides dimensions, among other options inside <code>src/config.ts</code> if you
	want complete control over the layout.
</p>

<Code code={data.examples[0]} />

<p>This way you can create a reusable <code>&lt;Layout&gt;</code> component.</p>

<Code code={data.examples[1]} />

<Code code={data.examples[2]} />
