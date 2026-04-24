import { Mail } from "lucide-react";
import { wellbeingDisclaimer } from "@/lib/legal";

export default function NewsletterPage() {
  return (
    <main className="section">
      <h1>Newsletter et guide offert</h1>
      <p className="section-lead">
        Recevez le guide PDF gratuit « 10 pierres essentielles pour débuter ».
      </p>

      <form className="form-panel">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" placeholder="vous@email.com" type="email" />
        </div>
        <button className="button" type="button">
          <Mail size={17} />
          Recevoir le guide
        </button>
        <p className="fineprint">{wellbeingDisclaimer}</p>
      </form>
    </main>
  );
}
