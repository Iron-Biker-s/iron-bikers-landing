# Decap CMS — Panel de contenido (Nivel 2)

Panel de administración para publicar contenido sin tocar código.
Git-based: guarda directamente en GitHub y Vercel regenera el sitio.

## Usar en desarrollo (sin GitHub OAuth)

```bash
# Terminal 1: el proxy local que lee/escribe los archivos
bun run cms:local

# Terminal 2: el sitio
bun run dev
```

Abre **http://localhost:4321/admin/index.html** (en dev es con `/index.html`;
en producción la URL es `/admin`). Desde ahí puedes crear/editar noticias:
los cambios se guardan en `src/content/news/*.md` al instante.

## En producción

1. Crea una app OAuth en GitHub (Settings → Developer settings → OAuth Apps):
   - Homepage: `https://www.ironbikers.co`
   - Authorization callback: `https://www.ironbikers.co/admin/index.html`
2. Quita `local_backend: true` de `public/admin/config.yml`.
3. Guarda las credenciales como variables de entorno en tu host:
   `OAUTH_GITHUB_CLIENT_ID` y `OAUTH_GITHUB_CLIENT_SECRET`
   (necesitas un mini servidor OAuth, p. ej. la función serverless de
   https://decapcms.org/docs/github-backend/).
4. El panel queda en `https://www.ironbikers.co/admin`.

Cada guardado hace commit a `main` → Vercel redeploya el sitio (~1 min).

## Cómo se relaciona con el código

| Panel de Decap | Archivo en el repo |
|---|---|
| Crear/editar noticia | `src/content/news/<slug>.md` |
| Subir portada | `public/images/news/<archivo>` (ruta `/images/news/...` en frontmatter) |
| Colección y campos | `public/admin/config.yml` (debe coincidir con `src/content.config.ts`) |

> Las portadas se guardan en `public/` (no en `src/assets`) para que el panel y el
> sitio las sirvan directamente. Astro las optimiza igual en el build (`getImage`).
