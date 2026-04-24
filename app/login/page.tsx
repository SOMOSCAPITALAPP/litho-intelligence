import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export const metadata = { title: "Connexion | Litho Intelligence" };

export default function LoginPage() {
  return (
    <main className="auth-page">
      <AuthForm mode="login" />
      <p>
        Pas encore membre ? <Link href="/register">Creer un compte gratuit</Link>
      </p>
    </main>
  );
}
