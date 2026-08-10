/* ── Tabs de la sección de eventos ── */
const tabs = document.querySelectorAll(".event-tab");
const panels = document.querySelectorAll(".event-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", String(active));
    });

    panels.forEach((panel) => {
      const active = panel.id === target;
      panel.classList.toggle("active", active);
    });
  });
});
