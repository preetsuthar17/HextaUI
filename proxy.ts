import { NextRequest, NextResponse } from "next/server";
import { captureRegistryEvent } from "@wandry/analytics-sdk";

export function proxy(request: NextRequest) {
  const token = process.env.WANDRY_ANALYTICS_TOKEN;

  if (token) {
    captureRegistryEvent(request, token);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

