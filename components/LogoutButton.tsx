"use client";

import { useRouter } from "next/navigation";
import { clearLocalMember } from "@/lib/localMember";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
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
