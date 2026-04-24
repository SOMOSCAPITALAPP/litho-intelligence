"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase n'est pas encore configure.");
      return;
    }

    setLoading(true);
    setError("");

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

    setLoading(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="auth-panel">
      <h1>{mode === "register" ? "Creer votre espace membre" : "Connexion membre"}</h1>
      <p>
        {mode === "register"
          ? "Votre compte gratuit debloque le suivi, les favoris et vos premieres recommandations."
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
        {loading ? "Veuillez patienter..." : mode === "register" ? "Creer mon compte" : "Me connecter"}
      </button>
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
}
