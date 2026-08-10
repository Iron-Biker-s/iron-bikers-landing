export interface ValueItem {
  number: string;
  title: string;
  description: string;
  shifted?: boolean;
}

export const values: ValueItem[] = [
  {
    number: "01",
    title: "Lealtad",
    description: "Hermanos antes que conductores. Siempre cuidamos la espalda del otro.",
  },
  {
    number: "02",
    title: "Rigor",
    description: "Mantenimiento impecable y disciplina en cada formación de ruta.",
    shifted: true,
  },
  {
    number: "03",
    title: "Estilo",
    description: "La estética es nuestra firma. Elegancia pura sobre dos ruedas.",
  },
  {
    number: "04",
    title: "Destino",
    description: "Buscamos lo inexplorado. Cada rodada es un nuevo horizonte.",
    shifted: true,
  },
];
