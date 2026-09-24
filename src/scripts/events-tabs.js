/* ── Carrusel de pósters de la sección de eventos (flechas ‹ ›) ── */
document.querySelectorAll(".event-arrow").forEach((btn) => {
  btn.addEventListener("click", () => {
    const track = btn
      .closest(".event-carousel-wrap")
      ?.querySelector(".event-carousel");
    track?.scrollBy({
      left: btn.classList.contains("event-next") ? 320 : -320,
      behavior: "smooth",
    });
  });
});
