const BLOCK_BOUNDARY = /<\/(?:p|div|li|h[1-6]|blockquote|tr)>|<br\s*\/?>/gi;
const HTML_TAG = /<[^>]*>/g;
const HTML_ENTITY = /&(?:nbsp|amp|lt|gt|quot|#39);/g;

const ENTITY_TEXT: Record<string, string> = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

function stripHtmlTags(html?: string): string {
  if (!html) return '';

  return html
    .replace(BLOCK_BOUNDARY, ' ')
    .replace(HTML_TAG, '')
    .replace(HTML_ENTITY, (entity) => ENTITY_TEXT[entity])
    .replace(/\s+/g, ' ')
    .trim();
}

export default stripHtmlTags;
