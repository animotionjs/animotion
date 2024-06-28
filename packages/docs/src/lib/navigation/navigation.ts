export const sections = [
	{ section: 'Getting started' },
	{ title: 'What is animotion?', path: '/docs' },
	{ title: 'Installation', path: '/docs/getting-started' },
	{ section: 'Concepts' },
	{ title: 'Slides', path: '/docs/slides' },
	{ title: 'Styles', path: '/docs/styles' },
	{ title: 'Transitions', path: '/docs/transitions' },
	{ title: 'Actions', path: '/docs/actions' },
	{ title: 'Code blocks', path: '/docs/code-blocks' },
	{ title: 'Events', path: '/docs/events' },
	{ title: 'Motion', path: '/docs/motion' },
	{ section: 'Components' },
	{ title: 'Notes', path: '/docs/notes' },
	{ title: 'Media', path: '/docs/media' },
	{ title: 'Math', path: '/docs/math' },
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
