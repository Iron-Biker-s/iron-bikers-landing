/* ── Lightbox de la galería (Esc / ← → / Tab atrapado / clic fuera) ── */
const items = Array.from(document.querySelectorAll("[data-gallery-item]"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const closeBtn = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("lightboxPrev");
const nextBtn = document.getElementById("lightboxNext");

let currentIndex = 0;
let lastFocused = null;

/* Únicos elementos enfocables dentro del diálogo */
const focusables = [closeBtn, prevBtn, nextBtn];

function showItem(index) {
  const item = items[index];
  if (!item) return;
  currentIndex = index;
  lightboxImg.src = item.dataset.full;
  lightboxImg.alt = item.dataset.title;
  lightboxTitle.textContent = item.dataset.title;
  lightboxCategory.textContent = item.dataset.category;
}

function openLightbox(index) {
  lastFocused = document.activeElement;
  showItem(index);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  closeBtn.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  /* Devuelve el foco a la miniatura que abrió el visor */
  if (lastFocused) lastFocused.focus();
}

function move(direction) {
  showItem((currentIndex + direction + items.length) % items.length);
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

  /* Focus trap: el Tab solo cicla entre cerrar / anterior / siguiente */
  if (event.key === "Tab") {
    event.preventDefault();
    const i = focusables.indexOf(document.activeElement);
    const next = event.shiftKey
      ? i <= 0
        ? focusables.length - 1
        : i - 1
      : i === focusables.length - 1
        ? 0
        : i + 1;
    focusables[next].focus();
  }
});
