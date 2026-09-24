# ROADMAP — Iron Biker's Club Cartagena

**Objetivo:** que ironbikers.co sea mejor que el sitio de referencia
(`clubraideratlantico.com`) — más completo en contenido, más rápido, mejor
posicionado en buscadores y más fácil de mantener.

Documento vivo: se marca `[x]` lo completado y se agregan ideas nuevas abajo.
Historial de lo ya hecho: ver `MEJORAS.md`.

---

## 1. Benchmark — qué tiene el sitio de referencia

Extraído del análisis de `clubraideratlantico.com` (React SPA + Supabase).

### Páginas públicas

| Página | Contenido |
|---|---|
| `/` | Hero "Hermandad sobre dos ruedas", noticias/comunicados, preview de cronograma, galería, CTA "¿Listo para rodar?" |
| `/nosotros` | Historia ("Más que un club… desde 2022"), "Nuestra razón de rodar", "Hacia dónde vamos", **estructura del club con 5 rangos**, comité |
| `/reglamento` | Reglamento interno completo con **índice lateral** (TOC desktop + móvil), ~15 capítulos (propósito, conducta, seguridad vial, indumentaria, asistencia, faltas y sanciones, veto), **descarga en PDF** |
| `/cronograma` | **Calendario mensual** + eventos con cupos, dificultad, kilómetros, punto de salida, hora, "qué llevar", recomendaciones del líder, briefing, **inscripción con copiloto** y lista de espera |
| `/unete` | Formulario de ingreso completo (datos personales, moto, experiencia, contacto de emergencia, copiloto, checkboxes de reglamento y datos), requisitos, rangos, "cómo subes de rango" |
| `/portal` | **Portal del piloto**: login, carnet con QR, mis rodadas, mi asistencia, mis datos |
| `/admin` | Dashboard: miembros, solicitudes, eventos, noticias, galería, **escáner QR de asistencia por cédula**, comunicados, cumpleaños del mes, configuración |

### Detalles que suman

- Rangos del club: Aspirante → … → Piloto Oficial (parche) → Líderes.
- Cada evento con datos de rodada reales: km, dificultad, cupos, briefing.
- Comunicados/convocatorias como categoría de noticias.
- Cumpleañeros del mes en el portal.
- Carnet QR por miembro + control de asistencia con escáner.

### Sus debilidades (nuestra ventaja)

- **SPA sin SSR**: el HTML inicial es solo un loader — las noticias y eventos
  **no son indexables** individualmente por buscadores. Nosotros con Astro
  SSG ya ganamos en SEO y velocidad.
- **~350 KB de JS** antes de pintar contenido. Nosotros servimos HTML con
  JS mínimo.
- Dependen de Supabase/auth para todo — más superficie de fallo y costo.

**Tesis:** replicar todo el contenido público (fases 1–3) con mejor SEO y
performance, y evaluar la plataforma privada (fase 4) solo cuando el club
la necesite de verdad.

---

## 2. Estado actual (✅ hecho)

- [x] Nav consistente: 100% anclas + scroll-spy + menú móvil + estado activo
- [x] Sección Noticias en home (editorial, destacada) + archivo `/noticias`
- [x] Sección Galería en home (preview masonry) + `/galeria` con lightbox
- [x] Directivos completos (incl. Deiver) con orden editable y monograma
- [x] A11y: skip link, focus-visible, lightbox modal, tabs ARIA, labels,
      honeypot, aria-live, scroll-lock, reduced-motion
- [x] SEO: sitemap, robots.txt, 404, OG por artículo, JSON-LD, canonical
- [x] Perf: WebP forzado, width/height anti-CLS, preload hero, splash 1x/sesión
- [x] CMS: todas las colecciones editables + `order` en pilots/gallery/testimonials
- [x] Infra: `vercel.json` (headers + caché), CI con `astro check` + `build`
- [x] **`/reglamento`** (Fase 1.2): 11 capítulos del PDF oficial como colección
      Markdown editable por CMS (`src/content/rules/`), índice lateral sticky
      con scroll-spy (chips horizontales en móvil), tarjeta de identificación
      motera (lema, punto de encuentro, día de zona) y descarga del PDF
      oficial (`public/docs/reglamento.pdf`). Enlace en el footer.
- [x] **`/unete`** (Fase 1.1): proceso de ingreso por meritocracia en 4 pasos
      (3 zonas continuas → formato de vinculación → rodada de prueba → piloto
      oficial), requisitos (moto propia, documentos, equipo mínimo,
      disposición), formulario de solicitud al Apps Script con checkboxes de
      reglamento + datos, honeypot y aria-live. Todo el texto editable por
      CMS (`src/content/unete/`). Nav CTA "Únete al club" → `/unete`.
