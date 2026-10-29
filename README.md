# tekky.cc - Developer Portfolio

A portfolio of Chrome extensions and Windows apps built by **luisf371**.

**Live Site:** [https://tekky.cc](https://tekky.cc)

## ✨ How the homepage works (data-driven — edit one file)

The homepage renders itself from a single file: **[`data/projects.json`](data/projects.json)**.
There is no build step and no framework — just edit the JSON, commit, and push.

To **add or change a project**, edit `data/projects.json`:

```jsonc
{
  "id": "myproject",                 // unique slug
  "name": "myProject",
  "category": "extension",           // "extension" or "app" (drives the filter tabs)
  "tagline": "One-line pitch shown on the card.",
  "icon": "assets/images/icons/myproject.png",
  "tags": ["Productivity", "Tabs"],  // first tag is highlighted
  "page": "extensions/myproject.html",          // detail page (optional; the card title links to repo without it)
  "repo": "https://github.com/luisf371/myProject"
}
```

- **Filter tabs** appear automatically for whichever `category` values are in use.
- **Cards** have a single "View details" link to `page`. They don't link to `repo` directly, so each detail page should carry the link to the source.
- The **intro text** at the top of the page lives in `index.html`, not in the JSON.

## 📦 Projects

1. **sSummarizer** — AI-powered web content summarization
2. **sWinShortcuts** — Low-level Windows keyboard/mouse remapper
3. **sTabControl** — Advanced tab management for power users
4. **sNeatBookmarks** — Tree-style bookmark management
5. **sBookmarkCleaner** — Find and remove broken bookmarks and duplicates
6. **sGestures** — Navigate with simple mouse gestures
7. **sUndoClose** — Restore recently closed tabs and windows

## 🛠️ Tech Stack

- **Pure HTML/CSS/JavaScript** - No frameworks, no build process
- **GitHub Pages** - Static site hosting
- **Cloudflare** - DNS, CDN, SSL, and Web Analytics
- **Security** - CSP headers, HTTPS enforcement, privacy-focused analytics

## 🏗️ Project Structure

```
.
├── index.html              # Homepage (renders from data/projects.json)
├── data/
│   └── projects.json       # ★ Single source of truth for all projects
├── extensions/             # Individual extension detail pages
├── apps/                   # Individual desktop-app detail pages
├── blog/                   # Blog section
├── assets/
│   ├── css/                # Stylesheets (main.css, home.css, extension.css, blog.css)
│   ├── js/                 # main.js (nav/theme) + home.js (project renderer)
│   └── images/             # Icons, screenshots
├── CNAME                   # Custom domain
├── robots.txt              # SEO
├── sitemap.xml             # SEO
└── _headers                # Security headers
```

## 🚀 Deployment

This site is automatically deployed via GitHub Pages when changes are pushed to the `main` branch.

### Local Setup

1. Clone the repository
2. Serve the folder with any static file server (no build process needed), e.g. `python3 -m http.server 8000`, then open <http://localhost:8000>
3. Don't open `index.html` directly from disk — the homepage `fetch()`es `data/projects.json`, which browsers block on `file://` (see [`LOCAL_DEVELOPMENT.md`](LOCAL_DEVELOPMENT.md))

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

- **GitHub:** [https://github.com/luisf371](https://github.com/luisf371)
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

