/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/stone/obsidienne", destination: "/stone/obsidienne-noire", permanent: true },
      { source: "/stone/jade-vert", destination: "/stone/jade-emeraude", permanent: true },
      { source: "/stone/jade-blanc", destination: "/stone/jade-emeraude", permanent: false },
      { source: "/stone/agate", destination: "/stone/agate-du-botswana", permanent: false },
      { source: "/intention/argent", destination: "/intention/argent-abondance", permanent: false },
      { source: "/pierres", destination: "/stones", permanent: true },
      { source: "/pierres/:slug", destination: "/stones/:slug", permanent: true },
      { source: "/intentions", destination: "/intention", permanent: true },
      { source: "/intentions/:slug", destination: "/intention/:slug", permanent: true },
      { source: "/authenticite-entretien", destination: "/entretien", permanent: true }
    ];
  }
};

export default nextConfig;
