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
        className="flex min-h-screen items-center justify-center bg-background px-4 py-10"
        id="main-content"
      >
        <section
          aria-label="Authentication Area"
          className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2"
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
