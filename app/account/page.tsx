import { LogoutButton } from "@/components/LogoutButton";
import { PortalButton } from "@/components/PortalButton";
import { requireUser } from "@/lib/auth";

export const metadata = { title: "Compte | Litho Intelligence" };

export default async function AccountPage() {
  const { user, profile } = await requireUser();

  return (
    <main className="section">
      <h1>Mon compte</h1>
      <div className="grid">
        <article className="card">
          <h2>Profil</h2>
          <p>Email : {user.email}</p>
          <p>Plan : {profile?.plan ?? "free"}</p>
        </article>
        <article className="card">
          <h2>Abonnement</h2>
          <p>Premium est annulable à tout moment depuis le portail Stripe.</p>
          {profile?.stripe_customer_id ? <PortalButton /> : null}
        </article>
        <article className="card">
          <h2>Session</h2>
          <LogoutButton />
        </article>
      </div>
    </main>
  );
}
