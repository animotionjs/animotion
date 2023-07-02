<script lang="ts">
	import { base } from '$app/paths'
	import { fade } from '$lib/transitions/fade'

	let videoEl: HTMLVideoElement
</script>

<main class="container place-content-center">
	<h1 use:fade class="heading margin-text-center capitalize">
		Create beautiful animated presentations with ease
	</h1>

	<p
		use:fade={{ duration: 0.3, delay: 0.8 }}
		on:finish={() => videoEl.play()}
		class="subheading margin-text-center"
	>
		<a href="{base}/docs/getting-started">Visualize ideas</a> with code using web technologies.
	</p>

	<div class="video">
		<video bind:this={videoEl} src="video.mp4" muted loop />
	</div>
</main>

<style lang="postcss">
	.heading {
		max-width: 400px;
		font-size: var(--font-size-4);
		line-height: 1.4;
		letter-spacing: 1.4px;
		margin-block-start: var(--size-6);

		@media (width > 800px) {
			max-width: 800px;
			font-size: var(--font-size-5);
		}
	}

	.subheading {
		max-width: 800px;
		margin-block: var(--size-4);
		font-size: var(--font-size-3);
		color: var(--text-2);

		@media (width > 800px) {
			font-size: var(--font-size-4);
		}
	}

	.subheading {
		a {
			font-weight: 600;
			text-decoration-line: underline;
			text-decoration-style: wavy;
			text-decoration-color: var(--brand);

			&:hover {
				color: var(--brand);
			}
		}
	}

	.video {
		max-width: 800px;
		perspective: 1000px;

		video {
			aspect-ratio: 16/9;
			object-fit: cover;
			transform: rotateX(40deg) translateY(-20%);
			border-radius: var(--radius-1);
			box-shadow: var(--shadow-1);
		}
	}
</style>
