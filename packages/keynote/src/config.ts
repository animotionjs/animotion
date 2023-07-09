import Markdown from 'reveal.js/plugin/markdown/markdown'
import Highlight from 'reveal.js/plugin/highlight/highlight'
import Math from 'reveal.js/plugin/math/math'
import Notes from 'reveal.js/plugin/notes/notes'

import { registerLanguages } from '@languages'

const options: Reveal.Options = {
	// presentation size respecting aspect ratio
	width: 960,
	height: 700,
	// content padding
	margin: 0.04,
	// smallest and largest possible scale
	minScale: 0.2,
	maxScale: 2.0,
	// plugins
	plugins: [Markdown, Highlight, Math.KaTeX, Notes],
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
	transition: 'slide',
	// bring your own layout
	disableLayout: false,
	// display mode used to show slides
	display: 'block',
	// center slides on the screen
	center: true,
	// auto-animate duration
	autoAnimateDuration: 1,
	// auto-animate easing
	autoAnimateEasing: 'ease',
	// animate unmatched elements
	autoAnimateUnmatched: true,
	// hide cursor
	hideInactiveCursor: true,
	// time before cursor is hidden (ms)
	hideCursorTime: 5000,

	/*
		Shows current slide number in the URL and
		pushes the slide change to the browser history
		for listening to the `hashchange` event used
		to update the store values.
	*/
	hash: true,
	history: true,
}

export default options
