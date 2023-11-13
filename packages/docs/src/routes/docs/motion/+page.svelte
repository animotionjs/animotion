<h1>Motion</h1>

<h2>Bespoke Animations</h2>

<p>
	<b>Animotion</b> is great for <a href="/docs/auto-animate">animating layouts</a> and
	<a href="/docs/code-blocks">code blocks</a>, but
	<b>Motion</b> is the missing piece for doing animations (docs are a work in progress).
</p>

<p>
	Instead of being limited to animating CSS with a JavaScript animation library, or the <a
		href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API">Web Animations API</a
	>, it uses values that change over time.
</p>

<h2>Methods</h2>

<p>These are the methods you can use:</p>

<ul>
	<li>
		<code>animate</code> is an <code>onMount</code> wrapper, but you can use any async function to define
		the animation
	</li>

	<li>
		<code>signal</code> is the value over time which can be a single value, such as
		<code>signal(0)</code>, or an object <code>signal(&#123; count: 0 &#125;)</code>
	</li>

	<li>
		<code>all</code> is a helper function used to play animations at the same time (you can use await
		in front of it)
	</li>

	<li>
		<code>reset</code> is a helper function to reset the animation to its default values
	</li>
</ul>

<h2>Usage</h2>

<p>Here is how to use <b>Motion</b>:</p>

<ul>
	<li>
		To start an animation use the <code>await</code> keyword
	</li>

	<li>
		Use <code>to</code> on a <code>signal</code> to animate values, and <code>sfx</code> to play sounds
	</li>

	<li>
		<code>to</code> and <code>sfx</code> are chainable
	</li>

	<li>
		<code>signal</code> and <code>to</code> accept an options object for <code>duration</code>,
		<code>delay</code>, and <code>easing</code>
	</li>
</ul>

<p>Try it out in the default <b>Animotion</b> example.</p>
