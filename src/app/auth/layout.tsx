import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";
import { LogIn, LayoutDashboard } from "lucide-react";
import { createClient } from "@/app/utils/supabase";

export default async function Layout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          text: "Docs",
          url: "/docs/getting-started/introduction",
          secondary: false,
        },
        {
          text: "Components",
          url: "/docs/components",
          secondary: false,
        },
        {
          text: "Blocks",
          url: "/blocks",
          secondary: false,
        },
        {
          text: user ? "Dashboard" : "Sign In",
          url: user ? "/dashboard" : "/auth/signin",
          secondary: false,
          icon: user ? <LayoutDashboard /> : <LogIn />,
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
