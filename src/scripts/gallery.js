/* ── Lightbox de la galería (Esc / ← → / clic fuera) ── */
const items = Array.from(document.querySelectorAll("[data-gallery-item]"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const closeBtn = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("lightboxPrev");
const nextBtn = document.getElementById("lightboxNext");

let currentIndex = 0;

function openLightbox(index) {
  const item = items[index];
  if (!item) return;
  currentIndex = index;
  lightboxImg.src = item.dataset.full;
  lightboxImg.alt = item.dataset.title;
  lightboxTitle.textContent = item.dataset.title;
  lightboxCategory.textContent = item.dataset.category;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function move(direction) {
  openLightbox((currentIndex + direction + items.length) % items.length);
}

items.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", () => move(-1));
nextBtn.addEventListener("click", () => move(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") move(-1);
  if (event.key === "ArrowRight") move(1);
});
