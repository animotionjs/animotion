<script lang="ts">
	import { Animotion, Slide } from "$lib/animotion"
	import CodeBlock from "$lib/components/code.svelte"
	import { all, signal } from '$lib/motion'

	export let data

	let circleX = signal(0)
	async function animateValues()	{
		await circleX.to(400).to(0)
		animateValues()
 	}
	animateValues()

	let textScale = signal(1, { duration: 2000 })
	async function animateStyle()	{
		await textScale.to(3).to(1)
		animateStyle()
 	}
	animateStyle()

	let circle = signal(
    { x: 0, y: 200, r: 100, fill: '#00ffff' },
    { duration: 1500 }
  )
	async function animateMultipleValues() {
    await circle
      .to({ x: 400, fill: '#ffff00' }, { delay: 300 })
      .to({ x: 0, fill: '#00ffff' })
		animateMultipleValues()
  }
	animateMultipleValues()

	let circleText = signal({ x: 0, y: 200, r: 100, fill: '#00ffff' }, { duration: 2000 })
	let textCount = signal({ count: 0 }, { duration: 2000 })
	async function animateCombined() {
		all(
			circleText
				.to({ x: 400, fill: '#ffff00' })
				.to({ x: 0, fill: '#00ffff' }),
				textCount.to({ count: 400 }).to({ count: 0 })
		)
		animateCombined()
  }
	animateCombined()
</script>

<h1>Motion</h1>

<h2>What Is Motion?</h2>

<p>
	<b>Animotion</b> is great for <a href="/docs/auto-animate">animating layouts</a> and
	<a href="/docs/code-blocks">code blocks</a>, but
	<b>Motion</b> is the missing piece for doing animations.
</p>

<p>
	Instead of being limited to animating CSS properties using a JavaScript animation library, or the
	<a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API">
		Web Animations API
	</a>, it uses values that change over time.
</p>

<h2>Animating Values</h2>

<p>
	You can use a <b>signal</b> to create a value that changes over time.
</p>

<p>
	Animate the value using the <code>to</code> method, and use the <code>await</code> keyword to
	start the animation. The next animation only plays once the previous animation is done. You can
	chain multiple <code>to</code> methods together.
</p>

<Animotion>
	<Slide>
		<svg class="w-full h-[400px]" viewBox="0 0 400 400">
			<circle cx={$circleX} cy={200} r={100} fill="#00ffff" />
		</svg>
	</Slide>
</Animotion>

<CodeBlock code={data.examples[0]} />

<p>
	You can animate <b>any value</b>, including CSS properties using the <code>style</code> tag, or
	Svelte's
	<code>style:</code> directive.
</p>

<Animotion>
	<Slide>
		<h1 style:scale={$textScale}>Motion</h1>
	</Slide>
</Animotion>

<CodeBlock code={data.examples[1]} />

<h2>Animating Multiple Values</h2>

<p>
	A <b>signal</b> can be a single value, or an object which can interpolate between strings,
	objects, and arrays — it also accepts an options object that includes a
	<b>duration</b>,
	<b>delay</b>, and <b>easing</b> option, and override the options for each animation.
</p>

<Animotion>
	<Slide>
		<svg class="w-full h-[400px]" viewBox="0 0 400 400">
			<circle cx={$circle.x} cy={$circle.y} r={$circle.r} fill={$circle.fill} />
		</svg>
	</Slide>
</Animotion>

<CodeBlock code={data.examples[2]} />

<h2>Combining Animations</h2>

<p>
	You can animate different <code>signals</code> at the same using the <code>all</code> method.
</p>

<Animotion>
	<Slide>
		<svg class="w-full h-[400px]" viewBox="0 0 400 400">
			<circle cx={$circleText.x} cy={$circleText.y} r={$circleText.r} fill={$circleText.fill} />

			<text
				x={$circleText.x}
				y={$circleText.y}
				font-size={$circleText.r * 0.4}
				font-family="JetBrains Mono"
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{$textCount.count.toFixed(0)}
			</text>
		</svg>
	</Slide>
</Animotion>

<CodeBlock code={data.examples[3]} />

<h2>Playing Sounds</h2>

<p>
	Besides playing animations you can play sounds using the <code>sfx</code> method.
</p>

<p>
	After you place your sounds in the <code>public</code> folder at the root of your project, they
	become available from the root path <code>/</code> of your site.
</p>

<CodeBlock code={data.examples[4]} />

<h2>Animation Reset</h2>

<p>
	If you mess up your delivery, instead of reloading the slide to reset the state of your animation,
	use the <code>reset</code> method on the
	<code>signal</code> to reset the animation back to its initial state.
</p>

<CodeBlock code={data.examples[5]} />
