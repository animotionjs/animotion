<script lang="ts">
	import {
		Presentation,
		Slide,
		Code,
		Media,
		Step,
		Stack,
		FitText,
		Stretch,
	} from '@components'

	// subscribers.svelte
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	import { confetti } from '@neoconfetti/svelte'

	const count = tweened(0, { duration: 1000, easing: cubicOut })
	const subscribers = 10_000

	$: showConfetti = $count === subscribers
</script>

<Presentation>
	<Slide>
		<h2>Stretch Example</h2>
		<Stretch src="./vite.svg" type="img" />
		<p>Image byline</p>
	</Slide>

	<Slide>
		<FitText type="h1">Fit Text</FitText>
		<FitText type="h2">Can be used for multiple headlines</FitText>
	</Slide>

	<Slide>
		<Step fadeRight>Fade in</Step>
		<Step fadeOut>Fade out</Step>
		<Step highlightRed>Highlight red</Step>
		<Step fadeInThenOut>Fade in, then out</Step>
		<Step fadeUp>Slide up while fading in</Step>

		<Step fadeIn>
			<Step highlightRed>
				<Step fadeOut>Fade in > Turn red > Fade out</Step>
			</Step>
		</Step>
	</Slide>

	<Slide>
		<p>
			The probability of getting {`\\(k\\)`} heads when flipping {`\\(n\\)`} coins
		</p>

		<div class="fragment">
			{`
				\\[P(E)   = {n \\choose k} p^k (1-p)^{ n-k} \\]
			`}
		</div>
	</Slide>

	<Slide animate>
		<Code lang="svelte">
			{`
				<script lang="ts">
					let count = 0
				<\/script>

				<button on:click={() => count += 1}>
					{count}
				</button>
			`}
		</Code>
	</Slide>

	<Slide animate>
		<Code lang="svelte">
			{`
				<Slide animate>
				</Slide>
			`}
		</Code>
	</Slide>

	<Slide animate>
		<Code lang="svelte" lines="2-3">
			{`
				<Slide animate>
					<Code lang="js">
					</Code>
				</Slide>
			`}
		</Code>
	</Slide>

	<Slide animate>
		<Code lang="svelte" lines="3-5">
			{`
				<Slide animate>
					<Code lang="js">
						{\`
							let bool;
						\`}
					</Code>
				</Slide>
			`}
		</Code>
	</Slide>

	<Slide animate animateRestart>
		<Code lang="svelte" lines="3-5|1-7">
			{`
				<Slide animate>
					<Code lang="js">
						{\`
							let bool = true;
						\`}
					</Code>
				</Slide>
			`}
		</Code>
	</Slide>
</Presentation>

<!-- 
<Presentation>
	<Slide animate>
		<Code>
			{`
				const bool;
			`}
		</Code>
	</Slide>

	<Slide animate animateRestart>
		<Code>
			{`
				const bool = true;
			`}
		</Code>
	</Slide>

	<Slide animate>
		<Code lines="1|2" offset="4">
			{`
				const bool = true;
				// ...
			`}
		</Code>
	</Slide>

	<Slide animate>
		<p class="text-4xl">Subscribers</p>
	</Slide>

	<Slide
		on:active={() => ($count = subscribers)}
		on:inactive={() => ($count = 0)}
		animate
	>
		<p class="text-6xl">Subscribers</p>
		<p class="text-8xl mt-16 font-bold">
			{$count.toLocaleString('en', { maximumFractionDigits: 0 })}
		</p>

		{#if showConfetti}
			<div class="absolute top-1/2 left-1/2">
				<div use:confetti={{ particleCount: 200 }} />
			</div>
		{/if}
	</Slide>
</Presentation> -->
