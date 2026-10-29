/**
 * tekky.cc - Homepage project renderer
 *
 * Reads data/projects.json and builds the project grid and its filter tabs.
 * Everything is created with DOM APIs (no innerHTML with data) so untrusted
 * fields can never inject markup. To change what shows up, edit the JSON —
 * this file rarely needs touching.
 */
(function () {
  'use strict';

  var DATA_URL = './data/projects.json';

  var CATEGORY_LABELS = { extension: 'Extension', app: 'Desktop App' };

  // --- tiny DOM helpers ----------------------------------------------------
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function metaLine(project) {
    // Category only — credit/attribution for forks lives on each project page.
    return CATEGORY_LABELS[project.category] || project.category;
  }

  function tagRow(project) {
    var wrap = el('div', 'tag-row');
    (project.tags || []).forEach(function (t, i) {
      wrap.appendChild(el('span', i === 0 ? 'tag tag-primary' : 'tag', t));
    });
    return wrap;
  }

  // A single link per card. The detail page carries the link to the source.
  function actionsRow(project) {
    var wrap = el('div', 'card-actions');
    if (project.page) {
      var details = el('a', 'card-link', 'View details');
      details.href = project.page;
      wrap.appendChild(details);
    }
    return wrap;
  }

  // --- project card --------------------------------------------------------
  function projectCard(project) {
    var card = el('article', 'project-card reveal');
    card.setAttribute('data-category', project.category);

    var top = el('div', 'project-card-top');
    var img = el('img', 'project-icon');
    img.src = project.icon;
    img.alt = project.name + ' icon';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 48;
    img.height = 48;
    top.appendChild(img);

    var titleWrap = el('div');
    var title = el('h3', 'card-title');
    var titleLink = el('a', null, project.name);
    titleLink.href = project.page || project.repo || '#';
    title.appendChild(titleLink);
    titleWrap.appendChild(title);
    titleWrap.appendChild(el('span', 'card-cat', metaLine(project)));
    top.appendChild(titleWrap);
    card.appendChild(top);

    card.appendChild(el('p', 'card-desc', project.tagline));
    card.appendChild(tagRow(project));
    card.appendChild(actionsRow(project));

    return card;
  }

  // --- filtering -----------------------------------------------------------
  function buildFilters(bar, grid, categories, projects) {
    var buttons = [];

    function setActive(active) {
      buttons.forEach(function (b) {
        var on = b === active;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    function make(id, label) {
      var btn = el('button', 'filter-btn', label);
      btn.type = 'button';
      btn.setAttribute('data-filter', id);
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function () {
        setActive(btn);
        applyFilter(grid, id);
      });
      buttons.push(btn);
      bar.appendChild(btn);
      return btn;
    }

    make('all', 'All');
    categories.forEach(function (c) {
      // only show a category tab if at least one project uses it
      if (projects.some(function (p) { return p.category === c.id; })) {
        make(c.id, c.label);
      }
    });
    setActive(buttons[0]);
  }

  function applyFilter(grid, id) {
    var visible = 0;
    var cards = grid.querySelectorAll('.project-card');
    cards.forEach(function (card) {
      var show = id === 'all' || card.getAttribute('data-category') === id;
      card.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });
    // Tell assistive tech what the filter did; the grid changes silently otherwise.
    var status = document.getElementById('filter-status');
    if (status) {
      status.textContent = 'Showing ' + visible + ' of ' + cards.length + ' projects';
    }
  }

  // --- reveal-on-scroll (shared pattern, progressive enhancement) ----------
  function revealAll(scope) {
    var cards = scope.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      cards.forEach(function (c) { c.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    cards.forEach(function (c) { io.observe(c); });
    // safety net
    setTimeout(function () {
      cards.forEach(function (c) { c.classList.add('is-visible'); });
    }, 1200);
  }

  // --- boot ----------------------------------------------------------------
  function render(data) {
    var projects = data.projects || [];
    var categories = data.categories || [];

    var grid = document.getElementById('project-grid');
    if (grid) {
      projects.forEach(function (p) { grid.appendChild(projectCard(p)); });
      var bar = document.getElementById('filter-bar');
      if (bar) buildFilters(bar, grid, categories, projects);
    }

    revealAll(document);
  }

  function showError(container) {
    if (!container) return;
    var note = el('p', 'load-error',
      'Projects are on my GitHub — the live list could not load here.');
    var link = el('a', null, 'View everything on GitHub →');
    link.href = 'https://github.com/luisf371';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    note.appendChild(document.createElement('br'));
    note.appendChild(link);
    container.appendChild(note);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('project-grid');
    if (!grid) return; // not the homepage

    fetch(DATA_URL, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(render)
      .catch(function (err) {
        console.error('tekky.cc: could not load projects.json', err);
        showError(grid);
      });
  });
})();