- [x] **Apps Script mejorado** (`apps-script/Code.gs`): columnas nuevas se
      crean solas cuando llega un campo desconocido (los datos de /unete se
      guardan sin tocar la hoja), hojas inexistentes se crean solas,
      checkboxes "on" → "Sí", y honeypot validado también en el servidor.
      Requiere republicar el web app con "Nueva versión" (ya desplegado y
      verificado: fila de prueba OK, honeypot server-side OK).
- [x] **`/nosotros`** (Fase 1.4): hero propio, historia + cita, los 4 valores,
      misión/visión/objetivos renderizados desde el cap. 1 del reglamento
      (misma fuente CMS), **organigrama** (Asamblea General + Junta
      Directiva con sus 7 cargos, editable), directivos reutilizando
      `<Leaders />` y CTAs a `/unete` + `/reglamento`.
- [x] **Hero con doble CTA** (Fase 3.5): "Únete al club" → `/unete` +
      "Conócenos" → `/nosotros`. Stats ya existían en hero.json
      (50+ miembros, 100+ rodadas, 4 años).

---

## 3. Fase 1 — Paridad de páginas públicas

> Lo que un visitante espera de un club serio. Todo editable por CMS.

### 3.1 Página `/unete` — "Únete al club" ✅ (2026-09-24)

- [x] Schema `unete` en `content.config.ts` + colección en CMS
- [x] Hero propio con kicker y subtítulo
- [x] **Requisitos** (4 tarjetas editables): moto propia, documentos al día
      (SOAT, licencia, matrícula, tecnomecánica), equipo mínimo, disposición
- [x] **Proceso de ingreso** en 4 pasos según reglamento cap. 2
      (meritocracia): acércate → intégrate → rueda → piloto oficial
- [x] **Formulario de solicitud** (`#joinForm`, mismo Apps Script con
      `formulario=unete` oculto): nombre, teléfono, email, ciudad, marca,
      modelo, placa, experiencia (select), motivación, contacto de
      emergencia, checkboxes "Acepto el reglamento" + "Autorizo datos"
- [x] Estados de éxito/error con `aria-live` + honeypot anti-spam
- [x] Nav CTA "Únete al club" → `/unete`; enlace a `/reglamento` desde el
      checkbox y CTA final
- [ ] Redirección a WhatsApp como alternativa — falta el número oficial

### 3.2 Página `/reglamento` ✅ (2026-09-24)

- [x] Contenido en Markdown: colección `rules` (capítulos ordenables con
      `order`, editables por CMS) — 11 capítulos transcritos del PDF oficial
- [x] **Índice lateral sticky** con scroll-spy en desktop + barra de chips
      horizontal en móvil
- [x] Capítulos: identificación (misión/visión/objetivos), ingreso, deberes,
      derechos, prohibiciones, expulsión, organigrama, salidas, convivencia
      digital, disolución, programas
- [x] Botón "Descargar PDF" → `/docs/reglamento.pdf` (PDF oficial copiado)
- [x] Tarjeta de identificación motera: lema, punto fijo (Bomba Petromil,
      San Rafael del Pozón), día de zona (viernes 7 PM)
- [x] Enlace en footer
- [x] Enlace desde `/unete` (checkbox "acepto el reglamento" abre
      `/reglamento` + CTA final "Lee el reglamento completo")

### 3.3 Página `/cronograma`

- [ ] Schema `events` extendido: `date`, `time`, `puntoSalida`, `distanciaKm`,
      `dificultad` (baja/media/alta), `queLlevar[]`, `recomendaciones`,
      `cupos`, `estado` (programada/realizada/cancelada), `order`
- [ ] Migrar los 9 eventos actuales al schema nuevo (rellenar datos)
- [ ] Vista: próxima rodada destacada + lista/agenda por mes
- [ ] Detalle por evento con datos completos + botón "Inscribirme por
      WhatsApp" (`wa.me` con mensaje pre-llenado) o enlace a `/unete`
- [ ] La sección `#eventos` del home muestra solo las **próximas** + enlace
      "Ver cronograma completo →"
- [ ] JSON-LD `Event` por rodada (fecha, lugar) — ellos no pueden indexarlo

### 3.4 Página `/nosotros` ✅ (2026-09-24)

- [x] Hero propio + historia (reutiliza `about`) + cita
- [x] Misión/visión/objetivos renderizados del cap. 1 del reglamento
      (una sola fuente de verdad, editable por CMS)
- [x] **Estructura del club**: organigrama con Asamblea General + Junta
      Directiva (7 cargos) — colección `nosotros` editable
- [x] Los 4 valores como tarjetas
- [x] Directivos completos (componente `<Leaders />` reutilizado)
- [x] CTAs cruzados: "Únete al club" + "Ver reglamento"
- [ ] La sección `#nosotros` del home enlaza "Conocer más →" (opcional)

### 3.5 Home — golpe de efecto

- [x] Hero con doble CTA: **"Únete al club"** → `/unete` +
      **"Conócenos"** → `/nosotros`
