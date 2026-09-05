/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/stone/obsidienne", destination: "/pierres/obsidienne-noire", permanent: true },
      { source: "/stone/jade-vert", destination: "/pierres/jade-emeraude", permanent: true },
      { source: "/stone/jade-blanc", destination: "/pierres/jade-emeraude", permanent: false },
      { source: "/stone/agate", destination: "/pierres/agate-du-botswana", permanent: false },
      { source: "/intention/argent", destination: "/intentions/argent-abondance", permanent: false },
      { source: "/pierre-pour-stress", destination: "/intentions/stress", permanent: true },
      { source: "/pierre-pour-amour", destination: "/intentions/amour", permanent: true },
      { source: "/pierre-pour-confiance", destination: "/intentions/confiance", permanent: true },
      { source: "/pierre-pour-argent", destination: "/intentions/argent-abondance", permanent: true },
      { source: "/stone/:slug", destination: "/pierres/:slug", permanent: true },
      { source: "/stones", destination: "/pierres", permanent: true },
      { source: "/stones/:slug", destination: "/pierres/:slug", permanent: true },
      { source: "/intention", destination: "/intentions", permanent: true },
      { source: "/intention/:slug", destination: "/intentions/:slug", permanent: true },
      { source: "/authenticite-entretien", destination: "/entretien", permanent: true }
    ];
  }
};

export default nextConfig;
