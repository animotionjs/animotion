<h1>Hot Module Replacement</h1>

<h2>What is HMR?</h2>

<p>
	<b>Animotion</b> uses <a href="https://vitejs.dev/">Vite</a> and takes advantage of
	<a href="https://vitejs.dev/guide/features.html#hot-module-replacement">
		hot module replacement (HMR)
	</a>
	which means that any update you make is reflected instantly in the browser.
</p>

<p>
	That being said you might want to disable HMR if you encounter weird issues when working on your
	presentation.
</p>

<h2>Disabling HMR</h2>

<p>
	You can open and disable HMR inside <code>presentation.svelte</code>
	by uncommenting <code>reloadPageAfterUpdate()</code>. This is going to refresh the page instead of
	using HMR when you make a change.
</p>
