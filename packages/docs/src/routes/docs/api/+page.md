## Programmatic Slides

Animotion exposes the `Reveal` instance using the `getPresentation` method, enabling you to use the API to control slides programmatically:

```svelte
<script>
	import { getPresentation } from '@animotion/core'

	const presentation = getPresentation()
</script>

<button onclick={() => presentation.slides.prev()}>prev</button>
<button onclick={() => presentation.slides.next()}>next</button>
```


You can look at the available [API methods](https://revealjs.com/api/).