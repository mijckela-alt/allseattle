import { BUSINESSES, BUSINESS_CATEGORIES } from "../mock-data/businesses.js";

const PACKAGE_CLASS = {
  Standard: "badge-standard",
  Lux: "badge-lux",
  Premium: "badge-premium",
};

function bizCardTemplate(biz) {
  return `
  <article class="card biz-card">
    <div class="biz-card-photo">
      <img src="${biz.photo}" alt="${biz.name}" loading="lazy">
      <span class="badge ${PACKAGE_CLASS[biz.package]}">${biz.package}</span>
    </div>
    <div class="biz-card-body">
      <div class="biz-card-cat">${biz.category}</div>
      <h3 style="margin-bottom:6px;">${biz.name}</h3>
      <p class="biz-card-desc">${biz.description}</p>
      <div class="biz-card-phone">${biz.phone}</div>
    </div>
  </article>`;
}

function renderFilters(activeCategory) {
  const el = document.getElementById("category-filter");
  if (!el) return;
  const categories = ["All", ...BUSINESS_CATEGORIES];
  el.innerHTML = categories
    .map((cat) => `<button data-cat="${cat}" class="${cat === activeCategory ? "active" : ""}">${cat}</button>`)
    .join("");
}

function renderGrid(activeCategory) {
  const grid = document.getElementById("biz-grid");
  if (!grid) return;
  const list = activeCategory === "All" ? BUSINESSES : BUSINESSES.filter((b) => b.category === activeCategory);
  grid.innerHTML = list.length
    ? list.map(bizCardTemplate).join("")
    : `<p class="muted">No businesses found in this category yet.</p>`;
}

function wireFilters() {
  const el = document.getElementById("category-filter");
  if (!el) return;
  let active = "All";
  el.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-cat]");
    if (!btn) return;
    active = btn.dataset.cat;
    renderFilters(active);
    renderGrid(active);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFilters("All");
  renderGrid("All");
  wireFilters();
});
