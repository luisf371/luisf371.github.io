/**
 * tekky.cc - Main JavaScript
 * Navigation, interactions, theme switching, and utilities
 */

// Theme Toggle Functionality
(function() {
  // Get saved theme from localStorage or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Apply theme immediately to prevent flash
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
      // Set initial ARIA label
      updateThemeToggleAriaLabel(savedTheme);
      
      // Add click handler
      themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update ARIA label
        updateThemeToggleAriaLabel(newTheme);
      });
    }
  });
  
  function updateThemeToggleAriaLabel(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', 
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }
})();

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navLinks.classList.contains('active');
      navLinks.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close mobile menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navToggle.contains(event.target) || navLinks.contains(event.target);
      if (!isClickInsideNav && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Ignore if it's just "#"
      if (targetId === '#') {
        e.preventDefault();
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Email obfuscation (simple decode)
  const emailLink = document.getElementById('email-link');
  if (emailLink) {
    emailLink.style.cursor = 'pointer';
    emailLink.addEventListener('click', function() {
      const user = 'contact';
      const domain = 'tekky.cc';
      const email = user + '@' + domain;
      
      // Create mailto link
      window.location.href = 'mailto:' + email;
    });
    
    // Show actual email on hover (optional)
    emailLink.addEventListener('mouseenter', function() {
      const user = 'contact';
      const domain = 'tekky.cc';
      this.textContent = user + '@' + domain;
    });
    
    emailLink.addEventListener('mouseleave', function() {
      this.textContent = 'contact [at] tekky [dot] cc';
    });
  }
  
  // Highlight current page in navigation
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Add animation on scroll (optional - for future enhancements)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe cards for fade-in animation (if desired)
  document.querySelectorAll('.extension-card').forEach(card => {
    // Initialize opacity and transform for animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
  
});

// Utility: Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Log when site is ready
console.log('🚀 tekky.cc loaded successfully');
