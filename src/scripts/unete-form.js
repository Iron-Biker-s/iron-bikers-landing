/* ── Formulario de ingreso (/unete) → Google Sheets (Apps Script) ── */
const joinForm = document.getElementById("joinForm");
const joinResponse = document.getElementById("joinResponse");

if (joinForm && joinResponse) {
  joinForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(joinForm);

    /* Honeypot: si el campo invisible tiene valor, es un bot → éxito falso */
    if (formData.get("empresa")) {
      joinResponse.classList.remove("hidden", "is-error");
      joinResponse.classList.add("is-success");
      joinResponse.innerText =
        "Solicitud enviada. La directiva te contactará.";
      joinForm.reset();
      return;
    }

    const btn = joinForm.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = "ENVIANDO...";
    btn.disabled = true;

    try {
      const response = await fetch(joinForm.action, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.result === "success") {
        joinResponse.classList.remove("hidden", "is-error");
        joinResponse.classList.add("is-success");
        joinResponse.innerText =
          "Solicitud enviada. La directiva te contactará para tu primera reunión.";
        joinForm.reset();
      } else {
        throw new Error(data.error || "Error al enviar.");
      }
    } catch (err) {
      joinResponse.classList.remove("hidden", "is-success");
      joinResponse.classList.add("is-error");
      joinResponse.innerText = "Error al enviar. Intenta de nuevo.";
      console.error(err);
    } finally {
      btn.innerText = originalText;
      btn.disabled = false;
    }
  });
}
