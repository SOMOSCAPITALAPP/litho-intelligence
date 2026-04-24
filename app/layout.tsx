import type { Metadata } from "next";
import Link from "next/link";
import { Gem, Sparkles } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Litho Intelligence",
  description: "Recommandations personnalisees de pierres basees sur les traditions de lithotherapie."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="site-shell">
          <nav className="nav">
            <Link className="brand" href="/">
              <span className="brand-mark">
                <Gem size={18} />
              </span>
              Litho Intelligence
            </Link>
            <div className="nav-links" aria-label="Navigation principale">
              <Link href="/recommendation">Recommandation</Link>
              <Link href="/combination">Combinaisons</Link>
              <Link href="/stones">Pierres</Link>
              <Link href="/profile">Profil</Link>
              <Link href="/newsletter">Newsletter</Link>
            </div>
            <Link className="nav-cta" href="/recommendation">
              <Sparkles size={17} />
              Test rapide
            </Link>
          </nav>
          {children}
          <footer className="footer">
            Litho Intelligence presente des usages symboliques et traditionnels. Aucun contenu ne remplace un avis medical.
          </footer>
        </div>
      </body>
    </html>
  );
}
