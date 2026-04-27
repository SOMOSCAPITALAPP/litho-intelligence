"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, ClipboardCheck, Download, FileText, Lock, Mail } from "lucide-react";
import { FormationQuiz } from "@/components/FormationQuiz";
import formationModules from "@/data/formation.modules.json";

type Registration = {
  fullName: string;
  email: string;
  registeredAt: string;
};

const STORAGE_KEY = "litho:formation:free-registration";

export function FormationAccess() {
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [certFullName, setCertFullName] = useState("");
  const [certEmail, setCertEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [certStatus, setCertStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Registration;
        setRegistration(saved);
        setFullName(saved.fullName);
        setEmail(saved.email);
      }
    } catch {
      setRegistration(null);
    }
  }, []);

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fullName.trim() || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    const response = await fetch("/api/email-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        email,
        source: "formation-gratuite",
        metadata: {
          intent: "free_course_access",
          course: "formation-lithotherapie-gratuite"
        }
      })
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    const next = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      registeredAt: new Date().toISOString()
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setRegistration(next);
    setStatus("success");
  }

  async function registerCertified(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!certFullName.trim() || !certEmail.includes("@")) {
      setCertStatus("error");
      return;
    }

    setCertStatus("loading");
    const response = await fetch("/api/email-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: certFullName,
        email: certEmail,
        source: "formation-certifiante-199",
        metadata: {
          intent: "certified_course_interest",
          price: 199,
          currency: "EUR"
        }
      })
    });

    setCertStatus(response.ok ? "success" : "error");
  }

  if (!registration) {
    return (
      <section className="formation-lock-panel" id="inscription">
        <div>
          <p className="eyebrow">Inscription gratuite requise</p>
          <h2>Débloquez les cours, PDF et QCM</h2>
          <p>
            L'accès à la formation gratuite demande simplement votre nom, prénom et email. Vous pourrez ensuite lire les
            7 modules, télécharger les supports PDF et valider chaque étape avec un QCM.
          </p>
          <div className="formation-lock-list">
            <span><CheckCircle2 size={16} /> Accès immédiat</span>
            <span><CheckCircle2 size={16} /> 7 PDF inclus</span>
            <span><CheckCircle2 size={16} /> QCM en ligne</span>
          </div>
        </div>

        <form className="formation-register-card" onSubmit={register}>
          <Lock size={22} />
          <label className="field">
            <span>Nom et prénom</span>
            <input autoComplete="name" onChange={(event) => setFullName(event.target.value)} placeholder="Ex : Stéphane Olivo" value={fullName} />
          </label>
          <label className="field">
            <span>Email</span>
            <input autoComplete="email" onChange={(event) => setEmail(event.target.value)} placeholder="vous@email.com" type="email" value={email} />
          </label>
          <button className="button gold-button" disabled={status === "loading"} type="submit">
            {status === "loading" ? "Inscription..." : "Accéder gratuitement"}
          </button>
          {status === "error" ? <p className="form-error">Indiquez votre nom, prénom et une adresse email valide.</p> : null}
          <p className="fineprint">Vos informations servent à vous donner accès à la formation et aux ressources Litho Intelligence.</p>
        </form>
      </section>
    );
  }

  return (
    <>
      <section className="formation-access-banner">
        <div>
          <p className="eyebrow">Accès débloqué</p>
          <h2>Bienvenue{registration.fullName ? `, ${registration.fullName.split(" ")[0]}` : ""}</h2>
          <p>Votre inscription gratuite est enregistrée. Vous pouvez suivre les modules, télécharger les PDFs et passer les QCM.</p>
        </div>
        <a className="button secondary" href={formationModules[0].pdfUrl} target="_blank" rel="noreferrer">
          <Download size={16} />
          Premier PDF
        </a>
      </section>

      <div className="formation-timeline">
        {formationModules.map((module) => (
          <article className="formation-module" id={`module-${module.step}`} key={module.id}>
            <header className="formation-module-header">
              <span className="score">{module.step}</span>
              <div>
                <p className="mystic-kicker">
                  <BookOpen size={15} />
                  {module.duration} · {module.level}
                </p>
                <h2>{module.title}</h2>
                <p>{module.goal}</p>
              </div>
            </header>

            <div className="formation-module-grid">
              <section className="formation-course">
                <div className="formation-block-title">
                  <FileText size={18} />
                  <h3>Cours écrit</h3>
                </div>
                {module.course.map((section) => (
                  <div className="lesson-block" key={section.heading}>
                    <h4>{section.heading}</h4>
                    <p>{section.body}</p>
                  </div>
                ))}
              </section>

              <aside className="formation-module-side">
                <div className="resource-card">
                  <span className="mystic-kicker">
                    <Download size={15} />
                    PDF du module
                  </span>
                  <p>Support de cours à conserver, imprimer ou relire hors ligne.</p>
                  <a className="button gold-button" href={module.pdfUrl} target="_blank" rel="noreferrer">
                    Télécharger le PDF
                  </a>
                </div>

                <div className="resource-card">
                  <span className="mystic-kicker">
                    <ClipboardCheck size={15} />
                    Exercice
                  </span>
                  <p>{module.exercise}</p>
                </div>
              </aside>
            </div>

            <FormationQuiz moduleId={module.id} questions={module.quiz} />
          </article>
        ))}
      </div>

      <section className="certification-panel" id="formation-certifiante">
        <div>
          <p className="eyebrow">Formation certifiante</p>
          <h2>Parcours certifiant Litho Intelligence</h2>
          <p>
            Pour aller plus loin : une formation payante à 199 € avec validation finale, étude de cas, support complet
            et certificat de suivi. Elle reprend les bases gratuites puis ajoute une méthode structurée pour conseiller,
            composer des associations et présenter une pratique responsable.
          </p>
          <ul className="certification-list">
            <li>Programme avancé avec exercices corrigés</li>
            <li>QCM final et étude de cas</li>
            <li>Certificat de suivi nominatif</li>
            <li>Prix : 199 €</li>
          </ul>
        </div>
        <form className="certification-interest-card" onSubmit={registerCertified}>
          <span className="price-tag">199 €</span>
          <h3>Être informé du lancement</h3>
          <label className="field">
            <span>Nom et prénom</span>
            <input autoComplete="name" onChange={(event) => setCertFullName(event.target.value)} placeholder="Ex : Stéphane Olivo" value={certFullName} />
          </label>
          <label className="field">
            <span>Email</span>
            <input autoComplete="email" onChange={(event) => setCertEmail(event.target.value)} placeholder="vous@email.com" type="email" value={certEmail} />
          </label>
          <button className="button gold-button" disabled={certStatus === "loading"} type="submit">
            <Mail size={16} />
            {certStatus === "loading" ? "Enregistrement..." : "Recevoir le programme"}
          </button>
          {certStatus === "success" ? <p className="capture-status">Votre intérêt est bien enregistré.</p> : null}
          {certStatus === "error" ? <p className="form-error">Indiquez un nom et un email valide.</p> : null}
        </form>
      </section>
    </>
  );
}
