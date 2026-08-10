import type { ImageMetadata } from "astro";
import yirinaImg from "../assets/images/leaders/yirina.webp";
import pedroImg from "../assets/images/leaders/pedro.webp";
import reyImg from "../assets/images/leaders/rey.webp";
import dilanImg from "../assets/images/leaders/dilan.webp";
import sergioImg from "../assets/images/leaders/sergio.webp";

export interface Leader {
  name: string;
  role: string;
  image: ImageMetadata;
  alt: string;
}

export const leaders: Leader[] = [
  { name: "Yirina Amaris", role: "Tesorera", image: yirinaImg, alt: "Yirina Amaris, tesorera del club" },
  { name: "Pedro Pájaro", role: "Jefe de armas", image: pedroImg, alt: "Pedro Pájaro, jefe de armas" },
  { name: "Reynaldo Galvis", role: "Presidente", image: reyImg, alt: "Reynaldo Galvis, presidente del club" },
  { name: "Dilan Bravo", role: "Vicepresidente", image: dilanImg, alt: "Dilan Bravo, vicepresidente" },
  { name: "Sergio Gallego", role: "Secretario", image: sergioImg, alt: "Sergio Gallego, secretario" },
];
