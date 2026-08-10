/* ── Formulario de contacto → Google Sheets (Apps Script) ── */
const form = document.getElementById("contactForm");
const responseEl = document.getElementById("formResponse");

if (form && responseEl) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = "ENVIANDO...";
    btn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.result === "success") {
        responseEl.classList.remove("hidden", "is-error");
        responseEl.classList.add("is-success");
        responseEl.innerText = "Solicitud enviada exitosamente.";
        form.reset();
      } else {
        throw new Error(data.error || "Error al enviar.");
      }
    } catch (err) {
      responseEl.classList.remove("hidden", "is-success");
      responseEl.classList.add("is-error");
      responseEl.innerText = "Error al enviar. Intenta de nuevo.";
      console.error(err);
    } finally {
      btn.innerText = originalText;
      btn.disabled = false;
    }
  });
}
