# Speaker notes

You can write down notes inside the `<Notes>` component for the current slide which is visible when you press the `S` key on the keyboard.

![Speaker notes](/notes.png)

```svelte
<script>
  import { Presentation, Slide, Notes } from '@animotion/core'
</script>

<Presentation>
  <Slide>
    <p>Horizontal 1</p>
    <Notes>Don't make eye contact</Notes>
  </Slide>

  <Slide>Horizontal 2</Slide>
</Presentation>
```
