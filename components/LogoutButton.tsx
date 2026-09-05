"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { clearLocalMember } from "@/lib/localMember";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const useNextAuth = process.env.NEXT_PUBLIC_AUTH_PROVIDER === "nextauth";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    if (useNextAuth) {
      clearLocalMember();
      await signOut({ callbackUrl: "/" });
      return;
    }

    const supabase = createSupabaseBrowserClient();
    await supabase?.auth.signOut();
    clearLocalMember();
    router.push("/");
    router.refresh();
  }

  return (
    <button className="button secondary" onClick={logout} type="button">
      Déconnexion
    </button>
  );
}
