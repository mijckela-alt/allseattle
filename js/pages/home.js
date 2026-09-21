import { NEWS_ARTICLES } from "/js/mock-data/news.js";
import { BUSINESSES } from "/js/mock-data/businesses.js";
import { CAR_LISTINGS } from "/js/mock-data/cars.js";

function newsCardTemplate(article) {
  return `
  <article class="card news-card">
    <a href="/news.html" class="news-card-photo"><img src="${article.photo}" alt="${article.title}" loading="lazy"></a>
    <div class="news-card-body">
      <div class="news-card-meta">
        <span class="cat">${article.category}</span>
        <span>&middot;</span>
        <span>${article.date}</span>
      </div>
      <h3><a href="/news.html">${article.title}</a></h3>
      <p class="news-card-excerpt">${article.excerpt}</p>
      <a href="/news.html" class="news-card-more">Read more &rarr;</a>
    </div>
  </article>`;
}

function renderNewsGrid() {
  const grid = document.getElementById("home-news-grid");
  if (!grid) return;
  grid.innerHTML = NEWS_ARTICLES.slice(0, 8).map(newsCardTemplate).join("");
}

function renderStatsWidget() {
  const el = document.getElementById("widget-stats");
  if (!el) return;
  el.innerHTML = `
    <h4>AllSeattle by the numbers</h4>
    <div class="widget-stat-row"><span>Listed businesses</span><strong>${BUSINESSES.length * 41}+</strong></div>
    <div class="widget-stat-row"><span>Active car listings</span><strong>${CAR_LISTINGS.length * 27}+</strong></div>
    <div class="widget-stat-row"><span>News articles this month</span><strong>${NEWS_ARTICLES.length * 6}+</strong></div>
    <div class="widget-stat-row"><span>Monthly visitors</span><strong>48,200+</strong></div>
  `;
}

function renderCurrencyWidget() {
  const el = document.getElementById("widget-currency");
  if (!el) return;
  el.innerHTML = `
    <h4>Exchange rates <span class="muted" style="font-weight:400;text-transform:none;">(demo)</span></h4>
    <div class="widget-stat-row"><span>EUR / USD</span><strong>1.07</strong></div>
    <div class="widget-stat-row"><span>GBP / USD</span><strong>1.26</strong></div>
    <div class="widget-stat-row"><span>CAD / USD</span><strong>0.73</strong></div>
    <div class="widget-stat-row"><span>UAH / USD</span><strong>0.024</strong></div>
  `;
}

function renderJobsWidget() {
  const el = document.getElementById("widget-jobs");
  if (!el) return;
  el.innerHTML = `
    <h4>Job search <span class="muted" style="font-weight:400;text-transform:none;">(coming soon)</span></h4>
    <div class="field" style="margin-bottom:10px;">
      <input type="text" placeholder="Job title or keyword" disabled>
    </div>
    <button class="btn btn-navy btn-sm btn-block" type="button" disabled>Search Jobs</button>
  `;
}

function renderTransitWidget() {
  const el = document.getElementById("widget-transit");
  if (!el) return;
  el.innerHTML = `
    <h4>City transit</h4>
    <div class="widget-stat-row"><span>Link Light Rail</span><strong style="color:var(--color-success)">On time</strong></div>
    <div class="widget-stat-row"><span>RapidRide lines</span><strong style="color:var(--color-success)">On time</strong></div>
    <div class="widget-stat-row"><span>Washington State Ferries</span><strong style="color:#B7791F">Minor delays</strong></div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNewsGrid();
  renderStatsWidget();
  renderCurrencyWidget();
  renderJobsWidget();
  renderTransitWidget();
});
