import AIPromptInput from "@/components/blocks/ai/ai-prompt-input";
import AIThinking from "@/components/blocks/ai/ai-thinking";

import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="mx-auto flex flex-col gap-12 px-4 py-8">
      <Hero />
      <p className="flex items-center justify-center text-center">
        We&apos;re working on new components and blocks. Stay tuned!
      </p>
      <div className="flex items-start justify-center gap-4">
        <AIPromptInput />
        <AIThinking />
      </div>
    </div>
  );
}
