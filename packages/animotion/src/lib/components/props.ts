import type { Component, ComponentProps } from 'svelte'
import type Slide from './slide.svelte'

type Props<T extends Component> = { component?: T } & ComponentProps<T>

export function defineProps<T extends Component = typeof Slide>(props: Props<T>): Props<T> {
	return props
}
