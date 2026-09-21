import { PIN_LOGO_SVG, SOCIAL_ICONS } from "/js/logo.js";
import { markActiveNav } from "/js/nav-active.js";

const HERO_ITEMS = [
  { key: "space-needle", label: "Space Needle", img: "/img/hero/space-needle.jpg" },
  { key: "downtown", label: "Downtown Seattle", img: "/img/hero/downtown.jpg" },
  { key: "mount-rainier", label: "Mount Rainier", img: "/img/hero/mount-rainier.jpg" },
  { key: "waterfront", label: "Seattle Waterfront", img: "/img/hero/waterfront.jpg" },
  { key: "pike-place", label: "Pike Place Market", img: "/img/hero/pike-place.jpg" },
];

const NAV_LINKS = [
  { key: "home", label: "Home", href: "/index.html" },
  { key: "news", label: "News", href: "/news.html" },
  { key: "directory", label: "Directory", href: "/directory.html" },
  { key: "pricing", label: "Pricing", href: "/pricing.html" },
  { key: "auto", label: "Auto", href: "/auto/index.html" },
];

const NAV_DISABLED = ["Jobs", "Events", "Shopping", "Entertainment", "Weather"];

function weatherNow() {
  const d = new Date();
  const dateStr = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  return { city: "Seattle, WA", date: dateStr, temp: "61°F", note: "Cloudy, no precipitation" };
}

function heroMarkup() {
  return `
  <div class="hero-banner" id="hero-banner">
    <div class="hero-collage">
      ${HERO_ITEMS.map((h) => `<img src="${h.img}" alt="${h.label}" class="hero-collage-img hero-collage-${h.key}">`).join("")}
      <div class="hero-collage-overlay"></div>
      <div class="hero-text">
        <span class="hero-script">Seattle</span>
        <span class="hero-sub">THE EMERALD CITY</span>
      </div>
    </div>
    <div class="hero-icons">
      <div class="container hero-icons-row">
        ${HERO_ITEMS.map((h) => `
          <div class="hero-icon">
            <img src="${h.img}" alt="" class="hero-icon-img">
            <span>${h.label}</span>
          </div>`).join("")}
      </div>
    </div>
  </div>`;
}

function heroInnerMarkup() {
  return `
  <div class="hero-banner hero-banner--inner" id="hero-banner">
    <div class="container hero-inner-row">
      <div class="hero-inner-text">
        <span class="hero-script hero-script--sm">Seattle</span>
        <span class="hero-sub">THE EMERALD CITY</span>
      </div>
      <div class="hero-icons-row hero-icons-row--inner">
        ${HERO_ITEMS.map((h) => `<div class="hero-icon hero-icon--sm"><img src="${h.img}" alt="" class="hero-icon-img"><span>${h.label}</span></div>`).join("")}
      </div>
    </div>
  </div>`;
}

function functionalHeaderMarkup() {
  const w = weatherNow();
  return `
  <header class="site-header" id="site-header-functional">
    <div class="container header-top">
      <div class="weather-stub" aria-label="Weather (demo widget)">
        <span class="weather-icon" aria-hidden="true">&#9925;</span>
        <div class="weather-text">
          <strong>${w.city}</strong>
          <span>${w.date} &middot; ${w.temp}</span>
          <span class="weather-note">${w.note}</span>
        </div>
      </div>
      <a href="/index.html" class="site-logo">
        <span class="site-logo-icon">${PIN_LOGO_SVG}</span>
        <span class="site-logo-text">
          <span class="site-logo-word">AllSeattle</span>
          <span class="site-logo-tagline">NEWS &middot; BUSINESS &middot; EVENTS &middot; MORE</span>
        </span>
      </a>
      <form class="search-stub" id="search-stub" role="search">
        <input type="search" placeholder="Search AllSeattle..." aria-label="Search">
        <button type="submit" aria-label="Search">&#128269;</button>
      </form>
    </div>
    <nav class="site-nav">
      <div class="container nav-inner">
        <ul class="nav-links">
          ${NAV_LINKS.map((n) => `<li><a href="${n.href}" data-page="${n.key}">${n.label}</a></li>`).join("")}
          ${NAV_DISABLED.map((label) => `<li class="nav-disabled"><a href="#" onclick="return false" title="Coming soon">${label}</a></li>`).join("")}
        </ul>
        <div class="nav-extra">
          <div class="social-links">
            <a href="#" title="Facebook (demo)" aria-label="Facebook">${SOCIAL_ICONS.facebook}</a>
            <a href="#" title="Twitter (demo)" aria-label="Twitter">${SOCIAL_ICONS.twitter}</a>
            <a href="#" title="Instagram (demo)" aria-label="Instagram">${SOCIAL_ICONS.instagram}</a>
          </div>
          <a href="#" class="nav-stub">Register Business</a>
          <a href="#" class="nav-stub nav-stub--accent">Log In</a>
        </div>
      </div>
    </nav>
  </header>`;
}

export function renderHeader(pageType) {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const hero = pageType === "home" ? heroMarkup() : heroInnerMarkup();
  mount.innerHTML = hero + functionalHeaderMarkup();
  markActiveNav();
  wireSearchStub();
}

function wireSearchStub() {
  const form = document.getElementById("search-stub");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    if (input) {
      const original = input.placeholder;
      input.value = "";
      input.placeholder = "Search is a demo placeholder";
      setTimeout(() => { input.placeholder = original; }, 2200);
    }
  });
}

export function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const year = new Date().getFullYear();
  mount.innerHTML = `
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-col footer-brand">
        <span class="site-logo-icon site-logo-icon--sm">${PIN_LOGO_SVG}</span>
        <span class="site-logo-word">AllSeattle</span>
        <p class="footer-slogan">&ldquo;If you're not on this website, you don't exist.&rdquo;</p>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li>Phone: <a href="tel:+12063318216">(206) 331-8216</a></li>
          <li>Email: <span class="muted">Coming soon</span></li>
          <li>Seattle, WA</li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Follow us</h4>
        <ul>
          <li>Facebook: <span class="muted">Coming soon</span></li>
          <li>Instagram: <span class="muted">Coming soon</span></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <ul>
          <li><a href="/news.html">News</a></li>
          <li><a href="/directory.html">Business Directory</a></li>
          <li><a href="/auto/index.html">Auto</a></li>
          <li><a href="/pricing.html">Advertise with us</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>This is a demo prototype. allseattle.com is not a live, purchased domain yet.</p>
      <p>&copy; ${year} AllSeattle. All rights reserved.</p>
    </div>
  </footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const pageType = document.body.dataset.pageType || "inner";
  renderHeader(pageType);
  renderFooter();
});
