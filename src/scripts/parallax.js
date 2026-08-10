/* ── Parallax del fondo del hero ── */
const heroParallax = document.getElementById("heroParallax");

if (heroParallax) {
  const updateParallax = () => {
    const offset = window.pageYOffset;
    if (offset < window.innerHeight) {
      heroParallax.style.backgroundPositionY = offset * 0.7 + "px";
    }
  };

  window.addEventListener("scroll", updateParallax, { passive: true });
  updateParallax();
}
