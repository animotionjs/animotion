<script lang="ts">
	import { untrack } from 'svelte'
	import { fade } from 'svelte/transition'
	import { on } from 'svelte/events'

	type LogMessage = {
		type: 'console'
		method: 'log'
		args: unknown[]
	}

	type Props = {
		code: { markup: string; styles: string; script: string }
		imports?: Record<string, string>
		class?: string
		title?: string
		onmessage?: (message: LogMessage) => void
		showConsole?: boolean
	}

	type CodeKey = keyof Props['code']

	let {
		code: initialCode,
		imports,
		class: classes,
		title = 'Preview',
		onmessage,
		showConsole = false
	}: Props = $props()

	let code = $state(untrack(() => initialCode))
	let srcdoc = $derived(updateHTML())
	let logs = $state<LogMessage[]>([])

	function updateHTML() {
		return `
			<!doctype html>
				<html>
					<head>
						<meta charset="utf-8" />
						<style>
							*, *::before, *::after {
								box-sizing: border-box;
							}

							html {
								height: 100%;
							}

							body {
								margin: 1rem;
								font-family: 'Atkinson Hyperlegible', sans-serif;
								color: #fff;
							}

							code, pre {
								font-family: 'Monaspace Neon', monospace;
							}

							button {
								font: inherit;
							}
						</style>
						<script>
							const log = console.log
							console.log = (...args) => {
								parent.postMessage({ type: 'console', method: 'log', args }, '*')
								log(...args)
							}
						<\/script>
						<script type="importmap">
							{
								"imports": ${JSON.stringify(imports, null, 2)}
							}
						<\/script>
						<script type="module">${code.script}<\/script>
					  <style>${code.styles}</style>
					</head>
					<body>${code.markup}</body>
				</html>
		`
	}

	function handleMessage(e: MessageEvent) {
		if (e.data.type === 'console' && e.data.method === 'log') {
			logs = [...logs, e.data]
			onmessage?.(e.data)
		}
	}

	export function toggleConsole() {
		showConsole = !showConsole
	}

	export function clearLogs() {
		logs = []
	}

	function getStringFromTemplate(strings: TemplateStringsArray) {
		return String.raw({ raw: strings }).trim().replaceAll('\t', '')
	}

	function createAPI(key: CodeKey) {
		return {
			update(strings: TemplateStringsArray) {
				code[key] = getStringFromTemplate(strings)
			},
			append(strings: TemplateStringsArray) {
				code[key] += '\n' + getStringFromTemplate(strings)
			},
			remove(strings: TemplateStringsArray) {
				const input = getStringFromTemplate(strings)

				const linesToRemove = input.split(',').flatMap((part) => {
					if (part.includes('-')) {
						const [start, end] = part.split('-').map(Number)
						return Array.from({ length: end - start + 1 }, (_, i) => start + i)
					}
					return [Number(part)]
				})

				code[key] = code[key]
					.split('\n')
					.filter((_, i) => !linesToRemove.includes(i + 1))
					.join('\n')
			},
			insert(strings: TemplateStringsArray) {
				const [lineNumber, fragment] = getStringFromTemplate(strings).split(' ')
				const index = Number(lineNumber) - 1
				const lines = code[key].trim().split('\n')
				console.log({ index, lines })
				lines.splice(index, 0, fragment)
				code[key] = lines.join('\n')
			},
			replace(from: string, to: string) {
				code[key] = code[key].replace(from, to)
			}
		}
	}

	export const markup = createAPI('markup')
	export const styles = createAPI('styles')
	export const script = createAPI('script')
</script>

