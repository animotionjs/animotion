function setTheme() {
	const setTheme = localStorage.getItem('theme')
	const prefersColorScheme = window.matchMedia('(prefers-color-scheme: light)').matches
	const theme = prefersColorScheme ? 'light' : 'dark'

	if (setTheme) {
		document.documentElement.setAttribute('color-scheme', setTheme)
		return
	}

	document.documentElement.setAttribute('color-scheme', theme)
}

setTheme()
