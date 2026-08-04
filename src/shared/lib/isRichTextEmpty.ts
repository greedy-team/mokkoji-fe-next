function isRichTextEmpty(html: string): boolean {
  return html.replace(/<[^>]*>/g, '').trim() === '';
}

export default isRichTextEmpty;
