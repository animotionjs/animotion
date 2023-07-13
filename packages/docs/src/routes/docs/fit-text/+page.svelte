<script lang="ts">
	import { Keynote, Slide, FitText } from '$lib/keynote/index'
	import Code from '$lib/components/code.svelte'
</script>

<h1>FitText</h1>

<p>
	You can use <code>&lt;FitText&gt;</code> to make the text as large as possible without overflowing
	the slide.
</p>

<Keynote>
	<Slide>
		<FitText class="uppercase">Hello</FitText>
		<FitText class="uppercase">Darkness my old friend</FitText>
	</Slide>
</Keynote>

<Code lang="svelte">
	{`
		<script>
			import { Keynote, Slide, FitText } from '@components'
		<\/script>

		<Presentation>
			<Slide>
				<FitText class="uppercase">Hello</FitText>
				<FitText class="uppercase">Darkness my old friend</FitText>
			</Slide>
		</Presentation>
	`}
</Code>

<p>
	By default a <code>h2</code> tag is used for <code>&lt;FitText&gt;</code> for rendering the text but
	you can change it to anything you want.
</p>

<Code lang="svelte">
	{`
		<FitText type="h1">Hello</FitText>
		<FitText type="p">Darkness my old friend</FitText>
	`}
</Code>
