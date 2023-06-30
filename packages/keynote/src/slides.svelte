<script lang="ts">
	import {
		Presentation,
		Slide,
		Code,
		Media,
		Step,
		Stack,
		FitText,
		Stretch,
		Vertical,
	} from '@deck'
</script>

<Presentation>
	<Slide
		on:in={() => console.log('in: Horizontal 1')}
		on:out={() => console.log('out: Horizontal 1')}
	>
		Horizontal 1
	</Slide>
	<Slide
		on:in={() => console.log('in: Horizontal 2')}
		on:out={() => console.log('out: Horizontal 2')}
	>
		Horizontal 2
	</Slide>

	<Vertical>
		<Slide
			on:in={() => console.log('in: Vertical 1')}
			on:out={() => console.log('out: Vertical 1')}
		>
			Vertical 1
		</Slide>
		<Slide
			on:in={() => console.log('in: Vertical 2')}
			on:out={() => console.log('out: Vertical 2')}
		>
			Vertical 2
		</Slide>
	</Vertical>
</Presentation>
