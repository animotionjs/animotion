<script lang="ts">
	import { Keynote, Slide, Step } from '$lib/keynote'
	import Code from '$lib/components/code.svelte'
</script>

<h1>Math</h1>

<p>
	You can write formulas using <a href="https://katex.org/">KaTeX</a> and specify other
	<a href="https://revealjs.com/math/">options</a> for the Math plugin.
</p>

<Keynote>
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
</Keynote>

<Code lang="svelte">
	{`
		<script>
			import { Keynote, Slide, Step } from '@components'
		<\/script>

		<Presentation>
			<Slide>
				<p>
					The probability of getting {\`\\\\(k\\\\)\`} heads when flipping {\`\\\\(n\\\\)\`} coins
				</p>

				<Step>
					{\`
						\\\\[P(E) = {n \\\\choose k} p^k (1-p)^{ n-k} \\\\]
					\`}
				</Step>
			</Slide>
		</Presentation>
	`}
</Code>