- [x] **Stats en hero**: editables en `hero.json`
      (50+ miembros, 100+ rodadas, 4 años) — falta dato real de km/años
- [ ] Tagline tipo "Hermandad sobre dos ruedas" (opcional: `hero.quote`
      editable ya permite cambiarlo desde el CMS)
- [ ] Contador regresivo a la próxima rodada (derivado de `events`)
- [ ] Sección "Cumpleaños del mes" (opcional, dato simpático de la referencia)

---

## 4. Fase 2 — Enriquecer lo existente

- [ ] **Noticias con categorías**: Comunicados / Crónicas de rodada /
      Convocatorias / Alianzas (campo `category`, filtro en `/noticias`)
- [ ] Galería agrupada por rodada/evento (campo `event` en items de gallery)
- [ ] Videos en galería (embed YouTube o archivo)
- [ ] Testimonios con foto opcional
- [ ] Sección FAQ ("¿necesito moto de marca X?", "¿hay cuota?", etc.)
- [ ] Footer: iconos SVG de redes + WhatsApp con `?text=` pre-llenado
- [ ] Nav/footer editables desde CMS (colección `nav`)
- [ ] Refactor `!important` de `.event-panel`

---

## 5. Fase 3 — Diferenciadores (donde les ganamos)

- [ ] **Lighthouse ≥95** en las 4 métricas (ellos cargan 350KB de JS SPA)
- [ ] OG dinámico por evento (`/cronograma` comparte imagen con fecha/ruta)
- [ ] JSON-LD `Organization` + `SportsClub`/logo en el home
- [ ] **PWA**: `manifest.webmanifest`, service worker, offline básico
- [ ] Mapa del punto de salida por rodada (OpenStreetMap embed, sin API key)
- [ ] Botón flotante de WhatsApp
- [ ] Analytics privada (Umami/Plausible, sin cookies)
- [ ] Modo "compartir rodada": copiar link / compartir nativo por evento

---

## 6. Fase 4 — Plataforma de miembros (largo plazo)

> Requiere backend (Supabase/Firebase) — decidir cuándo el club lo necesite.
> Es lo que más diferencia a la referencia, pero también lo más costoso.

- [ ] Portal del piloto: login por email, "mi carnet" con QR
- [ ] Registro de asistencia con escáner QR (tablet del comité)
- [ ] Solicitudes de ingreso con aprobación/rechazo (hoy van al Apps Script)
- [ ] Panel admin propio o seguir con Decap CMS
- [ ] Cumpleaños, histórico de rodadas por piloto, comunicados internos
- [ ] Migración gradual: la landing SSG queda igual; el portal vive en
      `/portal` como app aparte

---

## 7. Contenido que necesita el club (bloqueantes)

Cosas que solo el club puede definir — con esto lleno los textos reales:

- [x] Texto del **reglamento** → PDF oficial recibido y publicado en
      `/reglamento` (11 capítulos editables por CMS)
- [x] **Requisitos de ingreso** → meritocracia según reglamento cap. 2:
      3 reuniones/zonas continuas → rodada de prueba → formato de
      vinculación → piloto oficial activo
- [x] **Stats**: ~50 miembros (aprox); salidas de alto kilometraje
- [ ] **Rangos/estructura** del club — el reglamento define Asamblea +
      Junta Directiva (Presidente, Vicepresidente, Capitán de Ruta,
      Secretario, Tesorero, Redes sociales, Sargento de Armas); confirmar
      si hay rangos adicionales tipo "aspirante → oficial"
- [ ] Cuota de inscripción / mensualidad si aplica (o "sin cuotas")
- [ ] WhatsApp oficial para inscripciones (`wa.me/57…`)
- [ ] ~~Datos de cada rodada del cronograma~~ — el cronograma queda como
      está por ahora (editable vía CMS)
- [ ] Año de fundación exacto para stats y "nosotros"

---

## 8. Orden sugerido de ejecución

1. ~~Fase 1.2 `/reglamento`~~ ✅ hecho
2. ~~Fase 1.1 `/unete`~~ ✅ hecho
3. ~~Fase 1.4 `/nosotros`~~ ✅ hecho + hero CTAs del home
4. **Siguiente**: Fase 2 (categorías de noticias, FAQ, iconos SVG) o
   diferenciadores de Fase 3 (OG por evento, WhatsApp, PWA)
5. ~~Fase 1.3 cronograma~~ — pospuesto a decisión del club (queda editable
   por CMS como está)
6. Fase 4 cuando haya demanda real del club

---

## Notas

- Cada fase termina con `bun run check && bun run build` en verde y commit.
- Nada se borra: las secciones nuevas se suman al nav como anclas o páginas
  según corresponda, manteniendo el patrón actual (scroll en home, ↗ solo
  si fuera página externa).
- Todo texto nuevo va a colecciones/JSON para que el comité lo edite por CMS.
