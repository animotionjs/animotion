<script lang="ts">
	import { Animotion, Slide, Vertical } from '$lib/animotion'
	import CodeBlock from '$lib/components/code.svelte'

	export let data
</script>

<h1>Events</h1>

<h2>Custom Events</h2>

<p>
	Because slides are already in the DOM, you can't rely on component lifecycle methods to trigger
	actions but you can use <b>events</b>.
</p>

<p>
	<b>Animotion</b> provides <code>on:in</code> and <code>on:out</code> events for the
	<code>&lt;Slide&gt;</code>
	and <code>&lt;Step&gt;</code> components which is useful when it comes to animations.
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
