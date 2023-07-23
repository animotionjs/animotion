import { writable } from 'svelte/store'

export const navigation = writable({
	// slide number from the URL
	hash: null,
	// current slide
	currentSlide: null,
	// horizontal, vertical slide number and fragment
	indices: null,
	// available navigation
	availableRoutes: null,
})
