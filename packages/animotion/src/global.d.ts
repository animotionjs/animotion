declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		'on:in'?: (event: CustomEvent) => void
		'on:out'?: (event: CustomEvent) => void
	}
}
