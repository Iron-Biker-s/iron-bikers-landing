export interface Benefit {
  title: string;
  description: string;
  featured?: boolean;
}

export const benefits: Benefit[] = [
  {
    title: "Rodadas Logísticas VIP",
    description:
      "Acompañamiento técnico, escolta y rutas premium diseñadas para el máximo disfrute y seguridad del piloto.",
    featured: true,
  },
  {
    title: "Access a Eventos Privados",
    description:
      "Lanzamientos de marcas aliadas, cenas de gala y acceso preferente a los eventos de motociclismo más importantes de la región.",
  },
  {
    title: "Concierge Mecánico",
    description:
      "Atención prioritaria en talleres certificados y gestión de importación de repuestos exclusivos.",
  },
  {
    title: "Networking de Alto Nivel",
    description:
      "Forma parte de una red de contactos influyentes que comparten tu misma pasión por el asfalto.",
  },
];
