window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scrollProgress").style.width = scrolled + "%";

    const parallax = document.getElementById("heroParallax");
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * 0.7 + "px";
});

// Event Tabs
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.event-tab');
    const panels = document.querySelectorAll('.event-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Contact Form to Google Sheets
    const form = document.getElementById('contactForm');
    const responseEl = document.getElementById('formResponse');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'ENVIANDO...';
            btn.disabled = true;

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.result === 'success') {
                    responseEl.classList.remove('hidden', 'text-red-500');
                    responseEl.classList.add('text-green-500');
                    responseEl.innerText = 'Solicitud enviada exitosamente.';
                    form.reset();
                } else {
                    throw new Error(data.error || 'Error al enviar.');
                }
            } catch (err) {
                responseEl.classList.remove('hidden', 'text-green-500');
                responseEl.classList.add('text-red-500');
                responseEl.innerText = 'Error al enviar. Intenta de nuevo.';
                console.error(err);
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }
});
