import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Litho Intelligence",
  description: "Recommandations personnalisées de pierres basées sur les traditions de lithothérapie."
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
