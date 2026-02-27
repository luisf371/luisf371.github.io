# Sentinel's Journal

## 2026-01-12 - Incorrect Escaping Context for URLs
**Vulnerability:** XSS in blog post rendering.
**Learning:** While `escapeHtml()` is essential for content injected into `innerHTML`, using it on property assignments like `element.href` is incorrect. Browser property assignments expect raw strings and handle them safely from an injection standpoint, but HTML-escaping them can lead to malformed URLs (e.g., `&quot;` appearing in the literal URL).
**Prevention:** Use `escapeHtml()` for HTML content injection; use `encodeURIComponent()` for data used in URL paths; and avoid HTML-escaping when assigning to DOM properties directly.
