<script lang="ts">
	type Lines = string | boolean | null
	type Offset = string | null

	export let id = 'animated-code'
	export let lines: Lines = true
	export let offset: Offset = null
</script>

<pre data-id={id} {...$$props}>
  <code data-trim data-line-numbers={lines || null} data-ln-start-from={offset}>
<slot />
  </code>
</pre>