<div class="browser {classes}">
	<div class="chrome">
		<!--
		<div class="buttons">
			<span class="dot red"></span>
			<span class="dot yellow"></span>
			<span class="dot green"></span>
		</div>
		-->

		<div class="nav">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="nav-item"
			>
				<path d="m15 18-6-6 6-6" />
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="nav-item"
			>
				<path d="m9 18 6-6-6-6" />
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="nav-item"
			>
				<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" />
			</svg>
		</div>

		<div class="address-bar">
			<span class="address">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="address-icon"
				>
					<circle cx="12" cy="12" r="10" /><path d="M12 16v-4" />
					<path d="M12 8h.01" />
				</svg>
				localhost:5173
			</span>
		</div>

		<div class="actions">
			<button class="console-toggle" onclick={toggleConsole} title="Toggle console">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="console-toggle-icon"
				>
					<path d="m7 11 2-2-2-2" />
					<path d="M11 13h4" />
					<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
				</svg>
			</button>
		</div>
	</div>

	<div class="viewport">
		<div class="viewport-inner">
			<iframe
				{@attach () => {
					return on(window, 'message', handleMessage)
				}}
				{srcdoc}
				{title}
				sandbox="allow-scripts"
			></iframe>
		</div>
	</div>

	<div class={{ console, open: showConsole }}>
		<div class="console-header">
			<span>Console</span>
			<button class="close-btn" onclick={toggleConsole}>×</button>
		</div>

		<div class="console-logs">
			{#each logs as log}
				<div in:fade class="log-entry">
					> {log.args.join(' ')}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.browser {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: auto 1fr;
		position: relative;
		overflow: hidden;
		font-size: 1rem;
		background: oklch(20% 0.01 272);
		border-radius: 0.5rem;
		border: 1px solid oklch(30% 0.02 272);
	}

	.chrome {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.5rem 1rem;
		background: oklch(24% 0.02 272);
		border-bottom: 1px solid oklch(30% 0.02 272);
	}

	.buttons {
		display: flex;
		gap: 0.5rem;

		/*
		.dot {
			width: 12px;
			height: 12px;
			border-radius: 50%;

			&.red {
				background: #ff5f56;
			}

			&.yellow {
				background: #ffbd2e;
			}

			&.green {
				background: #27c93f;
			}
		}
		*/
	}

	.nav {
		display: flex;
		gap: 0.25rem;

		.nav-item {
			width: 20px;
			height: 20px;
			color: oklch(80% 0.02 272);
		}
	}

	.address-bar {
		display: grid;
		align-items: center;
		padding: 0.6rem 1rem;
		background: oklch(16% 0.01 272);
		border-radius: 0.5rem;
		border: 1px solid oklch(30% 0.02 272);

		.address {
			display: flex;
			align-items: center;
			gap: 0.25rem;
			color: oklch(70% 0.02 272);

			.address-icon {
				width: 14px;
				height: 14px;
			}
		}
	}

	.actions {
		margin-left: auto;

		.console-toggle {
			display: grid;
			place-content: center;
			background: none;
			border: none;
			color: oklch(80% 0.02 272);
			cursor: pointer;

			.console-toggle-icon {
				width: 24px;
				height: 24px;
			}
		}
	}

	.viewport {
		/*height: 100%;
		position: relative;
		overflow: hidden;*/
		background: oklch(22% 0.01 272);

		.viewport-inner {
			height: 100%;
		}

		iframe {
			width: 100%;
			height: 100%;
			display: block;
			border: none;
		}
	}

	.console {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 200px;
		background: oklch(18% 0.01 272);
		border-top: 1px solid oklch(30% 0.02 272);
		transform: translateY(100%);
		transition: transform 0.3s ease-out;

		&.open {
			transform: translateY(0);
		}

		@starting-style {
			&.open {
				transform: translateY(100%);
			}
		}

		.console-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem;
			color: oklch(80% 0.02 272);
			background: oklch(20% 0.01 272);
			border-bottom: 1px solid oklch(30% 0.02 272);

			.close-btn {
				padding: 0 0.25rem;
				color: oklch(70% 0.02 272);
				background: transparent;
				border: none;
				cursor: pointer;

				&:hover {
					color: oklch(90% 0.02 272);
				}
			}
		}

		.console-logs {
			padding: 1rem;
			overflow-y: auto;
			font-family: 'Monaspace Neon', monospace;

			.log-entry {
				padding: 0.25rem 0;
				color: oklch(90% 0.02 272);
				border-bottom: 1px solid oklch(24% 0.02 272);
				text-align: left;
			}

			.log-entry:last-child {
				border-bottom: none;
			}
		}
	}
</style>
