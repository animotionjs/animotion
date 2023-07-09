<script lang="ts">
	import { Presentation, Slide, Code } from '@components'
</script>

<Presentation>
	<Slide animate>
		<div class="mx-auto w-[400px]">
			<Code lang="ts">
				{`
					export const sections = [
						// ...
					]
			`}
			</Code>
		</div>
	</Slide>

	<Slide animate>
		<Code lang="ts">
			{`
				export const sections = [
					{ section: 'Concepts' },
					{ title: 'Creating slides', path: '/docs/creating-slides' },
					{ title: 'Styles', path: '/docs/styles' },
					{ title: 'Auto-animate', path: '/docs/auto-animate' },
					{ title: 'Code blocks', path: '/docs/code-blocks' },
					{ title: 'Events', path: '/docs/events' },
					{ section: 'Components' },
					{ title: 'Markdown', path: '/docs/markdown' },
					{ title: 'Media', path: '/docs/media' },
					{ title: 'Steps', path: '/docs/steps' },
					{ section: 'Customization' },
					{ title: 'Layout', path: '/docs/layout' },
					{ title: 'Theming', path: '/docs/theming' },
					{ title: 'Options', path: '/docs/options' }
				]
			`}
		</Code>
	</Slide>

	<Slide animate>
		<div class="mx-auto w-[840px]">
			<Code lang="ts" lines="1|3-12">
				{`
				const titles = sections.filter(section => section.title)

				export function getNavigation(path) {
					const currentPath =
						titles.findIndex(section => section.path === path)

					return {
						previous: titles[currentPath - 1],
						current: titles[currentPath],
						next: titles[currentPath + 1]
					}
				}
			`}
			</Code>
		</div>
	</Slide>

	<Slide animate>
		<div class="mx-auto w-[820px]">
			<Code lang="svelte" class="max-h-[600px]" lines="2|4|6|7|10-24">
				{`
				<script lang="ts">
					import { page } from '$app/stores'
					import { base } from '$app/paths'
					import { getNavigation } from './navigation'

					const path = $page.route.id
					const { previous, next } = getNavigation(path)
				</\script>

				{#if path}
					<nav class="section space-between">
						{#if previous}
							<a class="previous" href="{base}{previous.path}">
								{previous.title}
							</a>
						{/if}

						{#if next}
							<a class="next" href="{base}{next.path}">
								{next.title}
							</a>
						{/if}
					</nav>
				{/if}
		`}
			</Code>
		</div>
	</Slide>

	<Slide animate>
		<div class="mx-auto w-[180px]">
			<Code lang="svelte">
				{`
					<Links />
			`}
			</Code>
		</div>
	</Slide>

	<Slide animate>
		<img
			class="mx-auto"
			src="https://i.giphy.com/media/231fZ9lECp4zu/giphy.webp"
			alt="GIF"
		/>
	</Slide>
</Presentation>
