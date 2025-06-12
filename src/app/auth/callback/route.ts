import { createClient } from "@/app/utils/supabase";
import { NextResponse } from "next/server";
import { ensureUserProfile } from "@/lib/supabase/profiles-server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (data?.user && !error) {
      // Ensure user profile exists in our custom table
      await ensureUserProfile(data.user.id, data.user.email || "");
    }
  }

  return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
}
