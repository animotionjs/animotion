<script lang="ts">
	import { Keynote, Slide, Step } from '$lib/keynote'
	import Code from '$lib/components/code.svelte'
</script>

<h1>Step</h1>

<p>You can use steps (fragments) to reveal individual elements on a slide.</p>

<Keynote>
	<Slide>
		<Step fadeUp>No care in the world</Step>
		<Step fadeRight>Maybe I'm learning</Step>
		<Step fadeLeft>Why the sea on the tide</Step>
		<Step fadeDown>Has no way of turning</Step>
	</Slide>
</Keynote>

<Code lang="svelte">
	{`
		<script>
			import { Presentation, Slide, Step } from '@components'
		<\/script>

		<Presentation>
			<Slide>
				<Step fadeUp>No care in the world</Step>
				<Step fadeRight>Maybe I'm learning</Step>
				<Step fadeLeft>Why the sea on the tide</Step>
				<Step fadeDown>Has no way of turning</Step>
			</Slide>
		</Presentation>
	`}
</Code>

<p>Here are the available effects as props:</p>

<table>
	<tr>
		<th>Prop</th>
		<th>Description</th>
	</tr>

	<tr>
		<td><code>type</code></td>
		<td>Change tag</td>
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

<Keynote>
	<Slide>
		<Step class="custom blur">I could feel at the time</Step>
		<Step class="custom blur">There was no way of knowing</Step>
		<Step class="custom blur">Fallen leaves in the night</Step>
		<Step class="custom blur">Who can say where they're blowing</Step>
	</Slide>
</Keynote>

<Code lang="svelte">
	{`
		<script>
			import { Presentation, Slide, Step } from '@components'
		<\/script>

		<Presentation>
			<Slide>
				<Step class="custom blur">I could feel at the time</Step>
				<Step class="custom blur">There was no way of knowing</Step>
				<Step class="custom blur">Fallen leaves in the night</Step>
				<Step class="custom blur">Who can say where they're blowing</Step>
			</Slide>
		</Presentation>

		<\style>
			:global(.fragment.blur) {
				filter: blur(5px);
			}

			:global(.fragment.blur.visible) {
				filter: none;
			}
		<\/style>
	`}
</Code>

<h2>Nested steps</h2>

<p>You can also have nested steps.</p>

<Keynote>
	<Slide>
		<Step fadeIn>
			<Step semiFadeOut>
				<Step fadeOut>Fade in > Fade 50% > Fade out</Step>
			</Step>
		</Step>
	</Slide>
</Keynote>

<Code lang="svelte">
	{`
		<script>
			import { Presentation, Slide, Step } from '@components'
		<\/script>

		<Presentation>
			<Slide>
				<Step fadeIn>
					<Step semiFadeOut>
						<Step fadeOut>
							Fade in > Fade 50% > Fade out
						</Step>
					</Step>
				</Step>
			</Slide>
		</Presentation>
	`}
</Code>

<h2>Step order</h2>

<p>You can change the step order with the <code>order</code> attribute.</p>

<Keynote>
	<Slide>
		<Step order="3">Last</Step>
		<Step order="1">First</Step>
		<Step order="2">Second</Step>
	</Slide>
</Keynote>

<Code lang="svelte">
	{`
		<script>
			import { Presentation, Slide, Step } from '@components'
		<\/script>

		<Presentation>
			<Slide>
				<Step order="3">Last</Step>
				<Step order="1">First</Step>
				<Step order="2">Second</Step>
			</Slide>
		</Presentation>
	`}
</Code>

<style>
	:global(.fragment.blur) {
		filter: blur(5px);
	}

	:global(.fragment.blur.visible) {
		filter: none;
	}
</style>
