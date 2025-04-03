<script lang="ts">
	import CodeBlock from './code.svelte'
</script>

# Code

## Animating code

The `<Code>` component uses [Shiki](https://shiki.style/) for beautiful syntax highlighting:

<CodeBlock />

```svelte
<script lang="ts">
	import { Presentation, Slide, Code, Action } from '@animotion/core'

	let code: ReturnType<typeof Code>
</script>

<Presentation>
	<Slide class="h-full place-content-center place-items-center">
		<Code
			bind:this={code}
			lang="svelte"
			theme="poimandres"
			code={`
				<script>
					let count = 0
					$: double = count * 2
				<\/script>

				<button on:click={() => count++}>
					{double}
				</button>
			`}
			options={{ duration: 1000, stagger: 0.3, lineNumbers: true, containerStyle: false }}
		/>

		<Action
			do={() =>
				code.update`
					<script>
						let count = $state(0)
						let double = $derived(count * 2)
					<\/script>

					<button onclick={() => count++}>
						{double}
					</button>
				`}
		/>

		<Action do={() => code.selectLines`2,3`} />
		<Action do={() => code.selectLines`2-3,7`} />
		<Action do={() => code.selectToken`double {double}`} />
		<Action do={() => code.selectLines`*`} />
	</Slide>
</Presentation>
```

You can pick one of many themes that come with Shiki, choose a language, and provide options to the `<Code />` component.

## Animating Code Changes

You can animate changes in your code by using the `update` method:

```ts
code.update`
	<script>
		let count = $state(0)
		let double = $derived(count * 2)
	<\/script>

	<button onclick={() => count++}>
		{double}
	</button>
`}
```

Animotion uses [Shiki Magic Move](https://shiki-magic-move.netlify.app/) to animate the code changes which does the diffing to know what changed, and then animates the changes.

## Code Highlighting

You can highlight lines:

```ts
// select line
code.selectLines`2`
// select multiple lines
code.selectLines`2,3`
// select lines range
code.selectLines`2-3`
// select lines range and lines
code.selectLines`2-3,7`
// select all lines
code.selectLines`*`
```

You can highlight tokens (inspect the code to see what token you can select):

```ts
// select token
code.selectToken`double`
// select token on line
code.selectToken`3 double`
// select multiple tokens
code.selectToken`double {double}`
```

The methods return a promise that is resolved when the transition is done:

```svelte
<Action do={async () => {
	await code.selectLines`2,3`
	await code.selectLines`2-3,7`
	await code.selectToken`double {double}`
	await code.selectLines`*`
}} />
```


## Using Expressions

You can use expressions inside the template function:

```svelte
<script lang="ts">
	let expression = 'false'
</script>

<!-- ... -->

<Action
	do={() => {
		expression = 'true'
		code.update`let bool = ${expression}`		
	}}
>
```

## Code Indentation

Indenting code creates extra whitespace:

```svelte
<Code
	code={`
->-><script>
->->->let count = 0
->->->$: double = count * 2
->-><\/script>

->-><button on:click={() => count++}>
->->->{double}
->-></button>
	`}
/>
```

If you use tabs Animotion auto-indents your code for you:

```svelte
<Code
	code={`
		<script>
		->let count = 0
		->$: double = count * 2
		<\/script>
		<button on:click={() => count++}>
		->{double}
		</button>
	`}
/>
```

If you want to opt-out of this feature, you can set `autoIndent` to false:


```svelte
<Code	autoIndent={false} />
```


## Chaining code animations

Instead of creating actions for the code animations yourself, you can use the `codes` prop to create them for you:

```svelte
<script lang="ts">
	import { Code } from '@animotion/core'

	// get a reference to the instance
	let code: ReturnType<typeof Code>
</script>

<Code
	ref={(ref) => code = ref}
	lang="svelte"
	theme="poimandres"
	codes={[
		`
			<script>
				let count = 0
				$: double = count * 2
			<\/script>

			<button on:click={() => count++}>
				{double}
			</button>
		`,
		`
			<script>
				let count = $state(0)
				let double = $derived(count * 2)
			<\/script>

			<button onclick={() => count++}>
				{double}
			</button>
		`
	]}
/>

<Action
	undo={() => {
		code.selectLines`*`
	}}
	actions={[
		() => code.selectLines`2,3`,
		() => code.selectLines`2-3,7`,
		() => code.selectToken`double {double}`,
		() => code.selectLines`*`
	]}
/>
```

## Escape closing tags

Having a closing tag like `</script>` in your code block is going to cause problems because Svelte thinks you're trying to close the `<script>` tag in your component. To solve this problem use the backslash character to escape it:

```svelte
<Code>
  code={`
    <script>
      // ...
    <\/script>
  `}
<Code>
```
