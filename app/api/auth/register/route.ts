import { NextResponse } from "next/server";
import { checkRateLimit, getRequestIp } from "@/lib/rate-limit";
import { createNeonUser, recordNeonMemberLead } from "@/lib/neon-auth";
import { syncLeadToSysteme } from "@/lib/systeme";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getRequestIp(request);
  const limit = checkRateLimit({
    key: `nextauth-register:ip:${ip}`,
    limit: 8,
    windowMs: 10 * 60 * 1000
  });

  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const fullName = String(body.fullName ?? "").trim().slice(0, 160);
  const newsletterOptIn = body.newsletterOptIn === true;

  if (!email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Adresse email invalide." }, { status: 400 });
  }

  if (!fullName) {
    return NextResponse.json({ ok: false, error: "Indiquez votre prénom ou votre nom." }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ ok: false, error: "Le mot de passe doit contenir au moins 6 caractères." }, { status: 400 });
  }

  const result = await createNeonUser({
    email,
    password,
    fullName,
    newsletterOptIn
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error, code: result.code }, { status: result.status });
  }

  if (newsletterOptIn) {
    await Promise.allSettled([
      recordNeonMemberLead({ email, fullName, newsletterOptIn }),
      syncLeadToSysteme({
        email,
        fullName,
        consent: newsletterOptIn,
        source: "membre-gratuit",
        metadata: {
          auth_provider: "nextauth",
          intent: "free_member_signup"
        }
      })
    ]);
  }

  return NextResponse.json({
    ok: true,
    user: {
      id: result.user.id,
      email: result.user.email,
      fullName: result.user.full_name,
      plan: result.user.plan
    }
  });
}
