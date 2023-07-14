import shiki from 'shiki'

export async function highlightCode(code: string, lang: string) {
  const highlighter = await shiki.getHighlighter({ theme: 'poimandres' })
  return highlighter.codeToHtml(code, { lang })
}
