"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveLocalMember } from "@/lib/localMember";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!email.includes("@")) {
      setError("Indiquez une adresse email valide.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);
    setError("");
    setNotice("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      saveLocalMember({
        email,
        fullName,
        newsletterOptIn: newsletter
      });
      setLoading(false);
      router.push("/dashboard");
      router.refresh();
      return;
    }

    const result =
      mode === "register"
        ? await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                newsletter_opt_in: newsletter
              }
            }
          })
        : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      setLoading(false);
      setError(result.error.message);
      return;
    }

    if (result.data.session) {
      const profileResponse = await fetch("/api/auth/ensure-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, newsletterOptIn: newsletter })
      });

      if (!profileResponse.ok) {
        setLoading(false);
        setError("Connexion réussie, mais la création du profil membre a échoué. Réessayez dans quelques secondes.");
        return;
      }

      setLoading(false);
      const params = new URLSearchParams(window.location.search);
      const next = params.get("redirect") || "/dashboard";
      window.location.href = `/auth/callback?next=${encodeURIComponent(next)}`;
      return;
    }

    setLoading(false);
    setNotice("Compte créé. Vérifiez votre email pour activer la connexion si la confirmation est demandée.");
  }

  return (
    <div className="auth-panel">
      <h1>{mode === "register" ? "Créer votre espace membre" : "Connexion membre"}</h1>
      <p>
        {mode === "register"
          ? "Votre compte gratuit débloque le suivi, les favoris et vos premières recommandations."
          : "Retrouvez vos recommandations, favoris et avantages membres."}
      </p>
      {mode === "register" ? (
        <label className="field">
          <span>Nom</span>
          <input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Votre nom" />
        </label>
      ) : null}
      <label className="field">
        <span>Email</span>
        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="vous@email.com" type="email" />
      </label>
      <label className="field">
        <span>Mot de passe</span>
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
      </label>
      {mode === "register" ? (
        <label className="consent-row">
          <input checked={newsletter} onChange={(event) => setNewsletter(event.target.checked)} type="checkbox" />
          <span>J'accepte de recevoir la newsletter et le guide offert.</span>
        </label>
      ) : null}
      <button className="button gold-button" disabled={loading} onClick={submit} type="button">
        {loading ? "Veuillez patienter..." : mode === "register" ? "Créer mon compte gratuit" : "Me connecter"}
      </button>
      {notice ? <p className="capture-status">{notice}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
}
