export const routes = {
  home: "/",
  stones: "/pierres",
  stone: (slug: string) => `/pierres/${slug}`,
  intentions: "/intentions",
  intention: (slug: string) => `/intentions/${slug}`,
  guides: "/guides",
  guide: (slug: string) => `/guides/${slug}`,
  journal: "/conseils-lithotherapie",
  journalArticle: (slug: string) => `/conseils-lithotherapie/${slug}`,
  test: "/test",
  recommendation: "/recommendation",
  shop: "/boutique-pierres-naturelles"
};
