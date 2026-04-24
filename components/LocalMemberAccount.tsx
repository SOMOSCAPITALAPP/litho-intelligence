"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/LogoutButton";
import { getLocalMember, type LocalMember } from "@/lib/localMember";

export function LocalMemberAccount() {
  const [member, setMember] = useState<LocalMember | null>(null);

  useEffect(() => {
    setMember(getLocalMember());
  }, []);

  if (!member) {
    return (
      <main className="section">
        <h1>Mon compte</h1>
        <p className="section-lead">Connectez-vous ou créez un espace gratuit pour accéder à votre compte.</p>
        <div className="hero-actions">
          <Link className="button gold-button" href="/register">Créer mon espace gratuit</Link>
          <Link className="button secondary" href="/login">Me connecter</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <h1>Mon compte</h1>
      <div className="grid">
        <article className="card">
          <h2>Profil</h2>
          <p>Email : {member.email}</p>
          <p>Nom : {member.fullName || "Non renseigné"}</p>
          <p>Plan : gratuit</p>
        </article>
        <article className="card">
          <h2>Newsletter</h2>
          <p>{member.newsletterOptIn ? "Inscrit au guide offert et aux emails." : "Non inscrit à la newsletter."}</p>
        </article>
        <article className="card">
          <h2>Session</h2>
          <LogoutButton />
        </article>
      </div>
    </main>
  );
}
