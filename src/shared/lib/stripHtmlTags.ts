function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

export default stripHtmlTags;
