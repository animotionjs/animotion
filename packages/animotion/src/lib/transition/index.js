const noop = () => {}

/**
 * @param {() => void} fn
 */
function viewTransition(fn) {
	if (!document.startViewTransition) {
		console.warn('The View Transitions API is not supported by your browser')
		fn()
		return
	}
	document.startViewTransition(fn)
}

/**
 * @typedef {Object} TransitionParams
 * @property {number} [order]
 * @property {string} [name]
 * @property {string} [transition]
 * @property {() => void} [action]
 */

/**
 * @param {HTMLElement} el
 * @param {TransitionParams=} [params={}]
 */
export function transition(el, params = {}) {
	const { order, name, transition = 'enter', action = noop } = params

	el.classList.add('fragment', 'hidden')
	if (order) el.setAttribute('data-fragment-index', order.toString())

	if (name) {
		el.style.viewTransitionName = `transition-${name}`
	} else {
		el.style.viewTransitionName = `transition-${crypto.randomUUID()}`
	}

	function enter() {
		viewTransition(() => {
			action()
			el.classList.add(transition)
			el.classList.remove('hidden')
		})
	}

	function leave() {
		viewTransition(() => {
			el.classList.remove(transition)
			el.classList.remove('hidden')
		})
	}

	el.addEventListener('in', enter)
	el.addEventListener('out', leave)

	return {
		destroy() {
			el.removeEventListener('in', enter)
			el.removeEventListener('out', leave)
		}
	}
}

/**
 * @param {HTMLElement} el
 * @param {() => void} action
 */
export function action(el, action) {
	el.classList.add('fragment', 'hidden')

	function enter() {
		action && action()
	}

	el.addEventListener('in', enter)

	return {
		destroy() {
			el.removeEventListener('in', enter)
		}
	}
}
