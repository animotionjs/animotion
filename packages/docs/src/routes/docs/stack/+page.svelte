<script lang="ts">
	import { Keynote, Slide, Stack, Step } from '$lib/keynote'
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Stack</h1>

<p>
	You can use the <code>&lt;Stack&gt;</code> component to stack things on top of each other.
</p>

<Keynote>
	<Slide>
		<Stack>
			<img src="https://place-puppy.com/400x400" alt="Placeholder" />

			<Step>
				<img src="https://place-puppy.com/500x300" alt="Placeholder" />
			</Step>

			<Step>
				<img src="https://place-puppy.com/300x340" alt="Placeholder" />
			</Step>
		</Stack>
	</Slide>
</Keynote>

<Code code={data.examples[0]} />
