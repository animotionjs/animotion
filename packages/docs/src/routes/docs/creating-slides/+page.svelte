<script lang="ts">
	import { tweened } from 'svelte/motion'
	import { quadInOut } from 'svelte/easing'
	import { base } from '$app/paths'

	import { Keynote, Slide } from '$lib/keynote/index'
	import Code from '$lib/components/code.svelte'

	let progress = tweened(0, { duration: 2000, easing: quadInOut })

	progress.subscribe((value) => {
		if (value === 1000) {
			setTimeout(() => {
				progress.set(0, { duration: 0 })
			}, 1000)
		}

		if (value === 0) {
			setTimeout(() => progress.set(1000), 1000)
		}
	})
</script>

<h1>Creating slides</h1>

<h2>Slide away</h2>

<p>
	You can write your entire presentation inside <code>slides.svelte</code> but you can also break things
	into components.
</p>

<Keynote>
	<Slide>Horizontal 1</Slide>
	<Slide>Horizontal 2</Slide>

	<Slide>
		<Slide>Vertical 1</Slide>
		<Slide>Vertical 2</Slide>
	</Slide>
</Keynote>

<p>
	To create horizontal and vertical slides use the <code>&lt;Slide&gt;</code>
	component.
</p>

<Code lang="html">
	{`
		<script lang="ts">
			import { Presentation, Slide } from '@deck'
		</\script>

		<Presentation>
			<Slide>Horizontal 1</Slide>
			<Slide>Horizontal 2</Slide>
			
			<Slide>
				<Slide>Vertical 1</Slide>  
				<Slide>Vertical 2</Slide>  
			</Slide>
		</Presentation>
  `}
</Code>

<p>
	Because <b>Keynote</b> uses Reveal these examples are equivalent.
</p>

<Code lang="html">
	{`
		<div class="reveal">
			<div class="slides">
				<section>Horizontal 1</section>
				<section>Horizontal 2</section>

				<section>
					<section>Vertical 1</section>
					<section>Vertical 2</section>
				</section>
			</div>
		</div>
  `}
</Code>

<p>
	You can customize <b>Keynote</b> by changing the existing presentation components and add new ones
	if you read the
	<a href="https://revealjs.com/">Reveal documentation</a>.
</p>

<h2>Using components</h2>

<p>
	You might have more complex presentations that also have state which can be hard to manage inside
	a single file — in that case you can split your slides into components and place them wherever you
	want.
</p>

<Keynote>
	<Slide>
		<span style="font-size: 200px; font-weight: 100; margin-top: 2rem;">
			{$progress.toFixed(0)}
		</span>
	</Slide>
</Keynote>

<Code lang="html">
	{`
		<!-- progress.svelte -->
		<script lang="ts">
			import { tweened } from 'svelte/motion'

			let progress = tweened(0, { duration: 2000 })
			$progress = 1000
		</\script>

		<Slide>
			<span>{$progress.toFixed(0)}</span>
		</Slide>
  `}
</Code>

<Code lang="html">
	{`
		<!-- slides.svelte -->
		<script lang="ts">
			import { Presentation } from '@deck'
			import { Progress } from './progress.svelte'
		</\script>

		<Presentation>
			<Progress /\>
		</Presentation>
  `}
</Code>

<p>
	You don't have to import the <code>&lt;Slide&gt;</code> component inside
	<code>progress.svelte</code>
	but it's useful if you want to use <a href="{base}/docs/events">events</a> to update state.
</p>