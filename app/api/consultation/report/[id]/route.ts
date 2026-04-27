import { NextResponse } from "next/server";
import type { ConsultationProfile, ConsultationResponse } from "@/lib/consultation";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { createConsultationPdf } from "@/lib/consultation-pdf";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const supabaseServer = createSupabaseServerClient();
  const supabase = createSupabaseAdminClient();

  if (!supabase || !supabaseServer) {
    return NextResponse.json({ error: "PDF indisponible pour le moment." }, { status: 500 });
  }

  const {
    data: { user }
  } = await supabaseServer.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  }

  const { data: session } = await supabase
    .from("consultation_sessions")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!session) {
    return NextResponse.json({ error: "Consultation introuvable." }, { status: 404 });
  }

  const response = (session.summary_json ?? {}) as ConsultationResponse;
  if (!response.title || !Array.isArray(response.stones)) {
    return NextResponse.json({ error: "Synthèse indisponible." }, { status: 400 });
  }

  const pdf = createConsultationPdf({
    response,
    profile: (session.profile_json ?? {}) as ConsultationProfile,
    createdAt: session.updated_at ?? session.created_at
  });

  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="consultation-litho-intelligence-${params.id}.pdf"`,
      "Cache-Control": "private, max-age=0, must-revalidate"
    }
  });
}
