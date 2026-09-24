/* ── Navbar: menú móvil + scroll-spy de la sección visible ── */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

/* Menú móvil: abrir/cerrar, cerrar al navegar, Escape o clic fuera */
if (navToggle && navLinks) {
  const setOpen = (open) => {
    navLinks.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.style.overflow = open ? "hidden" : "";
  };

  navToggle.addEventListener("click", () =>
    setOpen(!navLinks.classList.contains("is-open"))
  );

  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => setOpen(false))
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav")) setOpen(false);
  });
}

/*
 * Scroll-spy: marca .nav-link-active en el link de la sección visible.
 * Solo aplica en home (donde existen las secciones ancladas).
 */
const sectionLinks = document.querySelectorAll(".nav-links a[data-section]");

if (sectionLinks.length > 0 && "IntersectionObserver" in window) {
  const linkBySection = new Map();
  sectionLinks.forEach((link) =>
    linkBySection.set(link.dataset.section, link)
  );

  const sections = [...linkBySection.keys()]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (sections.length > 0) {
    const setActive = (id) => {
      sectionLinks.forEach((link) => {
        const active = link.dataset.section === id;
        link.classList.toggle("nav-link-active", active);
        if (active) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    /* Banda central del viewport: la sección que la cruza es la activa */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }
}
