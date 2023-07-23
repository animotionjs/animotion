<script lang="ts">
	import { Animotion, Slide, Step } from '$lib/animotion'
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Math</h1>

<p>
	You can write formulas using <a href="https://katex.org/">KaTeX</a> and specify other
	<a href="https://revealjs.com/math/">options</a> for the Math plugin.
</p>

<Animotion>
	<Slide>
		<p>
			The probability of getting {`\\(k\\)`} heads when flipping {`\\(n\\)`} coins
		</p>

		<Step>
			{`
				\\[P(E) = {n \\choose k} p^k (1-p)^{ n-k} \\]
			`}
		</Step>
	</Slide>
</Animotion>

<Code code={data.examples[0]} />
