# How to Add Blog Posts - Manual Blog System

## Overview

Your blog uses a simple manual system:
- **Write posts in HTML** using the template
- **Add entry to posts.json** to list the post
- **Commit and push** - that's it!

No build process, no dependencies, just HTML/CSS/JS.

---

## 📝 Step-by-Step: Creating a New Blog Post

### Step 1: Copy the Template

```bash
# Copy the template file
cp blog/post-template.html blog/your-new-post-slug.html
```

**Naming Convention:**
- Use lowercase with hyphens
- Keep it short and descriptive
- Example: `building-first-chrome-extension.html`

### Step 2: Edit the New Post File

Open `blog/your-new-post-slug.html` and update:

**1. Meta Tags (top of file):**
```html
<title>Your Post Title | tekky.cc Blog</title>
<meta name="description" content="Brief description (150-160 chars)">
<meta name="keywords" content="chrome, javascript, tutorial">

<!-- Update OG tags -->
<meta property="og:url" content="https://tekky.cc/blog/your-post-slug.html">
<meta property="og:title" content="Your Post Title">
<meta property="og:description" content="Brief description">

<!-- Update Twitter tags -->
<meta property="twitter:url" content="https://tekky.cc/blog/your-post-slug.html">
<meta property="twitter:title" content="Your Post Title">
<meta property="twitter:description" content="Brief description">

<!-- Update canonical -->
<link rel="canonical" href="https://tekky.cc/blog/your-post-slug.html">
```

**2. Post Header:**
```html
<h1 class="post-title">Your Post Title Goes Here</h1>

<div class="post-meta">
  <time datetime="2026-01-20" class="post-date">January 20, 2026</time>
  <span class="post-separator">•</span>
  <span class="post-reading-time">5 min read</span>
</div>

<div class="post-tags">
  <span class="tag">Chrome Extensions</span>
  <span class="tag">JavaScript</span>
  <span class="tag">Tutorial</span>
</div>
```

**3. Post Content:**
Replace all the placeholder content in the `<div class="post-content">` section with your actual blog post.

**4. Share Links:**
Update the Twitter share URL:
```html
<a href="https://twitter.com/intent/tweet?url=https://tekky.cc/blog/your-post-slug.html&text=Your Post Title" ...>
```

### Step 3: Add Entry to posts.json

Open `blog/posts.json` and add your new post to the array:

```json
{
  "posts": [
    {
      "title": "Your Post Title",
      "slug": "your-post-slug",
      "date": "2026-01-20",
      "dateFormatted": "January 20, 2026",
      "description": "Brief description of your post (same as meta description)",
      "tags": ["Chrome Extensions", "JavaScript", "Tutorial"],
      "readTime": "5 min read",
      "featured": false
    },
    {
      "title": "Welcome to the tekky.cc Blog",
      "slug": "welcome-to-tekky-blog",
      ...
    }
  ]
}
```

**Important:**
- Posts are sorted by date (newest first) automatically
- Add new posts at the TOP of the array
- Set `"featured": true` to highlight a post with special styling

### Step 4: Test Locally

```bash
python -m http.server 8000
# Open: http://localhost:8000/blog/
```

Check:
- [ ] Post appears in blog index
- [ ] Post card looks correct
- [ ] Clicking card opens post
- [ ] Post content displays properly
- [ ] Images load (if any)
- [ ] Tags display correctly

### Step 5: Commit and Deploy

```bash
git add blog/your-post-slug.html blog/posts.json
git commit -m "Add blog post: Your Post Title"
git push origin main
```

GitHub Pages will automatically deploy in 2-3 minutes!

---

## 📐 Content Guidelines

### Post Structure

A good blog post should have:

1. **Lead Paragraph** - Use `<p class="lead">` for the intro
2. **Clear Headings** - Use H2 for main sections, H3 for subsections
3. **Short Paragraphs** - Keep paragraphs 2-4 sentences
4. **Code Examples** - Use syntax highlighting (see below)
5. **Lists** - Break up content with bullet points or numbered lists
6. **Images** - Add relevant screenshots or diagrams
7. **Conclusion** - Wrap up with key takeaways

### HTML Elements You Can Use

**Headings:**
```html
<h2>Main Section</h2>
<h3>Subsection</h3>
<h4>Minor Heading</h4>
```

**Paragraphs:**
```html
<p class="lead">Introduction paragraph (larger text)</p>
<p>Regular paragraph text</p>
```

