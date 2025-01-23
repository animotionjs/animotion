<script lang="ts">
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
		<a href="/docs/setup">Visualize ideas</a> with code using web technologies.
	</p>

	<div class="video">
		<video bind:this={videoEl} src="video.mp4" muted loop></video>
	</div>
</main>

<style>
	.heading {
		max-width: 400px;
		font-size: var(--font-size-4);
		line-height: 1.2;
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

		& a {
			color: var(--text-2);
			font-weight: 700;
			text-decoration: underline wavy;
			text-decoration-color: var(--brand);

			&:hover {
				color: var(--brand);
			}
		}

		@media (width > 800px) {
			font-size: var(--font-size-4);
		}
	}

	.video {
		max-width: 800px;
		z-index: -10;

		& video {
			aspect-ratio: 16/9;
			object-fit: cover;
			border: 1px solid var(--border);
			border-radius: var(--radius-1);
			box-shadow: 0px 0px 200px hsl(180 40% 40% / 20%);
		}
	}
</style>
