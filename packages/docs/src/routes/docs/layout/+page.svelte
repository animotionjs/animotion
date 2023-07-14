<script lang="ts">
	import { base } from '$app/paths'
	import Code from '$lib/components/code.svelte'
</script>

<h1>Layout</h1>

<h2>Bring Your Own Layout</h2>

<p>
	Reveal presentation dimensions are
	<b>960x700</b> pixels max while preserving the aspect ratio and centering slides vertically but you
	can disable the layout and bring your own layout.
</p>

<img src="{base}/layout.png" alt="Slides layout" />

<p>
	You can change the slides dimensions and centering options inside <code>src/config.ts</code> but also
	disable the layout and set the display mode for the slides if you want complete control over the layout.
</p>

<Code lang="js">
	{`
		const options = {
			// bring your own layout
			disableLayout: true,
			// display mode used to show slides
			display: 'grid',
		}
	`}
</Code>
