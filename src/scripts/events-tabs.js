/* ── Tabs de la sección de eventos (clic + flechas ← →, patrón ARIA) ── */
const tabs = Array.from(document.querySelectorAll(".event-tab"));
const panels = document.querySelectorAll(".event-panel");

const activate = (tab) => {
  const target = tab.dataset.tab;

  tabs.forEach((t) => {
    const active = t === tab;
    t.classList.toggle("active", active);
    t.setAttribute("aria-selected", String(active));
    t.tabIndex = active ? 0 : -1;
  });

  panels.forEach((panel) => {
    const active = panel.id === target;
    panel.classList.toggle("active", active);
  });
};

tabs.forEach((tab, index) => {
  tab.tabIndex = index === 0 ? 0 : -1;
  tab.addEventListener("click", () => activate(tab));

  tab.addEventListener("keydown", (e) => {
    let next = null;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next !== null) {
      e.preventDefault();
      tabs[next].focus();
      activate(tabs[next]);
    }
  });
});
