import DOMPurify from 'dompurify';

/**
 * Sanitizes untrusted HTML/SVG strings to prevent XSS (Cross-Site Scripting) vulnerabilities.
 * Configured specifically for educational diagrams, math formulas, and textbook rich text.
 *
 * @param dirty - Raw string containing possible HTML/SVG markup
 * @returns Sanitized safe HTML string
 */
export function sanitizeHtml(dirty: string | null | undefined): string {
  if (!dirty) return '';

  return DOMPurify.sanitize(dirty, {
    USE_PROFILES: { html: true, svg: true },
    ADD_TAGS: ['use', 'feDropShadow'],
    ADD_ATTR: ['target', 'rel', 'viewBox', 'xmlns', 'fill', 'stroke', 'd', 'transform'],
  });
}
