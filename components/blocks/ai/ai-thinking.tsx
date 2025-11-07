"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const SCROLL_CONFIG = {
  SPEED: 5,
  INITIAL_DELAY: 100,
} as const;

const TIMER_CONFIG = {
  INTERVAL: 1000,
} as const;

const DIMENSIONS = {
  CARD_HEIGHT: "150px",
  FADE_HEIGHT: "80px",
} as const;

const SHIMMER_CONFIG = {
  DURATION: "5s",
  GRADIENT:
    "linear-gradient(110deg, #404040 35%, #fff 50%, #404040 75%, #404040)",
  BACKGROUND_SIZE: "200% 100%",
} as const;

const THINKING_CONTENT = `Okay, first I need to understand what HextaUI is. It seems to be a UI library or framework, likely for web development. I should check the web results for any mentions of HextaUI.

Looking at the web results, I see that HextaUI is mentioned in several contexts. It's described as a collection of modern, responsive, and customizable UI components for Next.js. It seems to be designed to help developers build websites more efficiently.

I should look for more specific details. The results mention that HextaUI provides components that can be copied, adapted, and personalized. It also mentions that it's open-source and has a community of contributors.

I should also check if there are any specific features or benefits mentioned. The results talk about the components being responsive and customizable, which are important for modern web development. It also mentions that the components are designed to be production-ready.

I should consider if there are any drawbacks or limitations mentioned. The results don't seem to mention any significant drawbacks, but I should keep in mind that any library or framework will have its own set of trade-offs.

I should also consider the credibility of the sources. The results include mentions from GitHub, Product Hunt, and other development-related websites, which are generally reliable sources for information about software libraries.

Based on the information from the web results, I can conclude that HextaUI is a UI component library for Next.js that provides modern, responsive, and customizable components for building websites. It's open-source and has a community of contributors.

I should also consider if there are any related posts on X that might provide additional context or opinions. The posts on X mention HextaUI v2 being released, with features like a complete design system, primitive components, and ready-made blocks. This suggests that HextaUI is actively maintained and updated.

I should consider if there are any specific use cases or examples mentioned. The web results mention that HextaUI components can be used to build stunning websites effortlessly, and that they are suitable for production applications.

I should also consider if there are any comparisons to other similar libraries or frameworks. The results don't mention any direct comparisons, but I can infer that HextaUI is similar to other UI component libraries like Shadcn/UI, which is mentioned in one of the results.

Based on the information from the web results and the posts on X, I can conclude that HextaUI is a UI component library for Next.js that provides modern, responsive, and customizable components for building websites. It's open-source, actively maintained, and has a community of contributors.

I should consider if there are any specific instructions or guidelines for using HextaUI. The web results mention that components can be copied and pasted into projects, and that there is a CLI tool for installing components.

I should also consider if there are any specific requirements or dependencies mentioned. The web results mention that HextaUI is designed for Next.js, so it likely requires a Next.js project to use.

Based on the information from the web results and the posts on X, I can conclude that HextaUI is a UI component library for Next.js that provides modern, responsive, and customizable components for building websites. It's open-source, actively maintained, and has a community of contributors. Components can be copied and pasted into projects, and there is a CLI tool for installing components.

I should consider if there are any specific examples or demos available. The web results mention that there is a website for HextaUI, which likely includes examples and documentation.

I should also consider if there are any specific licensing or usage terms mentioned. The web results mention that HextaUI is open-source, but I should check the specific license to understand the terms of use.

Based on the information from the web results and the posts on X, I can conclude that HextaUI is a UI component library for Next.js that provides modern, responsive, and customizable components for building websites. It's open-source, actively maintained, and has a community of contributors. Components can be copied and pasted into projects, and there is a CLI tool for installing components. The library is designed to be production-ready and supports features like dark mode.

I should consider if there are any specific installation or setup instructions mentioned. The web results mention that there is a CLI tool for installing components, and that components can be copied and pasted into projects.

I should also consider if there are any specific customization options mentioned. The web results mention that components are customizable through props and Tailwind CSS classes.

Based on the information from the web results and the posts on X, I can conclude that HextaUI is a UI component library for Next.js that provides modern, responsive, and customizable components for building websites. It's open-source, actively maintained, and has a community of contributors. Components can be copied and pasted into projects, and there is a CLI tool for installing components. The library is designed to be production-ready and supports features like dark mode. Components are customizable through props and Tailwind CSS classes.

I should consider if there are any specific community or support resources mentioned. The web results mention that there is a GitHub repository and a community for support and discussions.

I should also consider if there are any specific contribution guidelines mentioned. The web results mention that contributions are welcome and that there are guidelines for contributing.

Based on the information from the web results and the posts on X, I can conclude that HextaUI is a UI component library for Next.js that provides modern, responsive, and customizable components for building websites. It's open-source, actively maintained, and has a community of contributors. Components can be copied and pasted into projects, and there is a CLI tool for installing components. The library is designed to be production-ready and supports features like dark mode. Components are customizable through props and Tailwind CSS classes. There is a GitHub repository and a community for support and discussions, and contributions are welcome.

I should consider if there are any specific version or release information mentioned. The posts on X mention that HextaUI v2 has been released, with features like a complete design system, primitive components, and ready-made blocks.

I should also consider if there are any specific future plans or roadmap mentioned. The web results mention that there is a roadmap for upcoming features and improvements.

Based on the information from the web results and the posts on X, I can conclude that HextaUI is a UI component library for Next.js that provides modern, responsive, and customizable components for building websites. It's open-source, actively maintained, and has a community of contributors. Components can be copied and pasted into projects, and there is a CLI tool for installing components. The library is designed to be production-ready and supports features like dark mode. Components are customizable through props and Tailwind CSS classes. There is a GitHub repository and a community for support and discussions, and contributions are welcome. The latest version, HextaUI v2, includes a complete design system, primitive components, and ready-made blocks, and there is a roadmap for future features and improvements.

I think I have enough information to provide a comprehensive answer.

HextaUI is a UI component library specifically designed for Next.js applications. It provides a collection of modern, responsive, and customizable UI components that developers can easily copy, adapt, and personalize to build professional and visually appealing web interfaces. The library is open-source, actively maintained, and supported by a community of contributors, making it a reliable choice for developers looking to streamline their development process.

Key Features and Benefits:

Component-Based: HextaUI offers a wide range of pre-built components, such as buttons, forms, and navigation elements, which can be directly copied and pasted into your Next.js project. This allows for rapid prototyping and development.

Customization: Components are highly adaptable through props and Tailwind CSS classes, enabling developers to modify styles and behavior without altering the underlying code. This flexibility ensures that the components can fit the unique design requirements of any project.

Responsive and Production-Ready: The components are designed to be fully responsive, ensuring compatibility across devices. They are also tested to be production-ready, making them suitable for real-world applications.

CLI Tool: HextaUI includes a CLI tool that simplifies the installation of components. Developers can use commands like npx hexta-ui add button to quickly add components to their projects.

Dark Mode Support: The library includes built-in support for dark mode, enhancing accessibility and user experience.

Community and Support: HextaUI has an active community on GitHub, where developers can report bugs, request features, and contribute to the project. There are also contribution guidelines for those interested in improving the library.

Recent Updates:

HextaUI v2 was recently released, introducing several new features: A complete design system, Over 40 primitive components, Ready-made blocks for faster development.

The library is actively maintained, with a roadmap for future features and improvements, ensuring it stays up-to-date with modern development practices.

Usage and Installation:

To use HextaUI, you need a Next.js project. Components can be installed via the CLI or by copying and pasting code from the HextaUI website, which includes examples and documentation. The library is free and open-source, making it accessible to developers of all levels.

Conclusion:

HextaUI is an excellent choice for developers seeking to build modern, responsive, and customizable web interfaces with minimal effort. Its component-based approach, combined with strong community support and regular updates, makes it a valuable tool for accelerating the development of Next.js applications.`;

