import { getHighlighter } from 'shiki'

export async function highlightCode(code: string, lang: string) {
  const highlighter = await getHighlighter({themes: ['poimandres'],
  langs: ['svelte'] })
  await highlighter.loadLanguage('svelte')
  return highlighter.codeToHtml(code, { lang, theme: 'poimandres' })
}