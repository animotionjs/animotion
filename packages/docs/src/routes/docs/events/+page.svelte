<script lang="ts">
	import { Animotion, Slide, Vertical } from '$lib/animotion'
	import { navigation } from '$lib/animotion/stores/navigation'
	import CodeBlock from '$lib/components/code.svelte'

	export let data
</script>

<h1>Events</h1>

<h2>Custom Events</h2>

<p>
	Because slides are already in the DOM, you can't rely on
	component lifecycle methods to trigger actions but you can use <b>events</b>.
</p>

<p>
	<b>Animotion</b> provides <code>on:in</code> and <code>on:out</code> events on the slide
	if you want to run some code when a slide enters or leaves the viewport.
</p>

<Animotion options={{ hash: true, history: true }}>
	<Slide>
		<p class="text-[100px] font-semibold">Events</p>
	</Slide>

	<Slide on:in={() => alert('in')} on:out={() => alert('out')}>
		<p class="text-[100px] font-semibold">Horizontal</p>
	</Slide>

	<Vertical>
		<Slide on:in={() => alert('in')} on:out={() => alert('out')}>
			<p class="text-[100px] font-semibold">Vertical</p>
		</Slide>
	</Vertical>
</Animotion>

<CodeBlock code={data.examples[0]} />

<h2>Navigation store</h2>

<p>
	<b>Animotion</b> uses a navigation store to know which slide you're on with additional information
	about the current slide which you can subscribe to inside of a component if you want.
</p>

<CodeBlock code={data.examples[1]} />

<p>
	Try changing the slides in the previous example to see the navigation store update for the page.
</p>

{#key $navigation}
	<pre class="surface-1">
{JSON.stringify($navigation, null, 2)}
	</pre>
{/key}
