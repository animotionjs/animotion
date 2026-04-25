import type { RevealApi } from 'reveal.js';

let slides = $state() as RevealApi | undefined;

export function setPresentation(reveal: RevealApi) {
	slides = reveal;
}

export function getPresentation() {
	return {
		get slides() {
			return slides;
		}
	};
}
