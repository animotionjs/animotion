<script lang="ts">
	import { tweened } from 'svelte/motion'
	import { quadInOut } from 'svelte/easing'
	import { base } from '$app/paths'

	import { Keynote, Slide, Vertical } from '$lib/keynote/index'
	import Code from '$lib/components/code.svelte'

	let progress = tweened(0, { duration: 1500, easing: quadInOut })
	let done = false

	progress.subscribe((value) => {
		if (value === 10_000) {
			done = true

			setTimeout(() => {
				progress.set(0, { duration: 0 })
			}, 2000)
		}

		if (value === 0) {
			done = false
			setTimeout(() => progress.set(10_000), 1000)
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

	<Vertical>
		<Slide>Vertical 1</Slide>
		<Slide>Vertical 2</Slide>
	</Vertical>
</Keynote>

<p>
	To create horizontal and vertical slides use the <code>&lt;Slide&gt;</code>
	component.
</p>

<Code lang="svelte">
	{`
		<script lang="ts">
			import { Presentation, Slide, Vertical } from '@components'
		</\script>

		<Presentation>
			<Slide>Horizontal 1</Slide>
			<Slide>Horizontal 2</Slide>
			
			<Vertical>
				<Slide>Vertical 1</Slide>  
				<Slide>Vertical 2</Slide>  
			</Vertical>
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
		<span class="mt-8 text-[100px] font-black">
			{$progress.toLocaleString('en', { maximumFractionDigits: 0 })}
			<span>
				{#if done}🎉{/if}
			</span>
		</span>
	</Slide>
</Keynote>

<Code lang="svelte">
	{`
		<!-- progress.svelte -->
		<script lang="ts">
			import { tweened } from 'svelte/motion'

			let progress = tweened(0, { duration: 2000 })
			$progress = 10_000
		</\script>

		<Slide>
			{$progress.toLocaleString('en', { maximumFractionDigits: 0 })}
		</Slide>
  `}
</Code>

<Code lang="html">
	{`
		<!-- slides.svelte -->
		<script lang="ts">
			import { Presentation } from '@components'
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
