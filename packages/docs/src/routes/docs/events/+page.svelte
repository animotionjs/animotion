<script lang="ts">
	import { Animotion, Slide, Step } from '$lib/animotion'
	import CodeBlock from '$lib/components/code.svelte'

	export let data
</script>

<h1>Events</h1>

<h2>Custom Events</h2>

<p>
	<b>Animotion</b> provides <code>on:in</code> and <code>on:out</code> events for the
	<code>&lt;Slide&gt;</code>
	and <code>&lt;Step&gt;</code> components if you want to use JavaScript to trigger some behaviour.
</p>

<Animotion>
	<Slide>
		<p class="text-[100px] font-semibold">Events</p>
	</Slide>

	<Slide on:in={() => alert('slide in')} on:out={() => alert('slide out')}>
		<p class="text-[100px] font-semibold">Slide</p>

		<Step on:in={() => alert('step in')} on:out={() => alert('step out')}>Step</Step>
	</Slide>
</Animotion>

<CodeBlock code={data.examples[0]} />
