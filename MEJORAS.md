# Mejoras y correcciones — Iron Biker's Landing

Documento de cambios aplicados a la landing y oportunidades de mejora detectadas.
Fecha: 2026-09-24.

---

## Problemas corregidos

### 1. Navegación inconsistente (anchors vs. páginas)

**Antes:** el navbar mezclaba enlaces de sección (`/#nosotros`) con enlaces a
otras páginas (`/galeria`, `/noticias`) sin ninguna distinción visual. El usuario
no podía saber si un clic haría scroll o cambiaría de página.

**Ahora** (`src/components/Nav.astro`):

- Los enlaces están declarados en un arreglo `links` con tipo `section` (ancla)
  o `page` (navegación).
- Los enlaces de página muestran un marcador **↗** en dorado (clase
  `.nav-link-page`, definida en `src/styles/nav.css`).
- `aria-current="page"` en la página activa para accesibilidad.
- Menú ordenado siguiendo el flujo de la página: Nosotros, Beneficios,
  **Directivos** (nuevo), Eventos, Noticias, Galería ↗, Contacto.
- El breakpoint de escritorio pasó de 768px a **1024px** para que quepan los
  7 enlaces; tablets usan el menú desplegable.

### 2. "Noticias" cambiaba de página

**Antes:** el ítem "Noticias" del menú navegaba a `/noticias`, rompiendo el
flujo de scroll del home.

**Ahora:**

- Nueva sección `#noticias` en el home (`src/components/News.astro`) con
  **diseño editorial**: la noticia más reciente ocupa una tarjeta destacada a
  doble ancho (imagen + texto lado a lado) y el resto van en grid. Cada tarjeta
  muestra un badge con su primer tag.
- La sección muestra **hasta 6 noticias** — es la portada de noticias del club,
  no un "preview" duplicado.
- `/noticias` queda como **página de archivo**: el botón "Ver archivo completo"
  solo aparece cuando hay más de 6 noticias publicadas. Con pocas noticias no
  hay navegación redundante.
- Las tarjetas siempre llevan al artículo completo en `/noticias/<slug>`.
- El enlace "Noticias" del navbar hace scroll a la sección (`/#noticias`);
  en páginas `/noticias/*` el ítem sigue marcándose como activo.

### 3. Estado activo del menú fijo en "Contacto"

**Antes:** `nav-link-active` estaba quemado en el enlace "Contacto", por lo que
siempre se veía activo — incluso en `/galeria` o `/noticias`.

**Ahora** (`src/scripts/nav.js`):

- **Scroll-spy** con `IntersectionObserver`: en el home se resalta el enlace de
  la sección visible en el viewport (banda central: `-40% / -55%`).
- En páginas internas, el servidor marca activa el área correspondiente
  (`/galeria` → Galería, `/noticias/*` → Noticias).

### 4. Sin menú móvil

**Antes:** debajo de 768px los enlaces del navbar desaparecían
(`display: none`) y no existía ningún menú alternativo.

**Ahora:** botón hamburguesa (`#navToggle`) que despliega el menú como panel
bajo la barra. Se cierra al elegir un enlace, presionar `Escape` o hacer clic
fuera. Animación de las barras a "X" vía `aria-expanded`.

### 5. Deiver Vasquez agregado a Directivos

- Nuevo archivo `src/content/pilots/deiver.json` (rol "Tecnología", editable
  desde el CMS o el JSON).
- `image` y `alt` ahora son **opcionales** en la colección `pilots`
  (`src/content.config.ts` y `public/admin/config.yml`).
- Sin foto, la tarjeta muestra un **monograma con las iniciales** ("DV") con el
  mismo marco circular dorado del resto (`src/styles/leaders.css`).
- Sirve para cualquier directivo futuro sin foto.
- **Grid balanceado sin jerarquía visual:** el listado calcula las columnas
  (`--cols`) para repartir parejo — ninguna fila queda con un solo directivo
  (6 → 3+3, 7 → 4+3, 8 → 4+4, 10 → 5+5…). Antes el `flex-wrap` dejaba un
  "líder" huérfano centrado abajo.
- **Orden editable:** nuevo campo `order` en `pilots` (JSON + CMS). Menor
  número = aparece primero; sin valor, el directivo va al final por orden
  alfabético. Orden actual: 1 Reynaldo (Presidente), 2 Dilan (Vicepresidente),
  3 Sergio (Secretario), 4 Yirina (Tesorera), 5 Pedro (Jefe de armas),
  6 Deiver (Tecnología).

### 6. Enlace "Soporte" roto en el footer

**Antes:** `<a href="#contacto">` es relativo — en `/galeria` o `/noticias`
apuntaba a un ancla inexistente en esas páginas.

**Ahora:** `/#contacto` (siempre vuelve al home).

### 7. Variables CSS `--border` / `--border-strong` no definidas

**Antes:** `news.css` y `gallery.css` usaban `var(--border)` y
`var(--border-strong)` que nunca se declararon — los bordes de tarjetas de
noticias, tags y lightbox no se renderizaban.

**Ahora:** definidas en `base.css`
(`--border: rgba(255,255,255,.08)`, `--border-strong: rgba(255,255,255,.16)`).

### 8. Detalles menores

