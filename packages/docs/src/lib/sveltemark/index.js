import { unified } from 'unified'
import toMarkdownAST from 'remark-parse'
import toHtmlAST from 'remark-rehype'
import toHtmlString from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeShiki from '@shikijs/rehype'

const markdownPreprocessor = unified()
	.use(toMarkdownAST)
	.use([remarkGfm,	remarkSmartypants])
	.use(toHtmlAST, { allowDangerousHtml: true })
	.use([rehypeSlug, rehypeAutolinkHeadings])
	.use(rehypeShiki, { theme: 'poimandres' })
	.use(toHtmlString, { allowDangerousHtml: true })

/**
 * Markdown preprocessor.
 * @param {string} content
 */
async function parseMarkdown(content) {
	const processor = await markdownPreprocessor.process(content)
	return processor.toString()
}

/**
 * Replace characters with HTML entities.
 * @param {string} content
 */
function replace(content) {
	/**
	 * @type {Object.<string, string>}
	 */
	const entities = {
		'{': '&#123;',
		'}': '&#125;',
	}
	return content.replace(/[{}]/g, entity => entities[entity])
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
				const code = replace(html)
				return { code }
			}
		},
	}
}

export default sveltemark
