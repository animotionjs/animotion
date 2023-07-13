<script lang="ts">
	import { Keynote, Slide, Media } from '$lib/keynote/index'
	import Code from '$lib/components/code.svelte'
</script>

<h1>Media</h1>

<p>
	The <code>&lt;Media&gt;</code> component is mostly useful if you have a lot of slides and want to lazy
	load a video, image or iframe since you can just use regular HTML to do the same thing.
</p>

<Keynote>
	<Slide>
		<Media class="h-[600px] w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" type="iframe" />
	</Slide>
</Keynote>

<Code lang="svelte">
	{`
		<script>
			import { Keynote, Slide, Media } from '@components'
		<\/script>

		<Presentation>
			<Slide>
				<Media
					class="h-[600px] w-full"
					src="https://www.youtube.com/embed/dQw4w9WgXcQ"
					type="iframe"
				/\>
			</Slide>
		</Presentation>
	`}
</Code>

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
		<td><code>video</code>, <code>image</code>, <code>iframe</code></td>
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
