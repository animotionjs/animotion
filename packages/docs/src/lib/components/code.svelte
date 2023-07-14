<script lang="ts">
	import { ClipboardIcon } from 'lucide-svelte'

	export let code: string

	function getContent(html: string) {
		return new DOMParser().parseFromString(html, 'text/html').documentElement.textContent!
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(getContent(code))
	}
</script>

<div class="code-block">
	<div class="copy">
		<button on:click={copyToClipboard} aria-label="Copy code to clipboard">
			<ClipboardIcon size="20" aria-hidden="true" />
		</button>
	</div>

	{@html code}
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
