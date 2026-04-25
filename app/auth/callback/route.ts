import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = createSupabaseServerClient();
  const next = request.nextUrl.searchParams.get("next") || "/dashboard";
  const url = request.nextUrl.clone();
  url.pathname = next;
  url.search = "";

  if (supabase) {
    await supabase.auth.getUser();
  }

  return NextResponse.redirect(url);
}
