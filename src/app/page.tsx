import AuthWithSocialBlock from "@/components/blocks/authentication/auth-with-social";
import PasswordResetBlock from "@/components/blocks/authentication/password-reset";
import PasswordUpdateBlock from "@/components/blocks/authentication/password-update";
import SignInBlock from "@/components/blocks/authentication/sign-in";
import SignUpBlock from "@/components/blocks/authentication/sign-up";
import TwoFactorAuthBlock from "@/components/blocks/authentication/two-factor";

export default function Home() {
  return (
    <div className="font-sans">
      <main
        className="min-h-screen px-4 py-10 flex items-center justify-center bg-background"
        id="main-content"
      >
        <section
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4"
          aria-label="Authentication Area"
        >
          <div className="flex flex-col gap-4">
              <SignUpBlock />
              <SignInBlock />
              <AuthWithSocialBlock />
            </div>
          <div className="flex flex-col gap-4">
              <PasswordResetBlock />
              <PasswordUpdateBlock />
              <TwoFactorAuthBlock />
          </div>
        </section>
      </main>
    </div>
  );
}
