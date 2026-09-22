/* This file handles the intro, page switching, editable content, and photo viewer.
   See README.md for the everyday editing steps. No framework or build is needed. */
'use strict';

// Keep the original greeting and speed. Nothing is saved between visits.
const greeting = "Hello world!\nMy name is Alyssa Kou,\nand here's a website all about me :)";
const site = document.querySelector('#site');
const intro = document.querySelector('#intro');
const message = document.querySelector('#msg');
const pages = [...document.querySelectorAll('main > .page')];
const navLinks = [...document.querySelectorAll('.floating-header nav a')];
const lightbox = document.querySelector('#lightbox');

// Start every page load on Home, even if the address still says #work or #laila.
// replaceState updates the address without reloading or adding a Back-button step.
history.replaceState(null, '', location.pathname + location.search + '#home');

// Change only the visible page. Hash links let Back/Forward work between tabs.
function showPage(moveFocus = false) {
  const aliases = { about: 'home', projects: 'work', 'work-experience': 'work' };
  const requested = location.hash.slice(1);
  const name = aliases[requested] || requested;
  const active = pages.find(page => page.id === name) || pages[0];
  pages.forEach(page => { page.hidden = page !== active; });
  navLinks.forEach(link => {
    if (link.hash === '#' + active.id) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.title = active.id === 'home' ? 'Alyssa Kou' : active.id[0].toUpperCase() + active.id.slice(1) + ' | Alyssa Kou';
  if (lightbox.open) lightbox.close();
  if (moveFocus && !site.hidden) {
    window.scrollTo(0, 0);
    active.querySelector('h1').focus({ preventScroll: true });
  }
}
window.addEventListener('hashchange', () => showPage(true));
// Jump to the content without changing the currently selected page.
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('#main').focus();
});
showPage();

async function finishIntro() {
  // Prepare Home underneath the intro, then gently fade the intro away.
  // Keep the page inactive until the fade finishes so hidden links cannot be clicked.
  site.hidden = false;
  showPage();
  // A refresh should not restore the scroll position from the previous section.
  window.scrollTo(0, 0);

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const fade = intro.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 700, easing: 'ease-in-out', fill: 'forwards' }
    );
    // Still reveal the page if the browser interrupts the animation.
    try { await fade.finished; } catch { /* The intro can safely close now. */ }
    intro.hidden = true;
    fade.cancel();
  }

  intro.hidden = true;
  site.inert = false;
  document.body.classList.remove('intro-active');
}

// Finish typing before revealing the website; this still totals about five seconds.
function typeGreeting(index = 0) {
  message.textContent = greeting.slice(0, index);
  if (index < greeting.length) setTimeout(() => typeGreeting(index + 1), 50);
  else setTimeout(finishIntro, 1000);
}
typeGreeting();

// Check for missing files instead of silently showing an empty page.
async function readFile(path, asJson = false) {
  const response = await fetch(path);
  if (!response.ok) throw new Error('Could not load ' + path);
  return asJson ? response.json() : response.text();
}

