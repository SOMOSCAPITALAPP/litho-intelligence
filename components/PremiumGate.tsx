import { CheckoutButton } from "@/components/CheckoutButton";
import { getCurrentUser, isPremium } from "@/lib/auth";

export async function PremiumGate({
  featureName,
  children,
  fallback
}: {
  featureName: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { profile } = await getCurrentUser();
  if (isPremium(profile)) return <>{children}</>;

  return (
    <>
      {fallback ?? (
        <section className="paywall-card">
          <p className="eyebrow">Premium</p>
          <h2>Debloquez {featureName} avec Litho Intelligence Premium.</h2>
          <p>Recommandations illimitees, historique, profil energetique et rituels personnalises.</p>
          <CheckoutButton />
        </section>
      )}
    </>
  );
}
