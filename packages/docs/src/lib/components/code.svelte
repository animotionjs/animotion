<script lang="ts">
	import Prism from 'prismjs'
	import './theme.postcss'
	import { ClipboardCopyIcon, ClipboardIcon, SaveIcon } from 'lucide-svelte'

	export let lang: string
	let code: string

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
					`<div data-line="${i + 1}"><span class="code">${highlight(line, lang)}</span></div>`
			)
			.join('')
	}

	function highlight(code: string, language: string) {
		return Prism.highlight(code, Prism.languages[language], 'html')
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(code)
	}

	$: highlightedCode = highlightCode(code, lang)
</script>

<div bind:textContent={code} class="hide" contenteditable>
	<slot />
</div>

{#if highlightedCode}
	<div class="code-block">
		<div class="copy">
			<button on:click={copyToClipboard} aria-label="Copy code to clipboard">
				<ClipboardIcon size="20" aria-hidden="true" />
			</button>
		</div>

		<pre class="language-{lang}"><code class="language-{lang}">{@html highlightedCode}</code></pre>
	</div>
{/if}

<style>
	.code-block {
		position: relative;
	}

	.copy {
		position: absolute;
		top: 8px;
		right: 8px;
		z-index: 10;
	}

	.copy button {
		padding: var(--size-1);
		transition: scale 0.3s ease;
	}

	.copy button:active {
		scale: 0.8;
	}
</style>
