<script lang="ts">
	import { Keynote, Slide, Code as CodeBlock } from '$lib/keynote/index'
	import Code from '$lib/components/code.svelte'
</script>

<h1>Code blocks</h1>

<h2>Animating Code</h2>

<p>
	To show code you can use the <code>&lt;Code&gt;</code> component and auto-animate the code. The
	code component accepts a <code>lang</code> prop which supports every language supported by
	<a href="https://highlightjs.org/">highlight.js</a>.
</p>

<Keynote>
	<Slide animate>
		<div class="mx-auto w-[400px]">
			<CodeBlock lang="html">
				{`
				<script>
				<\/script>
			`}
			</CodeBlock>
		</div>
	</Slide>

	<Slide animate>
		<div class="mx-auto w-[800px]">
			<CodeBlock lang="html">
				{`
				<script>
					let name = 'world'
				<\/script>
			`}
			</CodeBlock>
		</div>
	</Slide>

	<Slide animate>
		<div class="mx-auto w-[800px]">
			<CodeBlock lang="html">
				{`
				<script>
					let name = 'world'
				<\/script>

				<h1>Hello {name}!</h1>
			`}
			</CodeBlock>
		</div>
	</Slide>
</Keynote>

<Code lang="svelte">
	{`
		<Slide animate>
			<div class="mx-auto w-[400px]">
				<Code lang="svelte">
					{\`
						<script>
						<\/script>
					\`}
				</Code>
			</div>
		</Slide>

		<Slide animate>
			<div class="mx-auto w-[800px]">
				<Code lang="html">
					{\`
						<script>
							let name = 'world'
						<\/script>
					\`}
				</Code>
			</div>
		</Slide>

		<Slide animate>
			<div class="mx-auto w-[800px]">
				<Code lang="html">
					{\`
						<script>
							let name = 'world'
						<\/script>

						<h1>Hello {name}!</h1>
					\`}
				</Code>
			</div>
		</Slide>
	`}
</Code>

<p>
	If you use tabs to indent the code you don't have to think about whitespace. In case you're using
	spaces for indentation you have to keep code at the start of a new line.
</p>

<h2>Line Highlights And Offsets</h2>

<p>
	You can animate line highlights using the <code>lines</code> prop and offset the line start by
	passing the <code>offset</code> prop.
</p>

<ul>
	<li><code>lines="1-4"</code> highlights lines 1 to 4</li>
	<li><code>lines="1,4"</code> highlights lines 1 and 4</li>
	<li>
		<code>lines="1-2|4"</code> first highlights lines 1 to 2 then highlight line 4
	</li>
</ul>

<Keynote>
	<Slide animate>
		<CodeBlock lang="html" lines="1,3|2">
			{`
				<script>
					let name = 'world'
				<\/script>
			`}
		</CodeBlock>
	</Slide>

	<Slide animate>
		<CodeBlock lang="html" offset="5" lines="2">
			{`
				<!-- ... -->
				<h1>Hello {name}!</h1>
			`}
		</CodeBlock>
	</Slide>
</Keynote>

<Code lang="html">
	{`
		<Slide animate>
			<Code lang="svelte" lines="1,3|2">
				{\`
					<script>
						let name = 'world'
					<\/script>
				\`}
			</Code>
		</Slide>

		<Slide animate>
			<Code lang="svelte" offset="5" lines="2">
				{\`
					<!-- ... -->
					<h1>Hello {name}!</h1>
				\`}
			</Code>
		</Slide>
	`}
</Code>

<h2>Escaping Characters</h2>

<p>
	Svelte parses the template the same way as HTML is parsed so elements like the
	<code>&lt;script&gt;</code> tag are interpreted by the compiler because it thinks you're trying to
	close the first <code>&lt;script&gt;</code> tag in which case you have to escape the closing slash
	with a backslash <code>\</code> which looks like <code>&lt;\/script&gt;</code>.
</p>

<p>
	This is a trade-off I'm okay with because it's way nicer to write code like this compared to
	passing it as a prop. To avoid this you could keep the code separate and pass it inside a
	variable.
</p>

<h2>Extending Languages</h2>

TODO

<style>
	:global(code > table) {
		font-size: 48px;
	}
</style>
