<script lang="ts">
	import { Keynote, Slide, Code } from '$lib/keynote/index'
	import CodeBlock from '$lib/components/code.svelte'
</script>

<h1>Code blocks</h1>

<h2>Animating Code</h2>

<p>
	You can use the <code>&lt;Code&gt;</code> component and auto-animate the code. The
	<code>&lt;Code&gt;</code> component accepts a <code>lang</code> prop which supports close to 200 languages
	out of the box.
</p>

<Keynote>
	<Slide animate>
		<div class="mx-auto w-[400px]">
			<Code lang="html">
				{`
				<script>
				<\/script>
			`}
			</Code>
		</div>
	</Slide>

	<Slide animate>
		<div class="mx-auto w-[800px]">
			<Code lang="html">
				{`
				<script>
					let name = 'world'
				<\/script>
			`}
			</Code>
		</div>
	</Slide>

	<Slide animate>
		<div class="mx-auto w-[800px]">
			<Code lang="html">
				{`
				<script>
					let name = 'world'
				<\/script>

				<h1>Hello {name}!</h1>
			`}
			</Code>
		</div>
	</Slide>
</Keynote>

<CodeBlock lang="svelte">
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
</CodeBlock>

<h2>Indentation</h2>

<p>
	If you use tabs to indent the code you don't have to think about whitespace but in case you're
	using spaces for indentation you have to keep code at the start of a new line.
</p>

<p>👍️ Tabs:</p>

<CodeBlock lang="svelte">
	{`
		<Code lang="ts">
			{\`
				const bool = true
			\`}
		</Code>
	`}
</CodeBlock>

<p>💩 Spaces:</p>

<CodeBlock lang="svelte">
	{`
		<Code lang="ts">
			{\`
const bool = true
			\`}
		</Code>
	`}
</CodeBlock>

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
		<Code lang="html" lines="1,3|2">
			{`
				<script>
					let name = 'world'
				<\/script>
			`}
		</Code>
	</Slide>

	<Slide animate>
		<Code lang="html" offset="5" lines="2">
			{`
				<!-- ... -->
				<h1>Hello {name}!</h1>
			`}
		</Code>
	</Slide>
</Keynote>

<CodeBlock lang="html">
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
</CodeBlock>

<h2>Escaping Characters</h2>

<p>
	Svelte parses the template the same way as HTML is parsed so elements like the
	<code>&lt;script&gt;</code> tag are interpreted by the compiler because it thinks you're trying to
	close the first <code>&lt;script&gt;</code> tag.
</p>

<p>
	For that reason you have to escape the closing tag with a backslash <code>\</code> which looks
	like <code>&lt;\/script&gt;</code> and the same is true for the <code>&lt;style&gt;</code> tag.
</p>

<h2>Support For Other Languages</h2>

<p>
	By default <a href="https://highlightjs.org/">higlight.js</a> supports close to 200 languages but if
	your language is not supported you can add it.
</p>

<p>
	If you want to support other languages like Svelte you can look at <a
		href="https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md"
	>
		supported 3rd party languages
	</a> and copy the code directly for the language you want.
</p>

<p>
	If you want to add Svelte syntax highlighting for example, you can copy the contents of the <a
		href="https://github.com/AlexxNB/highlightjs-svelte/blob/master/src/svelte.js"
	>
		svelte.js
	</a>
	file to <code>lib/languages/svelte.ts</code> and register the language.
</p>

<p>Import and register the language inside <code>lib/languages/index.ts</code>.</p>

<CodeBlock lang="js">
	{`
		import { svelte } from './svelte'

		export function registerLanguages(hljs) {
			hljs.registerLanguage('svelte', svelte)
		}
	`}
</CodeBlock>

<p>
	If the language you want is not included you can look at the Svelte example provided by default
	and figure it out from there.
</p>

<style>
	:global(code > table) {
		font-size: 48px;
	}
</style>
