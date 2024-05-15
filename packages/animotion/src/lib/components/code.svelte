<script lang="ts">
	import type { Snippet } from 'svelte'

	type CodeProps = {
		children: Snippet
		lang: string
		id?: string
		lines?: boolean | string
		offset?: string
		steps?: Record<string, () => void>
	}

	let { children, id = 'code-animation', lines = true, offset, lang, steps }: CodeProps = $props()

	function listeners(el: HTMLPreElement) {
		if (!steps) return

		el.addEventListener('change', (e) => {
			for (const step in steps) {
				// @ts-ignore
				if (step === e.detail.step) steps[step]()
			}
		})
	}
</script>

<pre use:listeners data-id={id}>
  <code data-trim data-line-numbers={lines} data-ln-start-from={offset} class="language-{lang}">
{@render children()}
  </code>
</pre>
