<script lang="ts">
	type Lines = string | boolean | null
	type Offset = string | null
	type Language = string | null

	export let id = 'code-animation'
	export let lines: Lines = true
	export let offset: Offset = null
	export let lang: Language = null

	delete $$restProps.class
</script>

<pre data-id={id} class={$$props.class || ''} {...$$restProps}>
  <code
		data-trim
		data-line-numbers={lines || null}
		data-ln-start-from={offset}
		class="language-{lang}">
<slot />
  </code>
</pre>