function useTimer() {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, TIMER_CONFIG.INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return timer;
}

function useAutoScroll(contentRef: React.RefObject<HTMLDivElement | null>) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!contentRef.current || typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const initializeScroll = () => {
      if (!contentRef.current) return;

      const { scrollHeight, clientHeight } = contentRef.current;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) return;

      intervalRef.current = setInterval(() => {
        setScrollPosition((prev) => {
          const newPosition = prev + 1;
          return newPosition >= maxScroll ? 0 : newPosition;
        });
      }, SCROLL_CONFIG.SPEED);
    };

    const timeoutId = setTimeout(initializeScroll, SCROLL_CONFIG.INITIAL_DELAY);

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [contentRef]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition, contentRef]);

  return scrollPosition;
}

interface ThinkingHeaderProps {
  timer: number;
}

function ThinkingHeader({ timer }: ThinkingHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <Spinner aria-hidden="true" className="size-4" />
      <p
        className="bg-clip-text text-sm text-transparent"
        style={{
          backgroundImage: SHIMMER_CONFIG.GRADIENT,
          backgroundSize: SHIMMER_CONFIG.BACKGROUND_SIZE,
          animation: `shimmer ${SHIMMER_CONFIG.DURATION} linear infinite`,
        }}
      >
        HextaAI is thinking
      </p>
      <span
        aria-label={`${timer} seconds elapsed`}
        className="text-muted-foreground text-sm"
      >
        {timer}s
      </span>
    </div>
  );
}

interface FadeOverlayProps {
  position: "top" | "bottom";
}

function FadeOverlay({ position }: FadeOverlayProps) {
  const isTop = position === "top";
  const gradientClass = isTop
    ? "bg-gradient-to-b from-secondary from-30% to-transparent"
    : "bg-gradient-to-t from-secondary from-30% to-transparent";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-10 ${gradientClass}`}
      style={{
        [isTop ? "top" : "bottom"]: 0,
        height: DIMENSIONS.FADE_HEIGHT,
      }}
    />
  );
}

interface ThinkingContentProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  content: string;
}

function ThinkingContent({ contentRef, content }: ThinkingContentProps) {
  return (
    <div
      aria-label="AI thinking process"
      aria-live="polite"
      className="h-full overflow-hidden p-4 text-secondary-foreground"
      ref={contentRef}
      role="log"
      style={{ scrollBehavior: "auto" }}
    >
      <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>
    </div>
  );
}

interface ContentCardProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  content: string;
}

function ContentCard({ contentRef, content }: ContentCardProps) {
  return (
    <Card
      className="relative overflow-hidden rounded-none bg-secondary p-2"
      style={{ height: DIMENSIONS.CARD_HEIGHT }}
    >
      <FadeOverlay position="top" />
      <FadeOverlay position="bottom" />
      <ThinkingContent content={content} contentRef={contentRef} />
    </Card>
  );
}

function ShimmerStyles() {
  return (
    <style jsx>{`
      @keyframes shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [style*="shimmer"] {
          animation: none;
        }
      }
    `}</style>
  );
}

export default function AIThinking({ className }: { className?: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const timer = useTimer();
  useAutoScroll(contentRef);

  return (
    <div className={cn("flex max-w-xl flex-col gap-4", className)}>
      <ThinkingHeader timer={timer} />
      <ContentCard content={THINKING_CONTENT} contentRef={contentRef} />
      <ShimmerStyles />
    </div>
  );
}
