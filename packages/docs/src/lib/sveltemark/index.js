import { unified } from 'unified'
import toMarkdownAST from 'remark-parse'
import toHtmlAST from 'remark-rehype'
import toHtmlString from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeShiki from '@shikijs/rehype'

/**
 * Markdown preprocessor.
 * @param {string} content
 */
async function parseMarkdown(content) {
	const processor = await unified()
		.use(toMarkdownAST)
		.use([ remarkGfm,	remarkSmartypants ])
		.use(toHtmlAST, { allowDangerousHtml: true })
		.use(rehypeShiki, { theme: 'poimandres' })
		.use(toHtmlString, { allowDangerousHtml: true })
		.process(content)
	return processor.toString()
}

/**
 * Replace special Svelte characters.
 * @param {string} content
 */
function replaceSpecialSvelteChars(content) {
	return content.replaceAll('{', '&#123;').replaceAll('}', '&#125;')
}

/**
 * Preprocessor for Markdown files which converts
 * Markdown to HTML before it's compiled by Svelte
 * so we can use Svelte components inside Markdown.
 */
function sveltemark() {
	return {
		name: 'sveltemark',
		/**
		 * Convert Markdown to HTML.
		 * @param {Object} params
		 * @param {string} params.content
		 * @param {string} params.filename
		 */
		async markup({ content, filename }) {
			if (filename.endsWith('.md')) {
				const html = await parseMarkdown(content)
				const code = replaceSpecialSvelteChars(html)
				return { code }
			}
		},
	}
}

export default sveltemark
