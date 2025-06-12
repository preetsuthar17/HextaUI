import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect dashboard routes - require authentication
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Match dashboard routes and auth callback
    "/dashboard/:path*",
    "/auth/callback",
  ],
};
