import { writable } from 'svelte/store'

export const store = writable({
	hash: 0,
	currentSlideIndex: 0,
	previousSlideIndex: null,
	nextSlideIndex: null,
})
