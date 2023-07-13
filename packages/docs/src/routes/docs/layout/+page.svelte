<script lang="ts">
	import Code from '$lib/components/code.svelte'
</script>

<h1>Layout</h1>

<h2>Bring Your Own Layout</h2>

<p>
	Reveal presentation dimensions are
	<b>960x700</b> preserving the aspect ratio and using
	<code>display: block;</code> for the slides but you can disable the layout and bring your own layout.
</p>

<p>Open <code>src/config.ts</code> to customize to config.</p>

<Code lang="js">
	{`
		const options = {
			// presentation size
			width: 1280,
			height: 720,
			// bring your own layout
			disableLayout: true,
			// display mode used to show slides
			display: 'grid',
		}
	`}
</Code>

<p>
	In this example I disabled the layout, which also gets rid of the aspect ratio and set the slides
	to use <code>display: grid;</code> giving me complete control over the layout.
</p>
