<script lang="ts">
	import { Embed as Presentation, Slide, Step } from '@animotion/core'
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
