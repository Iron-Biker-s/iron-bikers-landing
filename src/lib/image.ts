import { getImage } from "astro:assets";
import sharp from "sharp";

/**
 * Assets versionados en el repo (src/assets/images) — se optimizan de verdad:
 * astro:assets emite variantes reales en cada ancho. Las imágenes subidas por
 * el CMS viven en public/images y pasan sin srcset (mismo comportamiento de
 * siempre), así que el contenido editable sigue funcionando.
 */
const assetImages = import.meta.glob<ImageMetadata>(
  "../assets/images/*.{webp,jpg,jpeg,png,avif}",
  { eager: true, import: "default" },
);

function findAsset(path: string): ImageMetadata | undefined {
  const basename = path.split("/").pop();
  if (!basename) return undefined;
  for (const [key, mod] of Object.entries(assetImages)) {
    if (key.endsWith(`/${basename}`)) return mod;
  }
  return undefined;
}

/**
 * Optimiza una imagen declarada como ruta pública (/images/...).
 * - Si existe un asset homónimo en src/assets/images → srcset real por ancho.
 * - Si no (subida por CMS) → src directo + width/height reales vía sharp.
 * Devuelve width/height para declararlos en el <img> y evitar CLS.
 */
export async function getCover(path: string, widths: number[]) {
  const asset = findAsset(path);

  if (asset) {
    const image = await getImage({ src: asset, widths, format: "webp" });
    return { ...image, width: asset.width, height: asset.height };
  }

  const meta = await sharp(`public${path}`).metadata();
  const image = await getImage({
    src: path,
    width: meta.width,
    height: meta.height,
    widths,
    format: "webp",
  });
  return { ...image, width: meta.width ?? 0, height: meta.height ?? 0 };
}
