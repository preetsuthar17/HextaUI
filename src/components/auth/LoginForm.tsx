import { createClient } from "@/app/utils/supabase";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Card, CardContent } from "../ui/card";

export default async function LoginForm() {
  const signInWithGithub = async () => {
    "use server";
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Error during GitHub sign-in:", error);
      throw new Error(`Error signing in with GitHub: ${error.message}`);
    } else {
      redirect(data.url);
    }
  };

  const signInWithGoogle = async () => {
    "use server";
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Error during Google sign-in:", error);
      throw new Error(`Error signing in with Google: ${error.message}`);
    } else {
      redirect(data.url);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="flex flex-col gap-4 w-full max-w-xs">
        <CardContent>
          <form action={signInWithGithub} className="flex-1">
            <Button type="submit" className="w-full font-medium">
              <FaGithub className="mr-2 h-4 w-4" />
              Sign in GitHub
            </Button>
          </form>

          <form action={signInWithGoogle} className="flex-1">
            <Button type="submit" className="w-full font-medium">
              <FaGoogle className="mr-2 h-4 w-4" />
              Sign in Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
