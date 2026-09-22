const AD_DIMS = {
  "970x250": { w: 970, h: 250 },
  "728x90": { w: 728, h: 90 },
  "300x250": { w: 300, h: 250 },
  "300x600": { w: 300, h: 600 },
  "320x100": { w: 320, h: 100 },
};

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function mockInventory(seed) {
  // Hashes on seed alone (not size) so the same placement keeps the same
  // Occupied/Available status and price everywhere it appears — in the
  // desktop sidebar, its own mobile-size swap, and the mobile inline echo.
  const h = hashSeed(seed);
  const occupied = h % 5 < 3; // ~60% occupied, feels like a site that's selling
  const basePrice = 90 + (h % 7) * 35;
  return { status: occupied ? "Occupied" : "Available", price: `$${basePrice}/wk` };
}

// variant: "desktop" | "mobile-only" toggles visibility via the site-wide
// @media(max-width:760px) swap; "standalone" has no such toggle class, so
// it's always visible whenever its own container is (used for the inline
// mobile-feed ads, whose visibility is controlled by their wrapper instead).
function adSlotHtml(seed, size, variant) {
  const dims = AD_DIMS[size] || { w: 300, h: 250 };
  const info = mockInventory(seed);
  const statusClass = info.status === "Occupied" ? "is-occupied" : "is-available";
  const aspect = (dims.h / dims.w) * 100;
  const variantClass = variant === "mobile-only" ? "ad-slot--mobile-only" : variant === "desktop" ? "ad-slot--desktop" : "";
  return `
  <div class="ad-slot ${variantClass}" style="--ad-max-w:${dims.w}px;--ad-aspect:${aspect}%">
    <div class="ad-slot-inner">
      <span class="ad-slot-label">Your Ad Here</span>
      <span class="ad-slot-size">${size}</span>
      <span class="ad-slot-status ${statusClass}">${info.status} &middot; ${info.price}</span>
    </div>
  </div>`;
}

/**
 * Renders one ad placement. `size` is the primary (desktop) size.
 * Pass `mobileSize` (usually "320x100") to swap in a mobile-appropriate
 * size below 760px via CSS, instead of the desktop one.
 */
export function renderAdSlot(seed, size, { mobileSize } = {}) {
  if (mobileSize) {
    return `<div class="ad-slot-wrap">${adSlotHtml(seed, size, "desktop")}${adSlotHtml(seed, mobileSize, "mobile-only")}</div>`;
  }
  return `<div class="ad-slot-wrap">${adSlotHtml(seed, size, "desktop")}</div>`;
}

/**
 * Fully-rendered markup for an ad placement interleaved inline in a content
 * feed on mobile (hidden on desktop via the .ad-mobile-inline-slot wrapper
 * class — see components.css). Always the compact 320x100 mobile size.
 * Renders immediately rather than through mountAdSlots()'s lazy [data-ad-slot]
 * pass, since the inner box must never carry the --desktop/--mobile-only
 * toggle classes (those are hidden by the very breakpoint this wrapper
 * relies on to show itself). Passing the same `seed` as the desktop sidebar
 * version keeps their mock Occupied/price status identical.
 */
export function inlineAdMarkup(seed) {
  return `<div class="ad-mobile-inline-slot"><div class="ad-slot-wrap">${adSlotHtml(seed, "320x100", "standalone")}</div></div>`;
}

export function mountAdSlots(root) {
  root.querySelectorAll("[data-ad-slot]").forEach((el) => {
    const size = el.dataset.adSlot;
    const mobileSize = el.dataset.adSlotMobile;
    const seed = el.dataset.adSeed || size;
    el.innerHTML = renderAdSlot(seed, size, { mobileSize });
  });
}

document.addEventListener("DOMContentLoaded", () => mountAdSlots(document));
