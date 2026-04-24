import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export const metadata = { title: "Inscription | Litho Intelligence" };

export default function RegisterPage() {
  return (
    <main className="auth-page">
      <AuthForm mode="register" />
      <p>
        Deja membre ? <Link href="/login">Se connecter</Link>
      </p>
    </main>
  );
}
