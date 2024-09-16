<script lang="ts">
	type Props = {
		fps?: number
		videoBitsPerSecond?: number
		audio?: boolean
	}
	type State = 'ready' | 'ready.countdown' | 'recording'

	let props: Props = $props()

	let recorder: State = $state('ready')
	let mediaRecorder: MediaRecorder
	let mediaStream: MediaStream
	let chunks: Blob[] = []
	let timer: number
	let seconds = $state(3)

	const video = {
		output: 'video.mp4',
		mimeType: 'video/mp4',
		fps: 60,
		videoBitsPerSecond: 2_500_000,
		audio: true,
		...props
	}

	async function countdown() {
		recorder = 'ready.countdown'

		let { promise, resolve } = Promise.withResolvers()

		timer = setInterval(() => {
			seconds--
			if (seconds === 0) {
				clearInterval(timer)
				resolve(seconds)
			}
		}, 1000)

		return promise
	}

	function stopRecording() {
		recorder = 'ready'
		mediaStream.getTracks().forEach((track) => track.stop())
		mediaRecorder?.stop()
		clearInterval(timer)
		seconds = 3
	}

	async function startRecording() {
		if (!mediaStream) return
		recorder = 'recording'
		mediaRecorder = new MediaRecorder(mediaStream, {
			mimeType: video.mimeType,
			videoBitsPerSecond: video.videoBitsPerSecond
		})
		mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
		mediaRecorder.onstop = () => {
			download(chunks)
			chunks = []
		}
		mediaRecorder.start()
	}

	async function prepareRecording() {
		try {
			mediaStream = await navigator.mediaDevices.getDisplayMedia({
				video: { frameRate: video.fps },
				audio: video.audio,
				// @ts-ignore
				preferCurrentTab: true
			})
			// @ts-ignore
			mediaStream.oninactive = stopRecording
			await countdown()
			startRecording()
		} catch (e) {
			console.error(`Error: ${e}`)
		}
	}

	function download(chunks: Blob[]) {
		const blob = new Blob(chunks, { type: video.mimeType })
		const a = document.createElement('a')
		a.href = URL.createObjectURL(blob)
		a.download = video.output
		a.click()
	}

	function handleKeydown(event: KeyboardEvent) {
		event.key === 'R' && recorder === 'ready' && prepareRecording()
		event.key === 'S' && recorder !== 'ready' && stopRecording()

		// switch (event.key) {
		// 	case 'R':
		// 		if (recorder === 'ready') {
		// 			prepareRecording()
		// 		}
		// 		break
		// 	case 'S':
		// 		if (recorder !== 'ready') {
		// 			stopRecording()
		// 		}
		// 		break
		// }
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if recorder.includes('ready')}
	<div class="recorder" data-state={recorder}>
		<button onclick={prepareRecording} class="record">
			<div class="circle">
				{#if recorder === 'ready.countdown'}
					{seconds}
				{/if}
			</div>
		</button>

		<div class="info">
			{#if recorder === 'ready'}
				<p class="shortcut">Shift + R</p>
				<p class="description">To start recording</p>
			{/if}

			{#if recorder === 'ready.countdown'}
				<p class="shortcut">Shift + S</p>
				<p class="description">To stop recording</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	.recorder {
		--txt-clr: hsl(0 0%, 98%);
		--circle-bg-clr: hsl(0 100% 60%);
		--circle-border-clr: hsl(0 0% 98%);

		position: fixed;
		left: 50%;
		bottom: 80px;
		translate: -50% 0px;
		font-family: var(--r-main-font);
		color: var(--txt-clr);
		text-align: center;
		z-index: 10;

		&[data-state='ready.countdown'] {
			& .circle {
				--txt-clr: hsl(0 0% 10%);
				--circle-bg-clr: hsl(0 0% 98%);
			}
		}

		.record {
			width: 80px;
			height: 80px;
			padding: 4px;
			border: 4px solid var(--circle-border-clr);
			border-radius: 50%;

			&:hover {
				cursor: pointer;
			}

			.circle {
				width: 100%;
				height: 100%;
				display: grid;
				place-content: center;
				font-size: 2rem;
				font-weight: 700;
				color: var(--txt-clr);
				background: var(--circle-bg-clr);
				border-radius: 50%;
				transition: background-color 0.6s;

				&:hover {
					--circle-bg-clr: hsl(0 100% 64%);
				}
			}
		}

		.info {
			margin-block-start: 1rem;

			& .shortcut {
				font-weight: 700;
			}

			& .description {
				margin-block-start: 4px;
				opacity: 0.6;
			}
		}
	}
</style>
