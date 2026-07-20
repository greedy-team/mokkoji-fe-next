import sanitizeHtml from 'sanitize-html';

function sanitizeDescriptionHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span'],
    allowedAttributes: {
      p: ['style'],
      span: ['style'],
    },
    allowedStyles: {
      p: {
        'text-align': [/^left$|^center$|^right$/],
      },
      span: {
        'font-size': [/^[\d.]+(px|rem)$/],
        'font-weight': [/^bold$/],
      },
    },
  });
}

export default sanitizeDescriptionHtml;
