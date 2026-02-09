import type Reveal from 'reveal.js'

let slides = $state() as Reveal.Api | undefined

export function setPresentation(reveal: Reveal.Api) {
	slides = reveal
}

export function getPresentation() {
	return {
		get slides() {
			return slides
		}
	}
}
