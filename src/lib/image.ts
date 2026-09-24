import { getImage } from "astro:assets";
import sharp from "sharp";

/**
 * Optimiza una imagen pública (/images/...) leyendo sus dimensiones reales.
 * Compatible con cualquier imagen subida desde el CMS (siempre sale en WebP).
 * Devuelve width/height para declararlos en el <img> y evitar CLS.
 */
export async function getCover(path: string, widths: number[]) {
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
