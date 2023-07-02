import type { Action } from 'svelte/action'

type Fade = Action<
	HTMLElement,
	{ duration?: number; delay?: number } | undefined,
	{ 'on:finish': (e: CustomEvent) => void }
>

export const fade: Fade = (element: HTMLElement, { duration = 1, delay = 0 } = {}) => {
	const keyframes: PropertyIndexedKeyframes = {
		opacity: [0, 1]
	}
	const options: KeyframeAnimationOptions = {
		fill: 'both',
		duration: duration * 1000,
		delay: delay * 1000,
		easing: 'ease-in-out'
	}
	const animation = element.animate(keyframes, options)
	animation.onfinish = () => {
		element.dispatchEvent(new CustomEvent('finish'))
	}
}
