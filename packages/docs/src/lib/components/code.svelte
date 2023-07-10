<script lang="ts">
	import Prism from 'prismjs'
	import { ClipboardIcon } from 'lucide-svelte'
	import './svelte'

	export let lang: string

	let clipboard: string

	function highlight(code: string, language: string) {
		return Prism.highlight(code, Prism.languages[language], 'html')
	}

	function highlightCode(code: string, lang: string) {
		if (!code) return

		// remove leading whitespace
		const twoTabs = '\t\t'

		return code
			.trim()
			.split('\n')
			.map((line) => line.replace(twoTabs, ''))
			.map(
				(line, i) =>
					`<div data-line="${i + 1}"><span class="code">${highlight(line, lang)}\n</span></div>`
			)
			.join('')
	}

	function highlighter(node: HTMLElement) {
		if (!node.textContent) return
		clipboard = node.textContent.trim()
		const html = highlightCode(node.textContent, lang)
		node.innerHTML = `
			<pre class="language-${lang}"><code class="language-${lang}">${html}</code></pre>
		`
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(clipboard)
	}
</script>

<div class="code-block">
	<div class="copy">
		<button on:click={copyToClipboard} aria-label="Copy code to clipboard">
			<ClipboardIcon size="20" aria-hidden="true" />
		</button>
	</div>

	<div class="code" use:highlighter>
		<slot />
	</div>
</div>

<style>
	.code-block {
		position: relative;
	}

	.code-block .copy {
		position: absolute;
		top: 8px;
		right: 8px;
		z-index: 10;
	}

	.code-block .copy button {
		padding: var(--size-1);
		color: var(--white-2);
		transition: scale 0.3s ease;
	}

	.code-block .copy button:active {
		scale: 0.8;
	}
</style>
