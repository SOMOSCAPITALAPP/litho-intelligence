import { EmailCapture } from "@/components/EmailCapture";
import { wellbeingDisclaimer } from "@/lib/legal";

export const metadata = {
  title: "Guide offert | Litho Intelligence",
  description: "Recevez le guide PDF gratuit des 10 pierres essentielles pour choisir une pierre selon vos intentions."
};

export default function NewsletterPage() {
  return (
    <main className="section">
      <p className="eyebrow">Guide offert</p>
      <h1>Les 10 pierres essentielles pour débuter</h1>
      <p className="section-lead">
        Recevez un guide PDF clair, élégant et pratique pour choisir vos premières pierres selon vos émotions et vos intentions.
      </p>

      <EmailCapture source="newsletter-page" />

      <p className="fineprint">{wellbeingDisclaimer}</p>
    </main>
  );
}
