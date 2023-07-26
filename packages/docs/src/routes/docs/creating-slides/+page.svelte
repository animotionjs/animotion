<script lang="ts">
	import { tweened } from 'svelte/motion'
	import { quadInOut } from 'svelte/easing'

	import { Animotion, Slide, Vertical } from '$lib/animotion'
	import Code from '$lib/components/code.svelte'

	export let data

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
	You can write your entire presentation inside <code>src/slides.svelte</code> but you can also break
	slides into components you can learn more about in another section.
</p>

<Animotion>
	<Slide>Horizontal 1</Slide>
	<Slide>Horizontal 2</Slide>

	<Vertical>
		<Slide>Vertical 1</Slide>
		<Slide>Vertical 2</Slide>
	</Vertical>
</Animotion>

<p>
	To create horizontal and vertical slides use the <code>&lt;Slide&gt;</code>
	component.
</p>

<Code code={data.examples[0]} />

<p>
	Because <b>Animotion</b> is a wrapper around Reveal.js these examples are the same which means you can customize <b>Animotion</b> beyond what it can do.
</p>

<Code code={data.examples[1]} />

<p>
	You can customize <b>Animotion</b> by changing the existing presentation components and add new
	ones if you read the
	<a href="https://revealjs.com/">Reveal.js documentation</a>.
</p>

<h2>Using components</h2>

<p>
	You might have more complex presentations with state which can be hard to manage inside of a
	single file — in that case you can split your slides into components and place them wherever you
	want.
</p>

<Animotion>
	<Slide>
		<span class="mt-8 text-[100px] font-black">
			{$progress.toLocaleString('en', { maximumFractionDigits: 0 })}
			<span>
				{#if done}🎉{/if}
			</span>
		</span>
	</Slide>
</Animotion>

<Code code={data.examples[2]} />

<Code code={data.examples[3]} />

<p>
	You don't have to import the <code>&lt;Slide&gt;</code> component inside
	<code>progress.svelte</code>
	but it's useful if you want to use <a href="/docs/events">events</a> to do some action.
</p>

<p>
	You can store your components inside the <code>lib</code> folder and use the <code>$lib</code>
	alias, so you can avoid doing <code>../../</code> and use
	<code>$lib/...</code> instead.
</p>

<h2>Slide Props</h2>

<p>
	These are the slide props you can pass to the <code>&lt;Slide&gt;</code> component. Some options
	for things like
	<a href="/docs/auto-animate">auto-animate</a> have their dedicated section you can learn more
	about.
</p>

<table>
	<tr>
		<th>Prop</th>
		<th>Description</th>
	</tr>

	<tr>
		<td><code>animate</code></td>
		<td>Animate elements between slides</td>
	</tr>

	<tr>
		<td><code>animateEasing</code></td>
		<td>Pass CSS easing</td>
	</tr>

	<tr>
		<td><code>animateUnmatched</code></td>
		<td>Animate elements that aren't a match</td>
	</tr>

	<tr>
		<td><code>animateId</code></td>
		<td>Change the animate id for a slide</td>
	</tr>

	<tr>
		<td><code>animateRestart</code></td>
		<td>Don't auto-animate from previous slide even if the animate id match</td>
	</tr>

	<tr>
		<td><code>background</code></td>
		<td>Set slide background color</td>
	</tr>

	<tr>
		<td><code>gradient</code></td>
		<td>Set gradient background</td>
	</tr>

	<tr>
		<td><code>image</code></td>
		<td>Set image background</td>
	</tr>

	<tr>
		<td><code>video</code></td>
		<td>Set video background</td>
	</tr>

	<tr>
		<td><code>iframe</code></td>
		<td>Set iframe background</td>
	</tr>

	<tr>
		<td><code>interactive</code></td>
		<td>Make iframe background interactive</td>
	</tr>

	<tr>
		<td><code>transition</code></td>
		<td>
			<code>none</code>, <code>fade</code>, <code>slide</code>, <code>convex</code>,
			<code>concave</code>, <code>zoom</code>
		</td>
	</tr>
</table>
