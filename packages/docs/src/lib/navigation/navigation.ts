export const sections = [
	{ section: 'Getting started' },
	{ title: 'What is animotion?', path: '/docs' },
	{ title: 'Installation', path: '/docs/setup' },
	{ title: `What's new`, path: '/docs/whats-new' },
	{ section: 'Concepts' },
	{ title: 'Slides', path: '/docs/slides' },
	{ title: 'Transitions', path: '/docs/transitions' },
	{ title: 'Actions', path: '/docs/actions' },
	{ title: 'Code', path: '/docs/code' },
	{ title: 'Motion', path: '/docs/motion' },
	{ title: 'Styles', path: '/docs/styles' },
	{ title: 'API', path: '/docs/api' },
	{ section: 'File-based' },
	{ title: 'Slides', path: '/docs/file-based' },
	{ section: 'Recording' },
	{ title: 'Recorder', path: '/docs/recorder' },
	{ section: 'Components' },
	{ title: 'Notes', path: '/docs/notes' },
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
