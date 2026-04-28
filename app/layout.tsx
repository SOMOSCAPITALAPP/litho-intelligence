import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://litho-intelligence.vercel.app"),
  title: {
    default: "Litho Intelligence",
    template: "%s | Litho Intelligence"
  },
  description: "Recommandations personnalisées de pierres basées sur les traditions de lithothérapie.",
  applicationName: "Litho Intelligence",
  icons: {
    icon: [{ url: "/icon.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    title: "Litho Intelligence",
    description: "Trouvez la pierre adaptée à votre intention grâce aux recommandations, guides et formations Litho Intelligence.",
    url: "/",
    siteName: "Litho Intelligence",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/brand/litho-intelligence-og.png",
        width: 1200,
        height: 630,
        alt: "Litho Intelligence - pierres, intentions et rituels responsables"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Litho Intelligence",
    description: "Recommandations personnalisées, formation gratuite, PDF, QCM et espace membre.",
    images: ["/brand/litho-intelligence-og.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="site-shell">
          <SiteHeader />
          {children}
          <footer className="footer">
            Les informations proposées reposent sur les traditions, croyances et usages symboliques associés aux pierres naturelles. Elles ne remplacent pas un avis médical, psychologique ou professionnel.
          </footer>
        </div>
      </body>
    </html>
  );
}
