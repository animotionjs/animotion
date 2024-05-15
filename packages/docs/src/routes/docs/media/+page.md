<script lang="ts">
	import Video from './video.svelte'
</script>

# Media

The `<Media>` component is mostly useful if you have a lot of slides and want to lazy
load a video, image or iframe since you can just use regular HTML to do the same thing.

<Video />

```svelte
<script>
  import { Presentation, Slide, Media } from '@animotion/core'
</script>

<Presentation>
  <Slide>
    <Media
      class="h-[600px] w-full"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      type="iframe"
    />
  </Slide>
</Presentation>
```

Here are the options you can pass to the `<Media>` component:

| Prop         | Description                                  |
|--------------|----------------------------------------------|
| **type**     | video, img, iframe                           |
| **src**      | URL or path to local file                    |
| **autoplay** | Start playing the media when the slide shows |
| **preload**  | Lazy load iframe                             |