import type { ImageMetadata } from "astro";
import logo5150Img from "../assets/images/aliances/logo_5150.webp";
import logoIronmanImg from "../assets/images/aliances/logo_ironman.webp";
import motoRepuestosImg from "../assets/images/aliances/moto_repuestos_ejecutivos.webp";

export interface Alliance {
  name: string;
  category: string;
  logo: ImageMetadata;
  alt: string;
}

export const alliances: Alliance[] = [
  {
    name: "5150 Triathlon Colombia",
    category: "Eventos Deportivos",
    logo: logo5150Img,
    alt: "Logo 5150 Triathlon Colombia",
  },
  {
    name: "Ironman 70.3 Colombia",
    category: "Competencia Internacional",
    logo: logoIronmanImg,
    alt: "Logo Ironman 70.3 Colombia",
  },
  {
    name: "Moto Repuestos Ejecutivos",
    category: "Repuestos y Servicio",
    logo: motoRepuestosImg,
    alt: "Logo Moto Repuestos Ejecutivos",
  },
];
