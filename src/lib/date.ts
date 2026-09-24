/** Fecha en formato editorial colombiano: "10 de agosto de 2026" */
export const formatDate = (date: Date) =>
  date.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