- `og:url` ahora usa la URL **canónica** de cada página (antes siempre apuntaba
  al home — mal para compartir artículos de noticias).
- `section[id] { scroll-margin-top: 90px }` — los saltos de ancla no quedan
  tapados por la barra fija.
- `aria-label="Navegación principal"` en el `<nav>`.

---

## Segunda tanda — implementada (auditoría profunda)

### Accesibilidad

- **Formulario accesible**: cada input tiene `id` + `<label for>` +
  `autocomplete`; `#formResponse` ahora es `role="status" aria-live="polite"`.
- **Honeypot anti-spam**: campo `empresa` fuera de pantalla; si un bot lo llena
  se simula éxito sin enviar (`contact-form.js`, `.contact-honeypot`).
- **Lightbox como diálogo real**: `role="dialog"` `aria-modal="true"`, el foco
  entra al botón cerrar, Tab queda atrapado entre cerrar/anterior/siguiente y
  al cerrar vuelve a la miniatura que lo abrió.
- **Tabs de eventos con teclado**: ← → Home End cambian y enfocan la pestaña
  (`tabindex` roving, patrón ARIA completo).
- **Testimonios h3**: nombres ya no saltan h2→h4.
- **Skip link** "Saltar al contenido" (primer elemento del body, visible solo
  con teclado) + `id="contenido" tabindex="-1"` en todos los `<main>`.
- **`:focus-visible`** global en dorado para navegación por teclado.
- **Menú móvil bloquea el scroll** del body mientras está abierto.
- **`prefers-reduced-motion`**: ahora también cubre la transición del menú.

### SEO / rendimiento

- **`robots.txt`** generado por endpoint (`src/pages/robots.txt.ts`):
  `Disallow: /admin` + `Sitemap` con la URL del sitio según `PUBLIC_SITE_URL`.
- **404 personalizada** (`src/pages/404.astro`) con el branding del club.
- **OG por artículo**: `/noticias/[slug]` envía `og:type="article"`,
  `article:published_time` y su portada como `og:image`/`twitter:image`.
- **JSON-LD**: `NewsArticle` + `BreadcrumbList` en cada noticia.
- **`width`/`height` en todas las imágenes** (anti-CLS): `getCover` devuelve
  las dimensiones reales vía `sharp`.
- **`getCover` fuerza `format: "webp"`**: cualquier PNG/JPG subido por CMS sale
  optimizado en WebP.
- **Preload del hero bg** (`preloadImage` prop en BaseLayout + `fetchpriority`).
- **Splash una vez por sesión** (`sessionStorage`); ya no bloquea 1.6s en cada
  visita al home.
- **Fondos de placeholder** en `.news-card-media` y `.event-card` mientras
  cargan las imágenes.

### Estructura / contenido

- **Sección Galería en home** (`GalleryPreview.astro`, `#galeria`): 6 fotos en
  masonry + "Ver galería completa" solo cuando hay más. **Todo el menú ahora es
  anclas** — Galería dejó de ser el único enlace de página (el marcador ↗ queda
  disponible en el tipo `NavLink.page` por si se necesita).
- **`order` editable** también en `testimonials` y `gallery` (schema + CMS +
  ordenamiento), mismo patrón que `pilots`.
- **`formatDate` compartido** en `src/lib/date.ts`; **`pageYOffset`→`scrollY`**.

### Infraestructura

- **`vercel.json`**: caché inmutable para `/_astro/*`, caché de 1 día para
  `/images/*`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`.
- **CI**: `.github/workflows/check.yml` corre `bun install` + `astro check` +
  `astro build` en cada push/PR — un JSON inválido desde el CMS no rompe el
  deploy silenciosamente.

## Pendientes (no aplicados)

- **Iconos SVG** en redes del footer (hoy texto plano) + WhatsApp con `?text=`.
- **Nav/footer editables desde CMS** (mover `links` de `Nav.astro` a una
  colección `nav`).
- **`!important` en `.event-panel`** — refactor con especificidad normal.
- **Filtros en `/noticias`** por tag/año cuando el volumen crezca.
- **Analytics** ligera y privada (Plausible/Umami).
- **Validación avanzada del form** (patrón de placa colombiana, etc.).
- **Cachear dimensiones en `getCover`** si el volumen de imágenes crece mucho.

---

## Cómo verificar

```bash
bun run build      # compila a dist/
bun run preview    # sirve dist/ en http://localhost:4321
bun run check      # tipado de archivos .astro
```

Checklist manual:

- [ ] Home: cada enlace del menú hace scroll suave a su sección y se resalta en rojo.
- [ ] "Galería" muestra el marcador ↗ y navega a `/galeria`.
- [ ] "Noticias" baja a la sección; la 1ª tarjeta se ve destacada a doble ancho.
- [ ] Sin botón redundante: "Ver archivo completo" solo aparece con >6 noticias.
- [ ] En `/galeria` y `/noticias` el ítem correcto queda activo.
- [ ] En móvil/tablet (<1024px) el botón hamburguesa abre/cierra el menú.
- [ ] Directivos: Deiver Vasquez aparece con el monograma "DV".
- [ ] Footer → "Soporte" funciona desde `/galeria` y `/noticias`.
