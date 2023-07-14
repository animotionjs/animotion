<script lang="ts">
	import { base } from '$app/paths'
	import Code from '$lib/components/code.svelte'
</script>

<h1>Speaker notes</h1>

<p>
	You can write down notes inside the <code>&lt;Notes&gt;</code> component for the current slide
	which is only visible to you inside the speaker view if you press <code>S</code> on the keyboard.
</p>

<img src="{base}/notes.png" alt="Speaker notes" />

<Code lang="svelte">
	{`
		<script>
			import { Presentation, Slide, Notes } from '@components'
		<\/script>

		<Presentation>
			<Slide>
				Horizontal 1
				<Notes>Don't make eye contact</Notes>
			</Slide>

			<Slide>Horizontal 2</Slide>
		</Presentation>
	`}
</Code>
