<script lang="ts">
	import { Animotion, Slide, Step } from '$lib/animotion'
	import Code from '$lib/components/code.svelte'

	export let data
</script>

<h1>Step</h1>

<p>You can use steps, or fragments to reveal individual elements on a slide.</p>

<Animotion>
	<Slide>
		<Step fadeUp>No care in the world</Step>
		<Step fadeRight>Maybe I'm learning</Step>
		<Step fadeLeft>Why the sea on the tide</Step>
		<Step fadeDown>Has no way of turning</Step>
	</Slide>
</Animotion>

<Code code={data.examples[0]} />

<p>Here are the available effects as props:</p>

<table>
	<tr>
		<th>Prop</th>
		<th>Description</th>
	</tr>

	<tr>
		<td><code>on:in</code></td>
		<td>Step is shown event</td>
	</tr>

	<tr>
		<td><code>on:out</code></td>
		<td>Step is hidden event</td>
	</tr>

	<tr>
		<td><code>order</code></td>
		<td>Order of nested steps</td>
	</tr>

	<tr>
		<td><code>fadeIn</code></td>
		<td>Fade in</td>
	</tr>

	<tr>
		<td><code>fadeOut</code></td>
		<td>Fade out</td>
	</tr>

	<tr>
		<td><code>fadeUp</code></td>
		<td>Slide up while fading in</td>
	</tr>

	<tr>
		<td><code>fadeDown</code></td>
		<td>Slide down while fading in</td>
	</tr>

	<tr>
		<td><code>fadeLeft</code></td>
		<td>Slide left while fading in</td>
	</tr>

	<tr>
		<td><code>fadeRight</code></td>
		<td>Slide right while fading in</td>
	</tr>

	<tr>
		<td><code>fadeInThenOut</code></td>
		<td>Fade in, then out on the next step</td>
	</tr>

	<tr>
		<td><code>currentVisible</code></td>
		<td>Fades in, then out on the next step</td>
	</tr>

	<tr>
		<td><code>fadeInThenSemiOut</code></td>
		<td>Fades in, then to 50% on the next step</td>
	</tr>

	<tr>
		<td><code>semiFadeOut</code></td>
		<td>Fade out to 50%</td>
	</tr>

	<tr>
		<td><code>highlightRed</code></td>
		<td>Turns text red</td>
	</tr>

	<tr>
		<td><code>highlightGreen</code></td>
		<td>Turns text green</td>
	</tr>

	<tr>
		<td><code>highlightBlue</code></td>
		<td>Turns text blue</td>
	</tr>

	<tr>
		<td><code>highlightCurrentRed</code></td>
		<td>Turn text red, then back to original on next step</td>
	</tr>

	<tr>
		<td><code>highlightCurrentGreen</code></td>
		<td>Turn text green, then back to original on next step</td>
	</tr>

	<tr>
		<td><code>highlightCurrentBlue</code></td>
		<td>Turn text blue, then back to original on next step</td>
	</tr>

	<tr>
		<td><code>grow</code></td>
		<td>Scale up</td>
	</tr>

	<tr>
		<td><code>shrink</code></td>
		<td>Scale down</td>
	</tr>

	<tr>
		<td><code>strike</code></td>
		<td>Strike through</td>
	</tr>
</table>

<h2>Custom steps</h2>

<p>
	You can make a custom step using CSS by passing a <code>custom</code> class and the class you created.
</p>

<Animotion>
	<Slide>
		<Step class="custom blur">No care in the world</Step>
		<Step class="custom blur">Maybe I'm learning</Step>
		<Step class="custom blur">Why the sea on the tide</Step>
		<Step class="custom blur">Has no way of turning</Step>
	</Slide>
</Animotion>

<Code code={data.examples[1]} />

<h2>Nested steps</h2>

<p>You can also have nested steps.</p>

<Animotion>
	<Slide>
		<Step fadeIn>
			<Step semiFadeOut>
				<Step fadeOut>Fade in > Fade 50% > Fade out</Step>
			</Step>
		</Step>
	</Slide>
</Animotion>

<Code code={data.examples[2]} />

<h2>Step order</h2>

<p>You can change the step order with the <code>order</code> attribute.</p>

<Animotion>
	<Slide>
		<Step order="3">Last</Step>
		<Step order="1">First</Step>
		<Step order="2">Second</Step>
	</Slide>
</Animotion>

<Code code={data.examples[3]} />

<style>
	:global(.fragment.blur) {
		filter: blur(5px);
	}

	:global(.fragment.blur.visible) {
		filter: none;
	}
</style>
