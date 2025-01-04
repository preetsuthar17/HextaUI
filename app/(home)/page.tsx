import Link from "next/link";
import Image from "next/image";

import {
  FaPaintBrush,
  FaGithub,
  FaCode,
  FaStar,
  FaTwitter,
  FaRocket,
  FaBolt,
  FaMagic,
} from "react-icons/fa";

import type { Metadata } from "next";
import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";

export const metadata: Metadata = customMetaDataGenerator({
  title: "Build stunning websites with less effort — HextaUI",
  description:
    "Modern, responsive, and customizable UI components designed for Next.js. Copy, adapt, and make them uniquely yours.",
  ogImage: "/banner.png",
  twitterCard: "summary_large_image",
  canonicalUrl: "https://hextaui.com",
});

const Hero = () => {
  return (
    <>
      <section className="border border-primary/10 min-h-screen max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden">
        {/* gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/10 opacity-80 to-transparent z-[-1]"></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[30rem] bg-background rounded-full z-[-1] blur-[30px]"></div>
        {/* gradient */}

        {/* background bars */}
        <div className="flex items-center justify-between w-full h-fit absolute overflow-hidden bottom-0 skew-x-[-45deg] left-[10rem]">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="flex w-[2px] h-[40rem] bg-gradient-to-t from-primary/10 to-transparent"
            ></div>
          ))}
        </div>
        {/* background bars */}

        <div className="flex flex-col justify-center gap-8 p-[2rem] max-sm:px-[1rem]">
          <h1 className="text-5xl font-bold tracking-tight text-pretty">
            Build stunning websites with less effort
          </h1>
          <p className="text-primary/70 text-lg">
            <span className="text-primary">Modern</span>,{" "}
            <span className="text-primary">responsive</span>, and{" "}
            <span className="text-primary">customizable UI</span> components
            designed for Next.js. Copy, adapt, and make them uniquely yours.
          </p>
          <div className="flex items-center flex-wrap gap-2">
            <Link
              href="/docs/get-started"
              className="px-6 bg-primary text-primary-foreground py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/20"
            >
              Get Started
            </Link>
            <Link
              href="https://github.com/preetsuthar17/HextaUI"
              target="_blank"
              className="px-6 bg-gradient-to-b hover:bg-primary/10 transition-all py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/20"
            >
              <FaGithub /> Star on GitHub
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden w-[1200px] max-sm:w-[1000px] h-full p-8 mb-8 mt-8 rounded-xl">
          <Image
            src="https://i.imgur.com/20ay5tO.png"
            alt="Hero Image"
            width={1920}
            height={1080}
            quality={100}
            layout="responsive"
            className="translate-x-[10%] rounded-xl shadow-xl scale-[1.1]"
          />
        </div>
      </section>
    </>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  gradient,
}: {
  icon: any;
  title: string;
  description: string;
  gradient: string;
}) => {
  return (
    <div className="group relative p-6 border border-primary/10  backdrop-blur-sm overflow-hidden hover:border-primary/20 transition-all duration-300">
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center text-left gap-3 mb-4">
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
            <Icon size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        </div>
        <p className="text-primary/70 text-left text-sm text-">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: FaPaintBrush,
      title: "Endless Customization",
      description:
        "Transform components with your unique style. Every element is fully customizable with simple props and Tailwind classes.",
      gradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    },
    {
      icon: FaStar,
      title: "Stunning Components",
      description:
        "Modern, responsive UI components crafted for Next.js. Each piece is designed with attention to detail and performance.",
      gradient: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
    },
    {
      icon: FaCode,
      title: "Your Project, Your Code",
      description:
        "Copy, modify, and integrate components seamlessly. No complex dependencies or lock-in - just clean, efficient code.",
      gradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: FaBolt,
      title: "Lightning Fast",
      description:
        "Optimized for performance with minimal bundle size. Build fast, responsive websites without compromise.",
      gradient: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
    },
    {
      icon: FaMagic,
      title: "Dark Mode Ready",
      description:
        "Seamless dark mode support out of the box. Create beautiful experiences for all user preferences.",
      gradient: "bg-gradient-to-br from-violet-500/10 to-indigo-500/10",
    },
    {
      icon: FaRocket,
      title: "Production Ready",
      description:
        "Battle-tested components used in real-world applications. Deploy with confidence.",
      gradient: "bg-gradient-to-br from-red-500/10 to-pink-500/10",
    },
  ];

  return (
    <section className="border border-t-0 border-primary/10 max-w-[60rem] w-[90%] mx-auto relative overflow-hidden py-20">
      <div className="p-8 max-sm:p-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose HextaUI?</h2>
          <p className="text-primary/70 text-lg">
            Everything you need to build modern web applications
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const WallOfLove = () => {
  return (
    <section className="border  border-t-0 border-primary/10 max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden py-20">
      <div className="flex flex-col gap-8 p-8 max-sm:p-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Wall of Love</h2>
          <p className="text-primary/70 text-lg">
            Be the first one to tweet about HextaUI.
          </p>
        </div>

        <div className="flex items-center justify-center text-center">
          <div className="text-center text-primary/70">
            <Link
              className="px-6 bg-gradient-to-b hover:bg-primary/10 transition-all py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/20"
              href="https://twitter.com/intent/tweet?text=I%20love%20HextaUI%20%F0%9F%92%96%0A%0Ahttps%3A%2F%2Fhextaui.com&url="
            >
              <FaTwitter fill="#01a3f2" /> Share your experience
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="border border-t-0 border-primary/10 max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden py-20">
      {/* gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/10 opacity-80 to-transparent z-[-1]"></div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[30rem] bg-background rounded-full z-[-1] blur-[30px]"></div>
      {/* gradient */}

      {/* background bars */}
      <div className="flex items-center justify-between w-full h-fit absolute overflow-hidden bottom-0 skew-x-[-45deg] left-[10rem] z-[-1]">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="flex w-[2px] h-[30rem] bg-gradient-to-t from-primary/5 to-transparent"
          ></div>
        ))}
      </div>
      {/* background bars */}

      <div className="flex flex-col items-center justify-center gap-8 p-16 max-sm:p-8 text-center">
        <h2 className="text-4xl font-bold tracking-tight">
          Ready to build something amazing?
        </h2>
        <p className="text-primary/70 text-lg max-w-2xl">
          Join thousands of developers who are already using HextaUI to create
          stunning websites with less effort. Start building today!
        </p>
        <div className="flex items-center flex-wrap justify-center gap-4">
          <Link
            href="/docs/get-started"
            className="px-6 bg-primary text-primary-foreground py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/20"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/preetsuthar17/HextaUI"
            target="_blank"
            className="px-6 bg-gradient-to-b hover:bg-primary/10 transition-all py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/20"
          >
            <FaGithub /> Star on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center my-20">
      <Hero />
      <Features />
      <WallOfLove />
      <CTA />
    </main>
  );
}
