<script lang="ts">
	import Formula from './formula.svelte'
</script>

# Math

You can use [KaTeX](https://katex.org/) to write math formulas.

<Formula />

```svelte
<script>
  import { Animotion, Slide, Step } from '@animotion/core'
</script>

<Presentation>
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
</Presentation>
```
