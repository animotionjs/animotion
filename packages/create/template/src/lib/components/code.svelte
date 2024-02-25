<script lang="ts">
	type Lines = string | boolean | null
	type Offset = string | null
	type Language = string | null
	type Step = [string, () => void]

	export let id = 'code-animation'
	export let lines: Lines = true
	export let offset: Offset = null
	export let lang: Language = null
	export let steps: Step[] = []

	delete $$restProps.class

	function change(el: HTMLPreElement) {
		el.addEventListener('change', (e) => {
			for (const [lines, fn] of steps) {
				// @ts-ignore
				lines === e.detail.lines && fn()
			}
		})
	}
</script>

<pre
	use:change
	on:change
	data-id={id}
	class={$$props.class || ''}
	{...$$restProps}>
  <code
		data-trim
		data-line-numbers={lines || null}
		data-ln-start-from={offset}
		class="language-{lang}">
<slot />
  </code>
</pre>
