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

function mockInventory(seed, size) {
  const h = hashSeed(seed + size);
  const occupied = h % 5 < 3; // ~60% occupied, feels like a site that's selling
  const basePrice = 90 + (h % 7) * 35;
  return { status: occupied ? "Occupied" : "Available", price: `$${basePrice}/wk` };
}

function adSlotHtml(seed, size, mobile) {
  const dims = AD_DIMS[size] || { w: 300, h: 250 };
  const info = mockInventory(seed, size);
  const statusClass = info.status === "Occupied" ? "is-occupied" : "is-available";
  const aspect = (dims.h / dims.w) * 100;
  return `
  <div class="ad-slot ${mobile ? "ad-slot--mobile-only" : "ad-slot--desktop"}" style="--ad-max-w:${dims.w}px;--ad-aspect:${aspect}%">
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
 * size below 460px via CSS, instead of the desktop one.
 */
export function renderAdSlot(seed, size, { mobileSize } = {}) {
  if (mobileSize) {
    return `<div class="ad-slot-wrap">${adSlotHtml(seed, size, false)}${adSlotHtml(seed, mobileSize, true)}</div>`;
  }
  return `<div class="ad-slot-wrap">${adSlotHtml(seed, size, false)}</div>`;
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
