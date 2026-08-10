export interface SiteConfig {
  siteName: string;
  siteNameShort: string;
  description: string;
  city: string;
  email: string;
  nit: string;
  formAction: string;
  url: string;
}

export const site: SiteConfig = {
  siteName: "Iron Biker's Club Cartagena",
  siteNameShort: "Iron Biker's",
  description:
    "Club de motociclismo de alta gama en Cartagena. Pasión, lealtad y estilo sobre dos ruedas.",
  city: "Cartagena de Indias, Colombia",
  email: "Ironbikersclubctg@gmail.com",
  nit: "NIT: 9096604-2",
  formAction:
    import.meta.env.PUBLIC_FORM_ACTION ??
    "https://script.google.com/macros/s/AKfycbzcoj5u70gse5R7p5xn3bZgrTO_xGpXrBVvG9ciR8PTSsMx95wpvvcomC4BB6KpzAE/exec",
  url: import.meta.env.PUBLIC_SITE_URL ?? "https://iron-bikers-landing.vercel.app",
};
