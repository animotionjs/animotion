<script lang="ts">
	import Fit from './fit.svelte'
</script>

## FitText

You can use the `<FitText>` component to make the text as large as possible without overflowing the slide.

<Fit />

```svelte
<script>
  import { Presentation, Slide, FitText } from '@animotion/core'
</script>

<Presentation>
  <Slide>
    <FitText class="uppercase">hello</FitText>
    <FitText class="uppercase">darkness my old friend</FitText>
  </Slide>
</Presentation>
```

By default a `<h2>` tag is used for rendering the text but you can change the tag to anything you want.

```svelte
<FitText type="h1">hello</FitText>
<FitText type="p">darkness my old friend</FitText>
```