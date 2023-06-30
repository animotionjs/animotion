<script lang="ts">
	import { base } from '$app/paths'
</script>

<main class="container center text-center">
	<h1 class="heading text-center capitalize">
		Create beautiful animated presentations with ease
	</h1>

	<p class="subheading">
		<a href="{base}/docs/getting-started">Visualize ideas</a> with code using web
		technologies.
	</p>

	<video src="keynote.mp4" autoplay loop />
</main>

<style lang="postcss">
	.heading {
		max-width: 800px;
		font-size: var(--font-size-5);
		line-height: 1.4;
		letter-spacing: 1.4px;
		margin-block-start: var(--size-6);
	}

	.subheading {
		max-width: 800px;
		margin-block: var(--size-4);
		font-size: var(--font-size-4);
		color: var(--text-2-dark);
	}

	.subheading {
		a {
			font-weight: 600;
			text-decoration-line: underline;
			text-decoration-style: wavy;
			text-decoration-color: aqua;

			&:hover {
				color: var(--text-1);
			}
		}
	}

	video {
		max-width: 800px;
		aspect-ratio: 16/9;
		object-fit: cover;
		border-radius: var(--radius-1);
		box-shadow: var(--shadow-1);
	}
</style>
