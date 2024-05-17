export const sections = [
	{ section: 'Getting started' },
	{ title: 'What is animotion?', path: '/docs' },
	{ title: 'Installation', path: '/docs/getting-started' },
	{ section: 'Concepts' },
	{ title: 'Creating slides', path: '/docs/creating-slides' },
	{ title: 'Styles', path: '/docs/styles' },
	{ title: 'Auto-animate', path: '/docs/auto-animate' },
	{ title: 'Code blocks', path: '/docs/code-blocks' },
	{ title: 'Events', path: '/docs/events' },
	{ title: 'Motion', path: '/docs/motion' },
	{ section: 'Components' },
	{ title: 'Notes', path: '/docs/notes' },
	{ title: 'Fit text', path: '/docs/fit-text' },
	{ title: 'Media', path: '/docs/media' },
	{ title: 'Steps', path: '/docs/steps' },
	{ title: 'Stack', path: '/docs/stack' },
	{ title: 'Stretch', path: '/docs/stretch' },
	{ title: 'Math', path: '/docs/math' },
	{ section: 'Customization' },
	{ title: 'Layout', path: '/docs/layout' },
	{ section: 'Deployment' },
	{ title: 'Adapters', path: '/docs/deployment' },
]

const titles = sections.filter((section) => section.title)

export function getNavigation(path: string | null) {
	const currentPath = titles.findIndex((section) => section.path === path)
	const previous = titles[currentPath - 1]
	const current = titles[currentPath]
	const next = titles[currentPath + 1]
	return { previous, current, next }
}
