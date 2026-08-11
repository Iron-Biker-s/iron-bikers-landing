/* ── Splash loader: mínimo de duración + fade out + remover del DOM ── */
const splash = document.getElementById("splash");

if (splash) {
  const MIN_MS = 1600;
  const t0 = performance.now();

  const hide = () => {
    splash.classList.add("is-hidden");
    setTimeout(() => splash.remove(), 500);
  };

  const whenReady = () => {
    const elapsed = performance.now() - t0;
    setTimeout(hide, Math.max(0, MIN_MS - elapsed));
  };

  if (document.readyState === "complete") {
    whenReady();
  } else {
    window.addEventListener("load", whenReady);
  }
}
