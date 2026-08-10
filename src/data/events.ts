import type { ImageMetadata } from "astro";
import covenasImg from "../assets/images/events/coveñas.webp";
import laTaguaImg from "../assets/images/events/la-tagua.webp";
import maleconCrespoImg from "../assets/images/events/malecon-crespo.webp";
import marbellaImg from "../assets/images/events/marbella.webp";
import miradorTubaraImg from "../assets/images/events/mirador-tubara.webp";
import ironmanCartagenaImg from "../assets/images/events/ironman-cartagena.webp";
import ironmanBarranquillaImg from "../assets/images/events/ironman-barranquilla.webp";
import ejerciciosImg from "../assets/images/events/ejecicios.webp";
import obraSocialImg from "../assets/images/events/obra-social.webp";
import paintballTurbacoImg from "../assets/images/events/paintball-turbaco.webp";
import paintballTurbaco2Img from "../assets/images/events/paintball-turbaco-2.webp";
import restauranteEstacion77Img from "../assets/images/events/restaurante-estacion77.webp";
import restauranteTurbacoImg from "../assets/images/events/restaurante-turbaco.webp";

export interface EventItem {
  title: string;
  tag: string;
  image: ImageMetadata;
  alt: string;
}

export interface EventTab {
  id: string;
  label: string;
  /** Ancho máximo del panel: 'full' | '3xl' | 'xl' */
  maxWidth: "full" | "3xl" | "xl";
  items: EventItem[];
}

export const eventTabs: EventTab[] = [
  {
    id: "tab-rodadas",
    label: "Rodadas",
    maxWidth: "full",
    items: [
      { title: "Coveñas", tag: "Rodada Costera", image: covenasImg, alt: "Rodada en Coveñas" },
      { title: "La Tagua", tag: "Rodada", image: laTaguaImg, alt: "Rodada en La Tagua" },
      { title: "Malecón Crespo", tag: "Rodada Urbana", image: maleconCrespoImg, alt: "Rodada en Malecón Crespo" },
      { title: "Marbella", tag: "Rodada", image: marbellaImg, alt: "Rodada en Marbella" },
      { title: "Mirador Tubará", tag: "Rodada Panorámica", image: miradorTubaraImg, alt: "Rodada en el Mirador de Tubará" },
    ],
  },
  {
    id: "tab-ironman",
    label: "Ironman",
    maxWidth: "3xl",
    items: [
      { title: "Ironman Cartagena", tag: "Competencia", image: ironmanCartagenaImg, alt: "Competencia Ironman en Cartagena" },
      { title: "Ironman Barranquilla", tag: "Competencia", image: ironmanBarranquillaImg, alt: "Competencia Ironman en Barranquilla" },
    ],
  },
  {
    id: "tab-entrenamiento",
    label: "Entrenamiento",
    maxWidth: "xl",
    items: [
      { title: "Ejercicios", tag: "Entrenamiento Físico", image: ejerciciosImg, alt: "Entrenamiento físico del club" },
    ],
  },
  {
    id: "tab-social",
    label: "Social",
    maxWidth: "full",
    items: [
      { title: "Obra Social", tag: "Acción Comunitaria", image: obraSocialImg, alt: "Obra social del club" },
      { title: "Paintball Turbaco", tag: "Adrenalina", image: paintballTurbacoImg, alt: "Paintball en Turbaco" },
      { title: "Paintball Turbaco", tag: "Adrenalina", image: paintballTurbaco2Img, alt: "Paintball en Turbaco" },
    ],
  },
  {
    id: "tab-gastronomia",
    label: "Gastronomía",
    maxWidth: "3xl",
    items: [
      { title: "Restaurante Estación 77", tag: "Gastronomía", image: restauranteEstacion77Img, alt: "Restaurante Estación 77" },
      { title: "Restaurante Turbaco", tag: "Gastronomía", image: restauranteTurbacoImg, alt: "Restaurante en Turbaco" },
    ],
  },
];
