/**
 * tekky.cc - Homepage project renderer
 *
 * Reads data/projects.json and builds the Highlights + All Projects sections.
 * Everything is created with DOM APIs (no innerHTML with data) so untrusted
 * fields can never inject markup. To change what shows up, edit the JSON —
 * this file rarely needs touching.
 */
(function () {
  'use strict';

  var DATA_URL = './data/projects.json';

  var CATEGORY_LABELS = { extension: 'Extension', app: 'Desktop App' };
  var STATUS_LABELS = {
    active: 'Active',
    'coming-soon': 'Coming soon',
    'in-development': 'In development'
  };

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

  function actionsRow(project) {
    var wrap = el('div', 'card-actions');
    if (project.page) {
      var details = el('a', 'card-link', 'View details');
      details.href = project.page;
      wrap.appendChild(details);
    }
    if (project.repo) {
      var repo = el('a', 'card-link card-link--muted', 'Source');
      repo.href = project.repo;
      repo.target = '_blank';
      repo.rel = 'noopener noreferrer';
      wrap.appendChild(repo);
    }
    return wrap;
  }

  // --- featured card -------------------------------------------------------
  function featuredCard(project, index) {
    var card = el('article', 'feature-card reveal');

    var media = el('div', 'feature-card-media');
    var img = el('img');
    img.src = project.icon;
    img.alt = project.name + ' icon';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 96;
    img.height = 96;
    media.appendChild(img);
    if (project.badge) media.appendChild(el('span', 'feature-badge', project.badge));
    card.appendChild(media);

    var body = el('div', 'feature-card-body');

    var head = el('div', 'card-head');
    head.appendChild(el('span', 'card-index', pad(index + 1)));
    head.appendChild(el('span', 'card-cat', metaLine(project)));
    body.appendChild(head);

    var title = el('h3', 'card-title');
    var titleLink = el('a', null, project.name);
    titleLink.href = project.page || project.repo || '#';
    title.appendChild(titleLink);
    body.appendChild(title);

    body.appendChild(el('p', 'card-tagline', project.tagline));
    body.appendChild(el('p', 'card-desc', project.description));

    if (project.highlights && project.highlights.length) {
      var list = el('ul', 'highlight-list');
      project.highlights.forEach(function (h) {
        list.appendChild(el('li', null, h));
      });
      body.appendChild(list);
    }

    body.appendChild(tagRow(project));
    body.appendChild(actionsRow(project));

    card.appendChild(body);
    return card;
  }

  // --- compact grid card ---------------------------------------------------
  function projectCard(project, index) {
    var card = el('article', 'project-card reveal');
    card.setAttribute('data-category', project.category);

    var head = el('div', 'card-head');
    head.appendChild(el('span', 'card-index', pad(index + 1)));
    var status = el('span', 'card-status card-status--' + project.status);
    status.appendChild(el('span', 'status-dot'));
    status.appendChild(document.createTextNode(STATUS_LABELS[project.status] || project.status));
    head.appendChild(status);
    card.appendChild(head);

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

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  // --- filtering -----------------------------------------------------------
  function buildFilters(bar, grid, categories, projects) {
    var buttons = [];

    function make(id, label) {
      var btn = el('button', 'filter-btn', label);
      btn.type = 'button';
      btn.setAttribute('data-filter', id);
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        applyFilter(grid, id);
      });
      buttons.push(btn);
      bar.appendChild(btn);
      return btn;
    }

    make('all', 'All').classList.add('is-active');
    buttons[0].setAttribute('aria-pressed', 'true');
    categories.forEach(function (c) {
      // only show a category tab if at least one project uses it
      if (projects.some(function (p) { return p.category === c.id; })) {
        make(c.id, c.label);
      }
    });
  }

  function applyFilter(grid, id) {
    var visible = 0;
    grid.querySelectorAll('.project-card').forEach(function (card) {
      var show = id === 'all' || card.getAttribute('data-category') === id;
      card.classList.toggle('is-hidden', !show);
      if (show) {
        visible++;
        var idx = card.querySelector('.card-index');
        if (idx) idx.textContent = pad(visible);
      }
    });
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

  // --- hero copy / stats from profile --------------------------------------
  function hydrateProfile(profile, projects) {
    if (!profile) return;
    setText('hero-title', profile.headline);
    setText('hero-subtitle', profile.subhead);

    var total = projects.length;
    var original = projects.filter(function (p) { return p.origin === 'original'; }).length;
    var apps = projects.filter(function (p) { return p.category === 'app'; }).length;
    var exts = total - apps;

    setStat('stat-projects', total);
    setStat('stat-extensions', exts);
    setStat('stat-original', original);
  }

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node && value) node.textContent = value;
  }

  function setStat(id, value) {
    var node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  // --- boot ----------------------------------------------------------------
  function render(data) {
    var projects = data.projects || [];
    var categories = data.categories || [];

    hydrateProfile(data.profile, projects);

    var featuredGrid = document.getElementById('featured-grid');
    if (featuredGrid) {
      var featured = projects.filter(function (p) { return p.featured; });
      featured.forEach(function (p, i) { featuredGrid.appendChild(featuredCard(p, i)); });
      var featuredSection = document.getElementById('featured');
      if (featuredSection && !featured.length) featuredSection.hidden = true;
    }

    var grid = document.getElementById('project-grid');
    if (grid) {
      projects.forEach(function (p, i) { grid.appendChild(projectCard(p, i)); });
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
    if (!grid && !document.getElementById('featured-grid')) return; // not the homepage

    fetch(DATA_URL, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(render)
      .catch(function (err) {
        console.error('tekky.cc: could not load projects.json', err);
        showError(grid || document.getElementById('featured-grid'));
      });
  });
})();
