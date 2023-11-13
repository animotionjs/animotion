<h1>Hot Module Replacement</h1>

<h2>What is HMR?</h2>

<p>
	<b>Animotion</b> uses Vite and takes advantage of
	<a href="https://vitejs.dev/guide/features.html#hot-module-replacement">
		hot module replacement (HMR).
	</a>
	This means that any update you make is reflected instantly in the browser.
</p>

<h2>Disabling HMR</h2>

<p>
	You can disable HMR inside <code>src/lib/components/presentation.svelte</code>
	if you uncomment
	<code>reloadPageAfterUpdate()</code> to refresh the page instead when you make a change, if you experience
	weird issues.
</p>
