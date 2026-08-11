export interface SiteConfig {
  formAction: string;
  url: string;
}

export const site: SiteConfig = {
  formAction:
    import.meta.env.PUBLIC_FORM_ACTION ??
    "https://script.google.com/macros/s/AKfycbzcoj5u70gse5R7p5xn3bZgrTO_xGpXrBVvG9ciR8PTSsMx95wpvvcomC4BB6KpzAE/exec",
  url: (import.meta.env.PUBLIC_SITE_URL ?? "https://iron-bikers-landing.vercel.app").replace(/\/+$/, ""),
};
