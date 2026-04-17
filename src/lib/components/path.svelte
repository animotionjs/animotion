<script lang="ts">
	import { tween } from '@animotion/motion'
	import Action from '$lib/components/action.svelte'
	import type { ClassValue } from 'svelte/elements'

	type PathProps = {
		data: string | string[]
		stroke?: string
		fill?: string
		strokeWidth?: number
		strokeLinecap?: 'butt' | 'round' | 'square'
		strokeLinejoin?: 'miter' | 'round' | 'bevel'
		start?: number
		end?: number
		duration?: number
		easing?: (t: number) => number
		viewBox?: string
		width?: string | number
		height?: string | number
		manual?: boolean
		class?: ClassValue
		style?: string
		ref?: (self: PathComponent) => void
	}

	interface PathComponent {
		getPointAtPercentage: (percentage: number) => {
			position: { x: number; y: number }
			tangent: { x: number; y: number; degrees: number }
		}
		morph: (
			index: number,
			options?: { duration?: number; easing?: (t: number) => number }
		) => Promise<void>
		draw: (
			from: number,
			to: number,
			options?: { duration?: number; easing?: (t: number) => number }
		) => Promise<void>
		reveal: (duration?: number) => Promise<void>
		hide: (duration?: number) => Promise<void>
	}

	let {
		data,
		stroke = 'currentColor',
		fill = 'none',
		strokeWidth = 2,
		strokeLinecap = 'round',
		strokeLinejoin = 'round',
		start = 1,
		end = 1,
		duration = 1000,
		easing,
		viewBox,
		width,
		height,
		manual = false,
		...props
	}: PathProps = $props()

	let pathEl = $state<SVGPathElement>()
	let currentPathIndex = $state(0)
	let paths = $derived(Array.isArray(data) ? data : [data])
	let currentPath = $derived(paths[0])
	let isDrawing = $state(false)

	let pathTween = $state<ReturnType<typeof tween<string>> | null>(null)
	let drawTween = $state<ReturnType<typeof tween<{ end: number }>> | null>(null)
	let drawEnd = $derived(drawTween?.current?.end ?? end)

	const pathRef: PathComponent = {
		getPointAtPercentage,
		morph,
		draw,
		reveal,
		hide
	}

	$effect(() => {
		pathTween = tween(currentPath, { duration, easing, interpolate: interpolatePath })
	})

	$effect(() => {
		if (!drawTween) {
			drawTween = tween({ end }, { duration, easing })
		}
	})

	function interpolatePath(from: string, to: string) {
		const fromPoints = pathToPoints(from)
		const toPoints = pathToPoints(to)
		const numPoints = Math.max(fromPoints.length, toPoints.length)
		const fromResampled = resamplePoints(fromPoints, numPoints)
		const toResampled = resamplePoints(toPoints, numPoints)

		const startIdx = findBestAlignment(fromResampled, toResampled)
		const rotatedTo = rotatePoints(toResampled, startIdx)

		return (t: number) => {
			const interpolated = fromResampled.map((p, i) => ({
				x: p.x + (rotatedTo[i].x - p.x) * t,
				y: p.y + (rotatedTo[i].y - p.y) * t
			}))
			return pointsToPath(interpolated)
		}
	}

	function findBestAlignment(
		from: { x: number; y: number }[],
		to: { x: number; y: number }[]
	): number {
		if (from.length === 0 || to.length === 0) return 0

		let bestIdx = 0
		let minDist = Infinity

		for (let offset = 0; offset < to.length; offset++) {
			const rotated = rotatePoints(to, offset)
			let totalDist = 0
			for (let i = 0; i < Math.min(from.length, rotated.length); i++) {
				const dx = from[i].x - rotated[i].x
				const dy = from[i].y - rotated[i].y
				totalDist += dx * dx + dy * dy
			}
			if (totalDist < minDist) {
				minDist = totalDist
				bestIdx = offset
			}
		}

		return bestIdx
	}

	function rotatePoints(
		points: { x: number; y: number }[],
		offset: number
	): { x: number; y: number }[] {
		if (offset === 0 || points.length === 0) return points
		return [...points.slice(offset), ...points.slice(0, offset)]
	}

	function pathToPoints(d: string): { x: number; y: number }[] {
		const ns = 'http://www.w3.org/2000/svg'
		const svg = document.createElementNS(ns, 'svg')
		svg.style.position = 'absolute'
		svg.style.width = '1px'
		svg.style.height = '1px'
		svg.style.overflow = 'hidden'
		const path = document.createElementNS(ns, 'path')
		path.setAttribute('d', d)
		svg.appendChild(path)
		document.body.appendChild(svg)

		const length = path.getTotalLength()
		const isClosed = d.trim().toLowerCase().endsWith('z')
		const numPoints = Math.max(Math.ceil(length / 2), 200)
		const points: { x: number; y: number }[] = []

		for (let i = 0; i < numPoints; i++) {
			const point = path.getPointAtLength((i / numPoints) * length)
			points.push({ x: point.x, y: point.y })
		}

		if (isClosed && points.length > 0) {
			points.push({ ...points[0] })
		}

		document.body.removeChild(svg)
		return points
	}

	function resamplePoints(
		points: { x: number; y: number }[],
		numPoints: number
	): { x: number; y: number }[] {
		if (points.length === numPoints) return points
		if (points.length < 2) {
			const p = points[0] || { x: 0, y: 0 }
			return Array(numPoints)
				.fill(null)
				.map(() => ({ ...p }))
		}

		const totalLen = points.length - 1
		const resampled: { x: number; y: number }[] = []

		for (let i = 0; i < numPoints; i++) {
			const t = i / (numPoints - 1)
			const idx = t * totalLen
			const lo = Math.floor(idx)
			const hi = Math.min(lo + 1, totalLen)
			const frac = idx - lo

			const p0 = points[lo]
			const p1 = points[hi]
			resampled.push({
				x: p0.x + (p1.x - p0.x) * frac,
				y: p0.y + (p1.y - p0.y) * frac
			})
		}

		return resampled
	}

	function pointsToPath(points: { x: number; y: number }[]): string {
		if (points.length === 0) return ''
		if (points.length === 1) return `M ${points[0].x} ${points[0].y}`

		const cmds: string[] = [`M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`]

		for (let i = 1; i < points.length; i++) {
			cmds.push(`L ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)}`)
		}

		cmds.push('Z')
		return cmds.join(' ')
	}

	function getLength(): number {
		return pathEl?.getTotalLength() ?? 0
	}

	export function getPointAtPercentage(percentage: number): {
		position: { x: number; y: number }
		tangent: { x: number; y: number; degrees: number }
	} {
		if (!pathEl) {
			return { position: { x: 0, y: 0 }, tangent: { x: 0, y: 0, degrees: 0 } }
		}

		const length = getLength()
		const point = pathEl.getPointAtLength(length * percentage)

		const delta = 0.001
		const p1 = pathEl.getPointAtLength(Math.max(0, length * percentage - delta))
		const p2 = pathEl.getPointAtLength(Math.min(length, length * percentage + delta))
		const tangentX = p2.x - p1.x
		const tangentY = p2.y - p1.y
		const magnitude = Math.sqrt(tangentX * tangentX + tangentY * tangentY)
		const normalizedTangentX = magnitude > 0 ? tangentX / magnitude : 0
		const normalizedTangentY = magnitude > 0 ? tangentY / magnitude : 0
		const degrees = (Math.atan2(tangentY, tangentX) * 180) / Math.PI

		return {
			position: { x: point.x, y: point.y },
			tangent: { x: normalizedTangentX, y: normalizedTangentY, degrees }
		}
	}

	export async function morph(
		index: number,
		options?: { duration?: number; easing?: (t: number) => number }
	) {
		if (!pathEl || !pathTween || index < 0 || index >= paths.length) return
		if (index === currentPathIndex) return

		const targetPath = paths[index]
		pathTween.to(targetPath, options)
		currentPathIndex = index

		await pathTween
	}

	export async function draw(
		from: number,
		to: number,
		options?: { duration?: number; easing?: (t: number) => number }
	) {
		if (!pathEl || !drawTween) return
		isDrawing = true
		drawTween.to({ end: from }, { duration: 0 })
		await drawTween.to({ end: to }, options)
		isDrawing = false
	}

	export async function reveal(duration?: number) {
		return draw(0, 1, { duration })
	}

	export async function hide(duration?: number) {
		return draw(1, 0, { duration })
	}

	$effect(() => {
		if (props.ref) {
			props.ref(pathRef)
		}
	})
</script>

{#if Array.isArray(data) && data.length > 1 && !manual}
	{#each paths as _, i}
		{#if i > 0}
			<Action do={() => morph(i)} undo={() => morph(i - 1)} />
		{/if}
	{/each}
{/if}

<svg class={props.class} style={props.style} {viewBox} {width} {height}>
	<path
		bind:this={pathEl}
		d={pathTween?.current ?? currentPath}
		{stroke}
		{fill}
		stroke-width={strokeWidth}
		stroke-linecap={strokeLinecap}
		stroke-linejoin={strokeLinejoin}
		style:stroke-dasharray={isDrawing || end !== 1 ? pathEl?.getTotalLength() : undefined}
		style:stroke-dashoffset={isDrawing || end !== 1
			? pathEl?.getTotalLength() * (1 - drawEnd)
			: undefined}
	></path>
</svg>
