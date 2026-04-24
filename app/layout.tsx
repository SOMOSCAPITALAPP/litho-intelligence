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
              <Link href="/test">Test</Link>
              <Link href="/recommendation">Recommandation</Link>
              <Link href="/combination">Combinaisons</Link>
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
              <Link href="/newsletter">Newsletter</Link>
            </div>
            <Link className="nav-cta" href="/sos">
              <Sparkles size={17} />
              Soutien rapide
            </Link>
          </nav>
          {children}
          <footer className="footer">
            Les informations proposées sont issues de traditions de bien-être et de lithothérapie. Elles ne remplacent pas un avis médical, un diagnostic ou un traitement professionnel.
          </footer>
        </div>
      </body>
    </html>
  );
}
