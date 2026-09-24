/* ── Parallax del fondo del hero ── */
const heroParallax = document.getElementById("heroParallax");

if (heroParallax) {
  /* El wrapper es ~18% más alto que el hero (hero.css) para que el
     desplazamiento nunca descubra los bordes */
  const updateParallax = () => {
    const offset = window.scrollY;
    if (offset < window.innerHeight) {
      heroParallax.style.transform = `translate3d(0, ${offset * 0.25}px, 0)`;
    }
  };

  window.addEventListener("scroll", updateParallax, { passive: true });
  updateParallax();
}
