<script lang="ts">
	import { Animotion, Slide, Media } from '$lib/animotion'
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Media</h1>

<p>
	The <code>&lt;Media&gt;</code> component is mostly useful if you have a lot of slides and want to lazy
	load a video, image or iframe since you can just use regular HTML to do the same thing.
</p>

<Animotion>
	<Slide>
		<Media class="h-[600px] w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" type="iframe" />
	</Slide>
</Animotion>

<Code code={data.examples[0]} />

<p>
	Here are the options you can pass to the <code>&ltMedia&gt;</code> component:
</p>

<table>
	<tr>
		<th>Prop</th>
		<th>Description</th>
	</tr>

	<tr>
		<td><code>type</code></td>
		<td><code>video</code>, <code>img</code>, <code>iframe</code></td>
	</tr>

	<tr>
		<td><code>src</code></td>
		<td>URL or path to local file</td>
	</tr>

	<tr>
		<td><code>autoplay</code></td>
		<td>Start playing the media when the slide shows</td>
	</tr>

	<tr>
		<td><code>preload</code></td>
		<td>Lazy load iframe</td>
	</tr>
</table>
