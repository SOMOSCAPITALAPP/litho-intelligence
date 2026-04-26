"use client";

import Link from "next/link";
import { Menu, Sparkles, UserCircle, X } from "lucide-react";
import { useState } from "react";

const primaryLinks = [
  { href: "/lithotherapie", label: "Lithothérapie" },
  { href: "/stones", label: "Pierres" },
  { href: "/intention", label: "Intentions" },
  { href: "/pierre-de-naissance", label: "Pierre de naissance" },
  { href: "/idee-cadeau", label: "Idée cadeau" },
  { href: "/compatibilite-amoureuse", label: "Compatibilité amoureuse" },
  { href: "/meditations", label: "Méditations" },
  { href: "/formation", label: "Formation" }
];

const secondaryLinks = [
  { href: "/dashboard", label: "Espace membre", icon: UserCircle },
  { href: "/login", label: "Connexion" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="nav">
        <Link className="brand" href="/" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-core" />
            <span className="brand-ring" />
          </span>
          <span className="brand-copy">
            <strong>Litho Intelligence</strong>
            <small>pierres, intentions et rituels</small>
          </span>
        </Link>

        <button
          aria-controls="site-menu"
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="menu-toggle"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className={open ? "nav-panel open" : "nav-panel"} id="site-menu">
          <div className="nav-links" aria-label="Navigation principale">
            {primaryLinks.map((link) => (
              <Link href={link.href} key={link.href} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-utility-links">
            {secondaryLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link className={link.href === "/dashboard" ? "member-link" : ""} href={link.href} key={link.href} onClick={closeMenu}>
                  {Icon ? <Icon size={15} /> : null}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <Link className="nav-cta" href="/sos" onClick={closeMenu}>
          <Sparkles size={17} />
          Soutien rapide
        </Link>
      </nav>
    </header>
  );
}
