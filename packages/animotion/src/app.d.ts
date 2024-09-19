declare global {
	interface ViewTransition {
		updateCallbackDone: Promise<void>
		ready: Promise<void>
		finished: Promise<void>
		skipTransition: () => void
	}

	interface Document {
		viewTransition: ViewTransition
		startViewTransition(updateCallback: () => Promise<void> | void): ViewTransition
	}

	interface CSSStyleDeclaration {
		viewTransitionName?: string
	}

	interface DisplayMediaStreamOptions {
		preferCurrentTab?: boolean
	}

	interface MediaStream {
		oninactive?: () => void
	}
}

export {}
