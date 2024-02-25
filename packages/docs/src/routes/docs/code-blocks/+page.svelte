<script lang="ts">
	import { Animotion, Slide, Code } from '$lib/animotion'
	import CodeBlock from '$lib/components/code.svelte'

	export let data
</script>

<h1>Code blocks</h1>

<h2>Animating Code</h2>

<p>
	You can use the <code>&lt;Code&gt;</code> component and auto-animate the code. The
	<code>&lt;Code&gt;</code> component accepts a <code>lang</code> prop which supports close to 200 languages
	out of the box.
</p>

<Animotion>
	<Slide animate>
		<div class="mx-auto w-[800px]">
			<Code lang="html">
				{`
					<script>
						let count = 0
						$: double = count * 2
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
						let count = 0
						$: double = count * 2
					<\/script>

					<button on:click={() => count += 1}>
						{double}
					</button>
				`}
			</Code>
		</div>
	</Slide>
</Animotion>

<CodeBlock code={data.examples[0]} />

<h2>Indentation</h2>

<p>If you use tabs to indent the code you don't have to think about whitespace.</p>

<CodeBlock code={data.examples[1]} />

<p>If you use spaces for indentation the code has to be at the start of a new line.</p>

<CodeBlock code={data.examples[2]} />

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

<Animotion>
	<Slide animate>
		<div class="mx-auto w-[500px]">
			<Code lang="html" lines="2|3">
				{`
					<script>
						let count = 0
						$: double = count * 2
					<\/script>
				`}
			</Code>
		</div>
	</Slide>

	<Slide animate>
		<div class="mx-auto w-[800px]">
			<Code lang="html" lines="6,8|3,7|1-8">
				{`
					<script>
						let count = 0
						$: double = count * 2
					<\/script>

					<button on:click={() => count += 1}>
						{double}
					</button>
				`}
			</Code>
		</div>
	</Slide>
</Animotion>

<CodeBlock code={data.examples[3]} />

<h2>Highlighted Code Animations</h2>

<p>
	You can provide a <code>steps</code> prop to specify what animations you want to play based on the
	currently highlighted line.
</p>

<CodeBlock code={data.examples[4]} />

<p>
	You can also use the <code>on:change</code>
	event listener and pass a callback function if you want access to the custom event, and data inside
	<code>e.detail</code>.
</p>

<CodeBlock code={data.examples[5]} />

<h2>Code Block Height</h2>

<p>
	Inside <code>theme.css</code> the <code>max-height</code> property is required for the animated code
	scrolling effect but you can remove it in case you want to set the height yourself.
</p>

<CodeBlock code={data.examples[6]} />

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

<p>Update <code>lib/languages/index.ts</code> to register the language.</p>

<CodeBlock code={data.examples[7]} />

<p>
	If the language you want is not included you can look at the provided Svelte example and figure it
	out from there.
</p>

<style>
	:global(code > table) {
		font-size: 32px;
	}
</style>
