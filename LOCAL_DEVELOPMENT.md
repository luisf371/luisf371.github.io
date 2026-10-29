# tekky.cc Portfolio - Local Development Server

## Quick Start

### Option 1: Python HTTP Server (Easiest)

**Windows:**
```bash
# Double-click: start-server.bat
# OR run in terminal:
python -m http.server 8000
```

**Mac/Linux:**
```bash
# Run in terminal:
python3 -m http.server 8000
```

Then open: **http://localhost:8000**

---

### Option 2: VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Automatically opens in browser

---

### Option 3: Node.js http-server (If you have Node)

```bash
# Install globally (one time)
npm install -g http-server

# Run server
http-server -p 8000

# Open: http://localhost:8000
```

---

## Why Direct File Opening Doesn't Work

Your HTML files use **absolute paths** like:
```html
<link rel="stylesheet" href="/assets/css/main.css">
<img src="/assets/images/icons/sneatbookmarks.png">
```

The leading `/` means "root of the web server", which doesn't exist when opening via `file://` protocol.

A local web server makes these paths work correctly.

The homepage also loads its project list with `fetch('./data/projects.json')`, and browsers refuse
`fetch()` on `file://` URLs. Without a server the page shows the "could not load" fallback instead of the
project cards.

---

## Testing Checklist

Once the server is running, test:

- [ ] Homepage loads with the intro and the "All projects" grid
- [ ] All 7 project icons appear in the grid
- [ ] Filter buttons (All / Extensions / Desktop Apps) show and hide cards
- [ ] Navigation menu works
- [ ] Mobile menu (resize browser to < 768px)
- [ ] Click on project cards → detail pages load
- [ ] Images load on extension pages
- [ ] Footer email click works
- [ ] No console errors (F12 → Console tab)

---

## Stopping the Server

**Windows:** Press `Ctrl+C` in the terminal
**Mac/Linux:** Press `Ctrl+C` in the terminal

---

## Port Already in Use?

If port 8000 is taken, use a different port:
```bash
python -m http.server 8080
# Then open: http://localhost:8080
```

---

## Production Note

These servers are for **local development only**. 

For production, you'll deploy to GitHub Pages which will serve the files properly at https://tekky.cc
