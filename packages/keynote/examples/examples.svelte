<Slide animate>
	<Code lang="ts">
		{`
				let planets = []			
			`}
	</Code>
</Slide>

<Slide animate>
	<Code lang="ts">
		{`
				let planets = [
					{ name: 'mars', diameter: 6779 },
				]			
			`}
	</Code>
</Slide>

<Slide animate>
	<Code lang="ts">
		{`
				let planets = [
					{ name: 'mars', diameter: 6779 },
					{ name: 'earth', diameter: 12742 },
					{ name: 'jupiter', diameter: 139820 }
				]			
			`}
	</Code>
</Slide>

<CircleGuide />

<Slide animateRestart>
	<h1>Hi</h1>
</Slide>

<Slide transition="convex">
	<h1>Text 1</h1>
</Slide>

<Slide transition="convex">
	<h1>Text 1</h1>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit quia illum
		consequuntur voluptas repellendus veritatis, eos veniam atque dolores amet
		dolorum obcaecati. Placeat possimus error incidunt necessitatibus ratione
		natus repudiandae.
	</p>
</Slide>

<Slide>
	<h2>Stretch Example</h2>
	<Stretch class="mx-auto" type="img" src="./vite.svg" />
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
