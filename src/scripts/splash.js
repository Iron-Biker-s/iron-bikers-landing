/* ── Splash loader: solo la primera vez por sesión + fade out ── */
const splash = document.getElementById("splash");

if (splash) {
  let seen = false;
  try {
    seen = sessionStorage.getItem("splash-seen") === "1";
    sessionStorage.setItem("splash-seen", "1");
  } catch {
    /* sessionStorage no disponible (modo privado, etc.) */
  }

  if (seen) {
    splash.remove();
  } else {
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
}
