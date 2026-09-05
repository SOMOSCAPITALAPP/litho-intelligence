export function getAdminEmails() {
  return [
    process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? "",
    process.env.ADMIN_EXTRA_EMAILS ?? ""
  ]
    .join(",")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  const adminEmails = getAdminEmails();
  return adminEmails.includes(email.trim().toLowerCase());
}