**Lists:**
```html
<ul>
  <li>Unordered item</li>
  <li>Another item</li>
</ul>

<ol>
  <li>Step one</li>
  <li>Step two</li>
</ol>
```

**Code Blocks:**
```html
<pre><code class="language-javascript">
// Your code here
function example() {
  console.log('Hello, world!');
}
</code></pre>
```

**Inline Code:**
```html
<p>Use the <code>addEventListener</code> method...</p>
```

**Blockquotes:**
```html
<blockquote>
  <p>Important callout or quote</p>
</blockquote>
```

**Links:**
```html
<a href="https://example.com">Link text</a>
```

**Images:**
```html
<img src="/assets/images/blog/my-image.png" 
     alt="Descriptive alt text"
     class="post-content-image">
```

### Writing Tips

**Do:**
- ✅ Write clear, concise content
- ✅ Use code examples to illustrate points
- ✅ Include screenshots where helpful
- ✅ Break up long sections with headings
- ✅ Add tags relevant to the content
- ✅ Proofread before publishing

**Don't:**
- ❌ Use overly technical jargon without explanation
- ❌ Write walls of text without breaks
- ❌ Forget to add alt text to images
- ❌ Leave placeholder content in the template
- ❌ Use inline styles (use classes instead)

---

## 📂 File Organization

```
blog/
├── index.html              # Blog home (automatically lists posts)
├── posts.json              # Post metadata (you edit this)
├── post-template.html      # Template for new posts (copy this)
├── welcome-to-tekky-blog.html  # Example post
└── your-new-post.html      # Your posts go here
```

---

## 🎨 Styling

All blog post styling is in `assets/css/blog.css`. The styles are already applied via class names in the template.

**Don't add custom CSS to individual posts.** If you need special styling, add it to `blog.css` and use classes.

---

## 🔧 Advanced Tips

### Adding Images

1. Save images to `assets/images/blog/`
2. Optimize images (use tools like TinyPNG)
3. Reference in post:
```html
<img src="/assets/images/blog/my-screenshot.png" alt="Screenshot of extension">
```

### Code Syntax Highlighting

For future enhancement, you can add a library like Prism.js or highlight.js. For now, code appears in monospace with basic styling.

### Setting a Featured Post

In `posts.json`, set `"featured": true` to give a post special styling with a gradient background.

### Reading Time Calculation

Rough formula: 200-250 words per minute
- 500 words = 2-3 min read
- 1000 words = 4-5 min read
- 1500 words = 6-8 min read

---

## 🐛 Troubleshooting

**Post doesn't appear on blog index:**
- Check `posts.json` for syntax errors (use JSONLint.com)
- Ensure the slug in JSON matches the filename
- Check browser console for JavaScript errors

**Images not loading:**
- Verify image path is correct (starts with `/assets/images/`)
- Check file extension matches (case-sensitive on some servers)
- Test image URL directly in browser

**Formatting looks wrong:**
- Check that you're using the correct HTML structure
- Verify you didn't accidentally delete closing tags
- View browser console for CSS errors

**JSON syntax errors:**
- Don't forget commas between objects
- Don't add comma after last object in array
- Use double quotes, not single quotes
- Test with: https://jsonlint.com/

---

## 📈 Future Enhancements

When you're ready to upgrade, you can add:

- **Syntax highlighting** - Add Prism.js or highlight.js
- **Comments** - Use utterances or giscus (GitHub-based)
- **RSS feed** - Generate from posts.json
- **Search** - Add client-side search with Lunr.js
- **Categories** - Group posts by topic
- **Pagination** - Split into pages after 10+ posts
- **Jekyll/11ty** - Migrate to static site generator

---

## 📚 Example Workflow

Here's a complete example of adding a new post:

```bash
# 1. Copy template
cp blog/post-template.html blog/building-first-extension.html

# 2. Edit the file (update title, content, meta tags)
# Use your text editor...

# 3. Update posts.json
# Add new entry at TOP of posts array

# 4. Test locally
python -m http.server 8000
# Visit: http://localhost:8000/blog/

# 5. Commit and push
git add blog/building-first-extension.html blog/posts.json
git commit -m "Add post: Building Your First Chrome Extension"
git push origin main

# 6. Wait 2-3 minutes for GitHub Pages to deploy
# Visit: https://tekky.cc/blog/
```

Done! 🎉

---

## Need Help?

If you get stuck:
1. Check the example post: `blog/welcome-to-tekky-blog.html`
2. Validate JSON: https://jsonlint.com/
3. Check browser console (F12) for errors
4. Test locally before pushing

---

**Happy blogging!** 📝
