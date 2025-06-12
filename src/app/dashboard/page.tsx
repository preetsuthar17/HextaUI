import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";
import { createClient } from "@/app/utils/supabase";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export const metadata: Metadata = customMetaDataGenerator({
  title: "Dashboard - HextaUI",
  description:
    "Your personal dashboard for HextaUI. Manage your account and access premium features.",
  ogImage: "/Banner.png",
  twitterCard: "summary_large_image",
  canonicalUrl: "https://hextaui.com/dashboard",
});

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/signin");
  }

  return <DashboardContent user={user} />;
}
