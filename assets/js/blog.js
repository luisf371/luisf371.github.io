/**
 * tekky.cc - Blog Posts Loader
 * Dynamically loads blog posts from posts.json
 */

document.addEventListener('DOMContentLoaded', function() {
  loadBlogPosts();
});

/**
 * Load blog posts from posts.json and display them
 */
async function loadBlogPosts() {
  const container = document.getElementById('blog-posts-container');
  const emptyState = document.getElementById('blog-empty');
  
  if (!container) return;
  
  try {
    // Fetch posts data
    const response = await fetch('./posts.json');
    if (!response.ok) {
      throw new Error('Failed to load posts');
    }
    
    const data = await response.json();
    const posts = data.posts || [];
    
    // Clear loading state
    container.innerHTML = '';
    
    // If no posts, show empty state
    if (posts.length === 0) {
      container.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Create post cards
    posts.forEach(post => {
      const postCard = createPostCard(post);
      container.appendChild(postCard);
    });
    
  } catch (error) {
    console.error('Error loading blog posts:', error);
    container.innerHTML = `
      <div class="blog-post-card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
        <p style="color: var(--text-tertiary);">Failed to load posts. Please try again later.</p>
      </div>
    `;
  }
}

/**
 * Create a blog post card element
 */
function createPostCard(post) {
  const card = document.createElement('a');
  card.href = `./${post.slug}.html`;
  card.className = 'blog-post-card';
  
  // Add featured class if applicable
  if (post.featured) {
    card.classList.add('blog-post-featured');
  }
  
  // Post meta (date and reading time)
  const metaHTML = `
    <div class="blog-post-card-meta">
      <time datetime="${escapeHtml(post.date)}" class="blog-post-card-date">${escapeHtml(post.dateFormatted)}</time>
      <span class="blog-post-card-separator">•</span>
      <span class="blog-post-card-read-time">${escapeHtml(post.readTime)}</span>
    </div>
  `;
  
  // Post title
  const titleHTML = `
    <h2 class="blog-post-card-title">${escapeHtml(post.title)}</h2>
  `;
  
  // Post description
  const descriptionHTML = `
    <p class="blog-post-card-description">${escapeHtml(post.description)}</p>
  `;
  
  // Post tags
  let tagsHTML = '';
  if (post.tags && post.tags.length > 0) {
    const tagsContent = post.tags
      .map(tag => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join('');
    tagsHTML = `<div class="blog-post-card-tags">${tagsContent}</div>`;
  }
  
  // Read more link
  const readMoreHTML = `
    <span class="blog-post-card-read-more">Read article</span>
  `;
  
  // Combine all parts
  card.innerHTML = metaHTML + titleHTML + descriptionHTML + tagsHTML + readMoreHTML;
  
  return card;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Log when loaded
console.log('📝 Blog posts loader ready');
