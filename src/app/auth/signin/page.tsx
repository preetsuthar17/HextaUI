import type { Metadata } from "next";
import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = customMetaDataGenerator({
  title: "Sign In",
  description:
    "Modern, responsive, customizable UI components for Next.js. Copy, adapt, and personalize them.",
  ogImage: "/Banner.png",
  twitterCard: "summary_large_image",
  canonicalUrl: "https://hextaui.com",
});

export default function AuthPage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <LoginForm />
    </main>
  );
}
