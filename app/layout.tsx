import type { Metadata } from "next";
import Link from "next/link";
import { Gem, LogIn, Sparkles, UserCircle } from "lucide-react";
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
          <nav className="nav">
            <Link className="brand" href="/">
              <span className="brand-mark">
                <Gem size={18} />
              </span>
              Litho Intelligence
            </Link>
            <div className="nav-links" aria-label="Navigation principale">
              <Link href="/sos">SOS</Link>
              <Link href="/pierre-de-naissance">Pierre de naissance</Link>
              <Link href="/idee-cadeau">Idée cadeau</Link>
              <Link href="/compatibilite-amoureuse">Compatibilité amoureuse</Link>
              <Link href="/meditations">Méditations</Link>
              <Link href="/formation">Formation</Link>
              <Link href="/intention">Intentions</Link>
              <Link href="/stones">Pierres</Link>
              <Link href="/pricing">Premium</Link>
              <Link className="member-link" href="/dashboard">
                <UserCircle size={15} />
                Espace membre
              </Link>
              <Link href="/login">
                <LogIn size={15} />
                Connexion
              </Link>
            </div>
            <Link className="nav-cta" href="/sos">
              <Sparkles size={17} />
              Soutien rapide
            </Link>
          </nav>
          {children}
          <footer className="footer">
            Les informations proposées reposent sur les traditions, croyances et usages symboliques associés aux pierres naturelles. Elles ne remplacent pas un avis médical, psychologique ou professionnel.
          </footer>
        </div>
      </body>
    </html>
  );
}
