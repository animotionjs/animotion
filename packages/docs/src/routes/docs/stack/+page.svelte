<script lang="ts">
	import { Animotion, Slide, Stack, Step } from '$lib/animotion'
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Stack</h1>

<p>
	You can use the <code>&lt;Stack&gt;</code> component to stack things on top of each other.
</p>

<Animotion>
	<Slide>
		<Stack>
			<img src="https://picsum.photos/400/400" alt="Placeholder" />

			<Step>
				<img src="https://picsum.photos/500/300" alt="Placeholder" />
			</Step>

			<Step>
				<img src="https://picsum.photos/300/340" alt="Placeholder" />
			</Step>
		</Stack>
	</Slide>
</Animotion>

<Code code={data.examples[0]} />