// Only allow normal web links and local paths. Never turn script URLs into links.
function safeLink(value) {
  if (!value) return null;
  try {
    const url = new URL(value, location.href);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

// Tiny Markdown reader: paragraphs, - bullets, ## headings, **bold**, and [links](url).
// Everything is added as text nodes, so content files cannot inject HTML/scripts.
function addInline(parent, text) {
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^\s)]+)\)/g;
  let end = 0;
  for (const match of text.matchAll(pattern)) {
    parent.append(document.createTextNode(text.slice(end, match.index)));
    if (match[1]) {
      const strong = document.createElement('strong');
      strong.textContent = match[1];
      parent.append(strong);
    } else {
      const href = safeLink(match[3]);
      const link = document.createElement(href ? 'a' : 'span');
      link.textContent = match[2];
      if (href) {
        link.href = href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      parent.append(link);
    }
    end = match.index + match[0].length;
  }
  parent.append(document.createTextNode(text.slice(end)));
}
function renderMarkdown(text) {
  const container = document.createElement('div');
  container.className = 'prose';
  let paragraph = [];
  let list = null;
  function flushParagraph() {
    if (!paragraph.length) return;
    const p = document.createElement('p');
    addInline(p, paragraph.join(' '));
    container.append(p);
    paragraph = [];
  }
  for (const rawLine of text.replace(/\r/g, '').split('\n')) {
    const line = rawLine.trim();
    if (!line) { flushParagraph(); list = null; }
    else if (line.startsWith('- ')) {
      flushParagraph();
      if (!list) { list = document.createElement('ul'); container.append(list); }
      const item = document.createElement('li');
      addInline(item, line.slice(2));
      list.append(item);
    } else if (/^#{1,6} /.test(line)) {
      flushParagraph();
      list = null;
      const heading = document.createElement('h4');
      addInline(heading, line.replace(/^#{1,6} /, ''));
      container.append(heading);
    } else { list = null; paragraph.push(line); }
  }
  flushParagraph();
  return container;
}

// The lines between --- markers are simple "field: value" settings for a card.
// Keep values on one line; write longer descriptions below the second ---.
function parseEntry(text) {
  const normalized = text.replace(/\r/g, '');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error('Missing Markdown settings block');
  const fields = {};
  match[1].split('\n').forEach(line => {
    const separator = line.indexOf(':');
    if (separator > 0) fields[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  });
  if (!fields.title) throw new Error('Missing title');
  return { fields, body: match[2] };
}
function createCard(text) {
  const { fields, body } = parseEntry(text);
  const card = document.createElement('article');
  card.className = 'work-card';
  if (fields.date) {
    const date = document.createElement('p');
    date.className = 'card-date';
    date.textContent = fields.date;
    card.append(date);
  }
  const title = document.createElement('h3');
  title.textContent = fields.title;
  card.append(title, renderMarkdown(body));
  const href = safeLink(fields.link);
  if (href) {
    const link = document.createElement('a');
    link.className = 'card-link';
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    // Unicode escape keeps the arrow intact when the file is saved on Windows.
    link.textContent = (fields.linkLabel || 'View repository') + ' \u2192';
    card.append(link);
  }
  return card;
}
function errorMessage(text) {
  const p = document.createElement('p');
  p.setAttribute('role', 'status');
  p.textContent = text;
  return p;
}

// One missing entry should not prevent the other cards from appearing.
async function loadCards(paths, container) {
  const results = await Promise.allSettled(paths.map(async path => createCard(await readFile('content/' + path))));
  container.replaceChildren();
  for (const result of results) {
    if (result.status === 'fulfilled') container.append(result.value);
    else {
      console.error(result.reason);
      container.append(errorMessage('This entry could not load. Please try refreshing.'));
    }
  }
  if (!paths.length) container.append(errorMessage('More to come soon.'));
}
async function loadWork() {
  try {
    const content = await readFile('content/work.json', true);
    await Promise.all([
      loadCards(content.experience, document.querySelector('#experience-list')),
      loadCards(content.projects, document.querySelector('#project-list'))
    ]);
  } catch (error) {
    console.error(error);
    ['#experience-list', '#project-list'].forEach(selector => {
      document.querySelector(selector).replaceChildren(errorMessage('Content could not load. Please try refreshing.'));
    });
  }
}
async function loadBio() {
  try {
    document.querySelector('#bio').replaceChildren(...renderMarkdown(await readFile('content/about.md')).childNodes);
  } catch (error) { console.error(error); } // Keep the useful fallback biography.
}

// Use the photo's full file in the viewer; CSS fits it inside the screen.
function openPhoto(photo) {
  const image = lightbox.querySelector('img');
  image.src = photo.src;
  image.alt = photo.alt;
  document.querySelector('#photo-caption').textContent = photo.caption || '';
  lightbox.showModal();
}
lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
// The browser handles Escape and restores focus to the photo that was clicked.
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});
async function loadGallery() {
  const gallery = document.querySelector('#gallery');
  try {
    const photos = await readFile('content/laila.json', true);
    const buttons = photos.map((photo, index) => {
      const button = document.createElement('button');
      button.className = 'photo-button';
      button.type = 'button';
      button.setAttribute('aria-label', 'Enlarge photo ' + (index + 1) + ': ' + photo.alt);
      const image = document.createElement('img');
      image.src = photo.src;
      image.alt = photo.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      // Saved dimensions reserve the right amount of space before each photo loads.
      if (photo.width && photo.height) { image.width = photo.width; image.height = photo.height; }
      button.append(image);
      button.addEventListener('click', () => openPhoto(photo));
      return button;
    });
    gallery.replaceChildren(...buttons);
  } catch (error) {
    console.error(error);
    gallery.replaceChildren(errorMessage("Laila's photos could not load. Please try refreshing."));
  }
}

// Fetch content while the welcome animation is playing.
loadBio();
loadWork();
loadGallery();
