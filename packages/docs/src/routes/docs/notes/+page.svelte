<script lang="ts">
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Speaker notes</h1>

<p>
	You can write down notes inside the <code>&lt;Notes&gt;</code> component for the current slide
	which is only visible to you inside the speaker view if you press <code>S</code> on the keyboard.
</p>

<img src="/notes.png" alt="Speaker notes" />

<Code code={data.examples[0]} />
