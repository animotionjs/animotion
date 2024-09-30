<script lang="ts">
	type Props = {
		codec?: string
		fps?: number
		videoBitrate?: number
		audioBitrate?: number
		systemAudio?: boolean
		useMicrophone?: boolean
		useTimer?: boolean
	}
	type State = 'ready' | 'ready.countdown' | 'recording'

	let {
		codec = 'video/mp4;codecs="vp9,opus"',
		fps = 60,
		videoBitrate = 2500,
		audioBitrate = 320,
		systemAudio = true,
		useMicrophone = true,
		useTimer = true
	}: Props = $props()

	let recorder: State = $state('ready')
	let videoStream: MediaStream
	let audioStream: MediaStream
	let mediaRecorder: MediaRecorder
	let chunks: Blob[] = []
	let timer: number
	let seconds = $state(3)

	function kbpsToBits(kbps: number) {
		return kbps * 1000
	}

	$effect(() => {
		getMediaStream()
	})

	async function getMediaStream() {
		try {
			videoStream = await navigator.mediaDevices.getDisplayMedia({
				video: { frameRate: fps },
				audio: true,
				selfBrowserSurface: 'include',
				systemAudio: systemAudio ? 'include' : 'exclude'
			})
			videoStream.oninactive = stopRecording
			audioStream = await navigator.mediaDevices.getUserMedia({
				audio: true
			})
			const [microphone] = audioStream.getAudioTracks()
			videoStream.addTrack(microphone)
			audioStream.oninactive = stopRecording
		} catch (e) {
			console.error(e)
		}
	}

	async function startRecording() {
		if (useTimer) {
			await countdown()
		}
		recorder = 'recording'
		mediaRecorder = new MediaRecorder(videoStream, {
			mimeType: codec,
			videoBitsPerSecond: kbpsToBits(videoBitrate),
			audioBitsPerSecond: kbpsToBits(audioBitrate)
		})
		mediaRecorder.ondataavailable = (e) => {
			chunks.push(e.data)
			download()
		}
		mediaRecorder.start()
	}

	function stopRecording() {
		recorder = 'ready'
		mediaRecorder?.stop()
		clearInterval(timer)
		seconds = 3
	}

	function countdown() {
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
		const blob = new Blob(chunks, { type: codec })
		const a = document.createElement('a')
		a.href = URL.createObjectURL(blob)
		a.download = 'video.mp4'
		a.click()
		URL.revokeObjectURL(a.href)
		chunks = []
	}

	function handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'R':
				recorder === 'ready' && startRecording()
				break
			case 'S':
				recorder !== 'ready' && stopRecording()
				break
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

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
