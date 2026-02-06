# tekky.cc - Chrome Extensions Portfolio

Portfolio website showcasing Chrome extensions for productivity and enhanced browsing experience.

**Live Site:** [https://tekky.cc](https://tekky.cc)

## 📦 Featured Extensions

1. **sNeatBookmarks** - Elegant tree-style bookmark management
2. **sBookmarkCleaner** - Find and remove broken bookmarks and duplicates
3. **sGestures** - Navigate with simple mouse gestures
4. **sUndoClose** - Restore recently closed tabs and windows
5. **sSummarizer** - AI-powered web content summarization
6. **sTabControl** - Advanced tab management for power users

## 🛠️ Tech Stack

- **Pure HTML/CSS/JavaScript** - No frameworks, no build process
- **GitHub Pages** - Static site hosting
- **Cloudflare** - DNS, CDN, SSL, and Web Analytics
- **Security** - CSP headers, HTTPS enforcement, privacy-focused analytics

## 🏗️ Project Structure

```
.
├── index.html              # Homepage
├── extensions/             # Individual extension pages
├── blog/                   # Blog section (placeholder)
├── assets/
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript
│   └── images/            # Icons, screenshots
├── CNAME                  # Custom domain
├── robots.txt             # SEO
├── sitemap.xml            # SEO
└── _headers               # Security headers
```

## 🚀 Deployment

This site is automatically deployed via GitHub Pages when changes are pushed to the `main` branch.

### Local Setup

1. Clone the repository
2. Open `index.html` in a browser (no build process needed)
3. For local testing: Use any static file server

### GitHub Pages Configuration

- **Source:** Deploy from branch `main` / root
- **Custom domain:** tekky.cc
- **Enforce HTTPS:** Enabled

### Cloudflare Configuration

- **DNS:** A records pointing to GitHub Pages IPs
- **SSL/TLS:** Full (strict) mode
- **HSTS:** Enabled with preload
- **Web Analytics:** Privacy-focused tracking

## 🔒 Security Features

- Content Security Policy (CSP)
- HTTPS enforcement
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Subresource Integrity (SRI) for external scripts
- Email obfuscation

## 📝 License

This portfolio website code is open source. Individual Chrome extensions have their own licenses - see respective repositories.

## 📧 Contact

- **GitHub:** [https://github.com/[YOURUSERNAME]](https://github.com/[YOURUSERNAME])
- **Email:** contact [at] tekky [dot] cc

---

**Note:** Replace `[YOURUSERNAME]` with your actual GitHub username throughout the codebase.

## 📝 Blog

The portfolio includes a fully functional manual blog system:

- **Write posts in HTML** using the provided template
- **No build process** - matches the static HTML/CSS/JS approach
- **Dynamic listing** - posts automatically appear on blog index
- **Easy to use** - copy template, edit, add to JSON, deploy

See **BLOG_INSTRUCTIONS.md** for detailed instructions on adding blog posts.

**Quick start:**
```bash
cp blog/post-template.html blog/my-post.html
# Edit my-post.html and blog/posts.json
git add blog/ && git commit -m "Add blog post" && git push
```

