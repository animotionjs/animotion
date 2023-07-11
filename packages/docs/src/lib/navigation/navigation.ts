export const sections = [
	{ section: 'Getting started' },
	{ title: 'What is keynote?', path: '/docs' },
	{ title: 'Installation', path: '/docs/getting-started' },
	{ section: 'Concepts' },
	{ title: 'Creating slides', path: '/docs/creating-slides' },
	{ title: 'Styles', path: '/docs/styles' },
	{ title: 'Auto-animate', path: '/docs/auto-animate' },
	{ title: 'Code blocks', path: '/docs/code-blocks' },
	{ title: 'Events', path: '/docs/events' },
	{ section: 'Examples' },
	{ title: 'Visualizing Ideas', path: '/docs/visualizing-ideas' },
	{ section: 'Components' },
	{ title: 'Markdown', path: '/docs/markdown' },
	{ title: 'Media', path: '/docs/media' },
	{ title: 'Steps', path: '/docs/steps' },
	{ section: 'Customization' },
	{ title: 'Layout', path: '/docs/layout' },
	{ title: 'Theming', path: '/docs/theming' },
	{ title: 'Options', path: '/docs/options' }
]

const titles = sections.filter((section) => section.title)

export function getNavigation(path: string | null) {
	const currentPath = titles.findIndex((section) => section.path === path)
	const previous = titles[currentPath - 1]
	const current = titles[currentPath]
	const next = titles[currentPath + 1]
	return { previous, current, next }
}
