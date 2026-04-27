import Link from "next/link";
import { ConsultationClient } from "@/components/ConsultationClient";
import { getCurrentUser } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";

export const metadata = {
  title: "Consultation en lithothérapie | Litho Intelligence",
  description: "Posez une question libre et recevez une réponse claire avec une sélection de pierres et de bracelets associés."
};

export default async function ConsultationPage({
  searchParams
}: {
  searchParams: { session_id?: string; payment?: string; mode?: string };
}) {
  const { user } = await getCurrentUser();
  const stripe = getStripe();
  const sessionId = typeof searchParams.session_id === "string" ? searchParams.session_id : "";
  const payment = typeof searchParams.payment === "string" ? searchParams.payment : "";
  const mode = typeof searchParams.mode === "string" ? searchParams.mode : "";

  let accessible = false;
  const testMode = mode === "test";

  if (user && testMode) {
    accessible = true;
  } else if (user && stripe && sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      accessible =
        session.payment_status === "paid" && session.metadata?.user_id === user.id && session.metadata?.kind === "consultation";
    } catch {
      accessible = false;
    }
  }

  if (!user) {
    return (
      <main className="section">
        <p className="eyebrow">Consultation privée</p>
        <h1>Connectez-vous pour réserver votre consultation</h1>
        <p className="section-lead">La consultation se débloque après paiement et reste liée à votre compte membre.</p>
        <div className="hero-actions">
          <Link className="button gold-button" href="/login">
            Me connecter
          </Link>
          <Link className="button secondary" href="/register">
            Créer mon espace gratuit
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      {payment === "cancelled" ? (
        <section className="section compact-section">
          <article className="card">
            <h2>Paiement annulé</h2>
            <p>La consultation n’a pas été finalisée. Vous pouvez reprendre quand vous le souhaitez.</p>
          </article>
        </section>
      ) : null}
      <ConsultationClient accessible={accessible} sessionId={sessionId} testMode={testMode} />
    </>
  );
}
