import { getImage } from "astro:assets";
import sharp from "sharp";

/**
 * Optimiza una imagen pública (/images/...) leyendo sus dimensiones reales.
 * Compatible con cualquier imagen subida desde el CMS.
 */
export async function getCover(path: string, widths: number[]) {
  const meta = await sharp(`public${path}`).metadata();
  return getImage({
    src: path,
    width: meta.width,
    height: meta.height,
    widths,
  });
}
