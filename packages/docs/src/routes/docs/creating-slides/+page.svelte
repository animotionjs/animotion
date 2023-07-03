<script lang="ts">
	import { base } from '$app/paths'
	import Code from '$lib/components/code.svelte'
</script>

<h1>Creating slides</h1>

<h2>Slide away</h2>

<p>
	You can write your entire presentation inside <code>slides.svelte</code> but you can also break things
	into components.
</p>

<p>
	To create horizontal and vertical slides with any markup inside use the <code>&lt;Slide&gt;</code>
	component.
</p>

<Code lang="html">
	{`
<script lang="ts">
  import { Presentation, Slide } from '@deck'
</\script>

<Presentation>
  <Slide>Horizontal 1</Slide>
  <Slide>Horizontal 2</Slide>
  
  <Slide>
    <Slide>Vertical 1</Slide>  
    <Slide>Vertical 2</Slide>  
  </Slide>
</Presentation>
  `}
</Code>

<p>
	Because <b>Keynote</b> uses Reveal.js these examples are equivalent.
</p>

<Code lang="html">
	{`
<div class="reveal">
  <div class="slides">
    <section>Horizontal 1</section>
    <section>Horizontal 2</section>

    <section>
      <section>Vertical 1</section>
      <section>Vertical 2</section>
    </section>
  </div>
</div>
  `}
</Code>

<p>
	This is important to understand if you want to customize beyond what <b>Keynote</b> can do. You
	can refer to the
	<a href="https://revealjs.com/">Reveal.js documentation</a> and change the existing presentation components
	and add new ones.
</p>

<h2>Using components</h2>

<p>
	You might have more complex presentations including state which can be unmanageable inside a
	single file in which case you can split your slides into components and place them wherever you
	want.
</p>

<Code lang="html">
	{`
<!-- counter.svelte -->
<script lang="ts">
  import { Slide } from '@deck'

  let count = 0
</\script>

<Slide>
  <button on:click="{() => count += 1}">
    {count}
  </button>
</Slide>
  `}
</Code>

<Code lang="html">
	{`
<!-- slides.svelte -->
<script lang="ts">
  import { Presentation } from '@deck'
  import { Counter } from './counter.svelte'
</\script>

<Presentation>
  <Counter /\>
</Presentation>
  `}
</Code>

<nav class="section space-between">
	<a class="previous" href="{base}/docs/getting-started">Getting started</a>
	<a class="next" href="{base}/docs/auto-animate">Auto-animate</a>
</nav>
