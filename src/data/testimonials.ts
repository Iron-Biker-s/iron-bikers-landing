import type { ImageMetadata } from "astro";
import danielaImg from "../assets/images/testimonials/daniela.webp";
import juanCarlosImg from "../assets/images/testimonials/juan_carlos.webp";
import dilanImg from "../assets/images/leaders/dilan.webp";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: ImageMetadata;
  alt: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Estar en este club te hace sentir en una experiencia única e inolvidable con Iron biker`s club Cartagena de buena vibra y verdadera pasión por las motos. Si buscas rodar en familia y vivir momentos increíbles, este es el lugar definitivo se siente la hermandad y la unión entre todos, nos apoyamos unos con otros.",
    name: "Daniela Guerra",
    role: "Miembro",
    image: danielaImg,
    alt: "Daniela Guerra, miembro del club",
  },
  {
    quote:
      "Saber que compartes el asfalto con personas atrapadas por la misma pasión, es una sensación inexplicable. Le agradezco enormemente a este gran club por abrirme las puertas, por las risas compartidas en cada parada, por los consejos y por demostrarme que la familia también se elige y se encuentra en la carretera.",
    name: "Juan Carlos",
    role: "Miembro",
    image: juanCarlosImg,
    alt: "Juan Carlos, miembro del club",
  },
  {
    quote:
      "Hace 4 años llegué a Iron Biker's Club Cartagena y encontré mucho más que un club: encontré una familia. Como Vicepresidente, me siento orgulloso de aportar al crecimiento de esta gran hermandad y de representar con honor nuestros colores. Gracias a cada integrante por la confianza y por cada kilómetro compartido. Iron Biker's Club Cartagena es pasión, respeto y unión.",
    name: "Dilan Bravo",
    role: "Vice Presidente",
    image: dilanImg,
    alt: "Dilan Bravo, vicepresidente del club",
  },
];
