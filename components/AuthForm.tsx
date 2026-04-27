"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveLocalMember } from "@/lib/localMember";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

function getFriendlyAuthError(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Email ou mot de passe incorrect.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Votre email n'est pas encore confirmé. Vérifiez votre boîte de réception, puis reconnectez-vous.";
  }

  if (normalized.includes("user already registered")) {
    return "Un compte existe déjà avec cet email. Connectez-vous à votre espace membre.";
  }

  if (normalized.includes("rate limit")) {
    return "Trop de tentatives en peu de temps. Attendez quelques minutes, puis réessayez.";
  }

  return message || "Une erreur est survenue. Réessayez dans quelques secondes.";
}

function withTimeout<T>(promise: Promise<T>, milliseconds = 12000): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("TIMEOUT")), milliseconds);
    promise
      .then(resolve)
      .catch(reject)
      .finally(() => window.clearTimeout(timeout));
  });
}

function ensureProfileInBackground(fullName: string, newsletter: boolean, mode: "login" | "register") {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 3500);

  fetch("/api/auth/ensure-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: mode === "register" ? fullName.trim() : undefined,
      newsletterOptIn: newsletter
    }),
    signal: controller.signal
  })
    .catch(() => {
      // Le dashboard recrée aussi le profil si besoin. L'accès membre ne doit pas attendre cet appel.
    })
    .finally(() => window.clearTimeout(timeout));
}

function captureMemberLead(email: string, fullName: string, newsletter: boolean, mode: "login" | "register") {
  if (mode !== "register") return;

  fetch("/api/email-capture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      fullName: fullName.trim(),
      source: "membre-gratuit",
      metadata: {
        intent: "free_member_signup",
        newsletter_opt_in: newsletter
      }
    })
  }).catch(() => {
    // L'inscription Supabase reste prioritaire. La capture lead est rejouable via les événements/profils si besoin.
  });
}

function getRedirectTarget() {
  const redirect = new URLSearchParams(window.location.search).get("redirect");
  return redirect?.startsWith("/") ? redirect : "/dashboard";
}

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.includes("@")) {
      setError("Indiquez une adresse email valide.");
      return;
    }

    if (mode === "register" && !fullName.trim()) {
      setError("Indiquez votre prénom ou votre nom pour personnaliser votre espace.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);
    setError("");
    setNotice(mode === "register" ? "Création de votre espace..." : "Connexion à votre espace...");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      saveLocalMember({ email, fullName, newsletterOptIn: newsletter });
      captureMemberLead(email, fullName, newsletter, mode);
      setLoading(false);
      router.push("/dashboard");
      router.refresh();
      return;
    }

    try {
      const result =
        mode === "register"
          ? await withTimeout(
              supabase.auth.signUp({
                email,
                password,
                options: {
                  data: {
                    full_name: fullName.trim(),
                    newsletter_opt_in: newsletter
                  }
                }
              })
            )
          : await withTimeout(supabase.auth.signInWithPassword({ email, password }));

      if (result.error) {
        setLoading(false);
        setNotice("");
        setError(getFriendlyAuthError(result.error.message));
        return;
      }

      captureMemberLead(email, fullName, newsletter, mode);

      if (result.data.session) {
        saveLocalMember({
          email,
          fullName: mode === "register" ? fullName.trim() : undefined,
          newsletterOptIn: newsletter
        });
        ensureProfileInBackground(fullName, newsletter, mode);
        window.location.assign(getRedirectTarget());
        return;
      }

      setLoading(false);
      setNotice("Compte créé. Vérifiez votre email pour activer votre accès si une confirmation est demandée.");
    } catch (authError) {
      setLoading(false);
      setNotice("");
      setError(
        authError instanceof Error && authError.message === "TIMEOUT"
          ? "La connexion prend trop de temps. Vérifiez votre réseau puis réessayez."
          : "Connexion momentanément impossible. Réessayez dans quelques secondes."
      );
    }
  }

  return (
    <form className="auth-panel" onSubmit={submit}>
      <h1>{mode === "register" ? "Créer votre espace membre" : "Connexion membre"}</h1>
      <p>
        {mode === "register"
          ? "Votre compte gratuit débloque le suivi, les favoris et vos premières recommandations."
          : "Retrouvez vos recommandations, favoris et avantages membres."}
      </p>
      {mode === "register" ? (
        <label className="field">
          <span>Prénom ou nom</span>
          <input autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Ex : Stéphane" />
        </label>
      ) : null}
      <label className="field">
        <span>Email</span>
        <input autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="vous@email.com" type="email" />
      </label>
      <label className="field">
        <span>Mot de passe</span>
        <input autoComplete={mode === "register" ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
      </label>
      {mode === "register" ? (
        <label className="consent-row">
          <input checked={newsletter} onChange={(event) => setNewsletter(event.target.checked)} type="checkbox" />
          <span>J'accepte de recevoir la newsletter et le guide offert.</span>
        </label>
      ) : null}
      <button className="button gold-button" disabled={loading} type="submit">
        {loading ? "Veuillez patienter..." : mode === "register" ? "Créer mon espace gratuit" : "Me connecter"}
      </button>
      {mode === "login" ? (
        <p className="fineprint">
          Première visite ? <Link href="/register">Créer un espace gratuit</Link>
        </p>
      ) : null}
      {notice ? <p className="capture-status">{notice}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}
    </form>
  );
}
