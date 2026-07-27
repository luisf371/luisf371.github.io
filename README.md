# tekky.cc - Developer Portfolio

A portfolio of Chrome extensions and Windows apps built by **luisf371** — focused productivity tools with no bloat and no tracking.

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
  "tagline": "One-line pitch.",
  "description": "Longer blurb shown on the card.",
  "icon": "assets/images/icons/myproject.png",
  "tags": ["Productivity", "Tabs"],  // first tag is highlighted
  "origin": "original",              // "original" or "fork"
  "status": "active",                // active | coming-soon | in-development
  "badge": "v1.0",                   // small badge on featured cards (optional)
  "featured": true,                  // true = shown in the Highlights section
  "highlights": ["Bullet one", "Bullet two"],  // only used when featured
  "page": "extensions/myproject.html",          // detail page (optional)
  "repo": "https://github.com/luisf371/myProject"
}
```

- **Highlights section** = every project with `"featured": true`.
- **Filter tabs** appear automatically for whichever `category` values are in use.
- **Stats in the hero** (project counts) are computed from the JSON — no manual updates.

## 📦 Projects

1. **sSummarizer** — AI-powered web content summarization *(featured)*
2. **sWinShortcuts** — Low-level Windows keyboard/mouse remapper *(featured)*
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

