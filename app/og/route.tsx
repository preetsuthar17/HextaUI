import { ImageResponse } from "next/og";
import { getComponentMetadata } from "@/lib/component-metadata";

export const runtime = "edge";

const DEFAULT_OG_IMAGE =
  "https://5xfmztgsig.ufs.sh/f/ZzCwT4wrsqrVozjaUvdGPLJUvqyRh8sbeO1wTpAICiMtWFr9";

function NotFoundOGImage(componentId: string, faviconUrl: string) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        padding: "80px",
        position: "relative",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #f3f4f6 1px, transparent 1px), radial-gradient(circle at 75px 75px, #f3f4f6 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          opacity: 0.3,
        }}
      />

      {/* Main content - Left side */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          flex: 1,
          zIndex: 1,
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "#8b5cf6",
            margin: "0 0 24px 0",
            lineHeight: 1.1,
            maxWidth: "600px",
          }}
        >
          Component Not Found
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "32px",
            color: "#6b7280",
            margin: "0",
            lineHeight: 1.4,
            maxWidth: "500px",
            fontWeight: "400",
          }}
        >
          {componentId}
        </p>
      </div>

      {/* Logo - Right side */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {/* HextaUI Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="HextaUI Logo"
          src={faviconUrl}
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "16px",
            marginBottom: "16px",
          }}
        />

        {/* Brand name */}
        <span
          style={{
            fontSize: "24px",
            color: "#1a1a2e",
            fontWeight: "bold",
          }}
        >
          HextaUI
        </span>
      </div>
    </div>
  );
}

function ComponentOGImage(
  title: string,
  description: string,
  faviconUrl: string
) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        padding: "80px",
        position: "relative",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #f3f4f6 1px, transparent 1px), radial-gradient(circle at 75px 75px, #f3f4f6 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          opacity: 0.3,
        }}
      />

      {/* Main content - Left side */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          flex: 1,
          zIndex: 1,
        }}
      >
        {/* Component title */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "#1a1a2e",
            margin: "0 0 24px 0",
            lineHeight: 1.1,
            maxWidth: "600px",
          }}
        >
          {title}
        </h1>

        {/* Component description */}
        <p
          style={{
            fontSize: "32px",
            color: "#6b7280",
            margin: "0",
            lineHeight: 1.4,
            maxWidth: "500px",
            fontWeight: "400",
          }}
        >
          {description || "A component from HextaUI"}
        </p>
      </div>

      {/* Logo - Right side */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {/* HextaUI Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="HextaUI Logo"
          src={faviconUrl}
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "16px",
            marginBottom: "16px",
          }}
        />

        {/* Brand name */}
        <span
          style={{
            fontSize: "24px",
            color: "#1a1a2e",
            fontWeight: "bold",
          }}
        >
          HextaUI
        </span>
      </div>
    </div>
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const componentId = searchParams.get("component");

    // Use origin for local dev, production URL for production
    const baseUrl =
      origin.includes("localhost") || origin.includes("127.0.0.1")
        ? origin
        : "https://www.hextaui.com";
    const faviconUrl = `${baseUrl}/favicon.ico`;

    // If no component ID provided, redirect to default OG image
    if (!componentId) {
      return Response.redirect(DEFAULT_OG_IMAGE, 302);
    }

    const metadata = getComponentMetadata(componentId);

    if (!metadata) {
      const jsx = NotFoundOGImage(componentId, faviconUrl);
      return new ImageResponse(jsx, {
        width: 1200,
        height: 630,
      });
    }

    const jsx = ComponentOGImage(
      metadata.title,
      metadata.description || "A component from HextaUI",
      faviconUrl
    );
    return new ImageResponse(jsx, {
      width: 1200,
      height: 630,
    });
  } catch (e) {
    const message =
      typeof e === "object" &&
      e !== null &&
      "message" in e &&
      typeof (e as { message: unknown }).message === "string"
        ? (e as { message: string }).message
        : "Unknown error";
    return Response.json(
      { error: `Failed to generate the image: ${message}` },
      { status: 500 }
    );
  }
}
