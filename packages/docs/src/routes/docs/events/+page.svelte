<script lang="ts">
	import { Keynote, Slide, Vertical } from '$lib/keynote'
	import CodeBlock from '$lib/components/code.svelte'
	import { navigation } from '$lib/keynote/stores/navigation'
</script>

<h1>Events</h1>

<h2>Custom Events</h2>

<p>
	Slides are always present in the DOM because of how Reveal works meaning you can't rely on
	lifecycle methods from components to trigger actions but you can use events.
</p>

<p>
	<b>Keynote</b> provides a <code>on:in</code> and <code>on:out</code> event listener on the slide if
	you want to run some code when a slide enters or leaves.
</p>

<Keynote options={{ hash: true, history: true }}>
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
</Keynote>

<CodeBlock lang="svelte">
	{`
		<script>
			import { Presentation, Slide, Vertical } from '@components'
		<\/script>

		<Presentation>
			<Slide
				on:in={() => console.log('in')}
				on:out={() => console.log('out')}
			>
				Horizontal
			</Slide>

			<Vertical>
				<Slide
					on:in={() => console.log('in')}
					on:out={() => console.log('out')}
				>
					Vertical
				</Slide>
			</Vertical>
		</Presentation>
	`}
</CodeBlock>

<h2>Navigation store</h2>

<p>
	<b>Keynote</b> uses a navigation store to know which slide you're on with additional information about
	the current slide which you can subscribe to inside of a component if you want.
</p>

<CodeBlock lang="svelte">
	{`
		<script>
			import { navigation } from '@stores/navigation'
		<\/script>

		<pre>
			{JSON.stringify($navigation, null, 2)}
		</pre>
	`}
</CodeBlock>

<p>
	Try changing the slides in the previous example to see the navigation store update on the page.
</p>

{#key $navigation}
	<CodeBlock lang="text">
		{`
 			${JSON.stringify($navigation, null, 2)}
		`}
	</CodeBlock>
{/key}
