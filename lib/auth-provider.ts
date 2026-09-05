export function getAuthProvider() {
  return (process.env.NEXT_PUBLIC_AUTH_PROVIDER ?? process.env.AUTH_PROVIDER ?? "supabase").toLowerCase();
}

export function isNextAuthProvider() {
  return getAuthProvider() === "nextauth";
}
