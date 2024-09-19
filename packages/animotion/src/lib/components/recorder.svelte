<script lang="ts">
	type Props = {
		options?: {
			frameRate?: number
			audioBitsPerSecond?: number
			videoBitsPerSecond?: number
			audio?: boolean
		}
	}
	type State = 'ready' | 'ready.countdown' | 'recording'

	let props: Props = $props()
	let recorder: State = $state('ready')
	let mediaRecorder: MediaRecorder
	let mediaStream: MediaStream
	let chunks: Blob[] = []
	let timer: number
	let seconds = $state(3)

	const options = {
		mimeType: 'video/mp4;codecs="avc1.4d002a"',
		frameRate: 60,
		audioBitsPerSecond: 2_500_000,
		videoBitsPerSecond: 2_500_000,
		audio: true,
		...props.options
	}

	async function startRecording() {
		try {
			mediaStream = await navigator.mediaDevices.getDisplayMedia({
				video: { frameRate: options.frameRate },
				audio: options.audio,
				preferCurrentTab: true
			})
			mediaStream.oninactive = stopRecording

			await countdown()

			mediaRecorder = new MediaRecorder(mediaStream, {
				mimeType: options.mimeType,
				videoBitsPerSecond: options.videoBitsPerSecond,
				audioBitsPerSecond: options.audioBitsPerSecond
			})
			mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
			mediaRecorder.onstop = download
			recorder = 'recording'
			mediaRecorder.start()
		} catch (e) {
			console.error(`Error: ${e}`)
		}
	}

	function stopRecording() {
		recorder = 'ready'
		mediaStream.getTracks().forEach((track) => track.stop())
		mediaRecorder?.stop()
		clearInterval(timer)
		seconds = 3
	}

	async function countdown() {
		recorder = 'ready.countdown'
		let { promise, resolve } = Promise.withResolvers()
		timer = setInterval(() => {
			if (seconds === 0) {
				clearInterval(timer)
				resolve(seconds)
			}
			seconds--
		}, 1000)
		return promise
	}

	function download() {
		const blob = new Blob(chunks, { type: options.mimeType })
		const a = document.createElement('a')
		a.href = URL.createObjectURL(blob)
		a.download = `video.mp4`
		a.click()
		chunks = []
	}

	function handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'R':
				recorder === 'ready' && startRecording()
			case 'S':
				recorder !== 'ready' && stopRecording()
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if recorder.includes('ready')}
	<div class="recorder" data-state={recorder}>
		<button onclick={startRecording} class="record">
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
		--txt-clr: oklch(98% 0% 0);
		--circle-bg-clr: oklch(64% 100% 26);
		--circle-border-clr: oklch(98% 0% 0);

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
				--txt-clr: oklch(10% 0% 0);
				--circle-bg-clr: oklch(98% 0% 0);
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
