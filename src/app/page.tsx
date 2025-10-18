import AuthWithSocialBlock from "@/components/blocks/authentication/auth-with-social";
import PasswordResetBlock from "@/components/blocks/authentication/password-reset";
import PasswordUpdateBlock from "@/components/blocks/authentication/password-update";
import SignInBlock from "@/components/blocks/authentication/sign-in";
import SignUpBlock from "@/components/blocks/authentication/sign-up";
import TwoFactorAuthBlock from "@/components/blocks/authentication/two-factor";
import MessageConversation from "@/components/blocks/messaging/message-conversation";
import MessageInput from "@/components/blocks/messaging/message-input";
import MessagingBlock from "@/components/blocks/messaging/messaging-block";
import PeopleList from "@/components/blocks/messaging/people-list";
import GeneralSettings from "@/components/blocks/settings/general-settings";
import ProfileSettings from "@/components/blocks/settings/profile-settings";

import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="font-sans">
      <main
        className="flex flex-col items-center justify-center gap-24 bg-background px-4 py-10"
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
        <Separator />
        <section
          aria-label="Messaging Area"
          className="grid w-full max-w-4xl grid-rows-1 gap-4"
        >
          <div className="flex flex-col gap-4">
            <MessageInput />
            <PeopleList />
            <MessageConversation className="h-fit" />
            <MessagingBlock />
          </div>
        </section>
        <Separator />
        <section
          aria-label="Settings Area"
          className="grid w-full max-w-4xl grid-rows-1 gap-12"
        >
          <div className="flex flex-col gap-12">
            <ProfileSettings />
            <GeneralSettings />
          </div>
        </section>
      </main>
    </div>
  );
}
