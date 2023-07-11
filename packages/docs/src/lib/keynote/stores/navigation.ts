import { writable } from 'svelte/store'

type Navigation = {
	hash: string | null
	currentSlide: number | null
	indices: unknown
	availableRoutes: unknown
}

export const navigation = writable<Navigation>({
	// slide number from the URL
	hash: null,
	// current slide
	currentSlide: null,
	// horizontal, vertical slide number and fragment
	indices: null,
	// available navigation
	availableRoutes: null,
})
