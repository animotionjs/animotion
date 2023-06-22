import Markdown from 'reveal.js/plugin/markdown/markdown'
import Highlight from 'reveal.js/plugin/highlight/highlight'
import Math from 'reveal.js/plugin/math/math'
import Notes from 'reveal.js/plugin/notes/notes'

import { registerLanguages } from '@languages'

const options: Reveal.Options = {
	// plugins
	plugins: [Markdown, Highlight, Math, Notes],
	// syntax highlight options
	highlight: {
		// add new languages
		beforeHighlight: registerLanguages,
		// disable automatic syntax highlighting
		highlightOnLoad: false,
	},
	// slide controls
	controls: false,
	// slide progress bar
	progress: false,
	// slide transition
	transition: 'fade',
	// slide numbers
	hash: true,
}

export default options
