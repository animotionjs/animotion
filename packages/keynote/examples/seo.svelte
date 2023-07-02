<script lang="ts">
	import { Presentation, Slide, Code } from '@deck'
</script>

<Presentation>
	<Slide animate>
		<Code lang="ts" lines="1|2">
			{`
				// +page.ts
				export async function load() {}
			`}
		</Code>
	</Slide>

	<Slide animate>
		<Code lang="ts" lines="3-6|">
			{`
				// +page.ts
				export async function load() {
					return {
						title: \`Banana King\`,
						content: \`The amazing story of America's Banana King\`
					}
				}
			`}
		</Code>
	</Slide>

	<Slide animate>
		<Code lang="svelte" lines="1|3|5">
			{`
			<!-- +layout.svelte -->
			<script lang="ts">
				import { page } from '$app/stores'

				$: ({ title, content } = $page.data)
			<\/script>

			<slot />
		`}
		</Code>
	</Slide>

	<Slide animate>
		<Code lang="svelte" lines="8-11|">
			{`
			<!-- +layout.svelte -->
			<script lang="ts">
				import { page } from '$app/stores'

				$: ({ title, content } = $page.data)
			<\/script>

			<svelte:head>
				<title>{title}</title>
				<meta name="description" {content} />
			</svelte:head>

			<slot />
		`}
		</Code>
	</Slide>
</Presentation>

<style>
	:global(section) {
		height: 100%;
		width: 100%;
	}

	:global(pre) {
		position: absolute;
		left: 10%;
		top: 25%;
	}
</style>
