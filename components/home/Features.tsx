"use client";

import {
  FaPaintBrush,
  FaCode,
  FaStar,
  FaRocket,
  FaBolt,
  FaMagic,
} from "react-icons/fa";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => {
  return (
    <div className="group relative p-6 border-l border-t  border-primary/10  backdrop-blur-xs overflow-hidden transition-all duration-300 grow aspect-video max-h-[10rem] flex flex-col justify-center">
      {/* Content */}
      <div className="relative z-10">
        <div className="flex opacity-60 items-center text-left gap-3 mb-4">
          <div>
            <Icon size={16} className="text-primary" />
          </div>
          <h3 className=" leading-tight">{title}</h3>
        </div>
        <p className="text-left font-medium">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: FaPaintBrush,
      title: "Endless Customization",
      description: "Fully customizable with props and Tailwind classes.",
    },
    {
      icon: FaStar,
      title: "Stunning Components",
      description: "Modern, responsive UI components for Next.js.",
    },
    {
      icon: FaCode,
      title: "Your Project, Your Code",
      description: "Copy, modify, and integrate with clean code.",
    },
    {
      icon: FaBolt,
      title: "Lightning Fast",
      description: "Optimized for performance and responsiveness.",
    },
    {
      icon: FaMagic,
      title: "Dark Mode Ready",
      description: "Seamless support for dark mode.",
    },
    {
      icon: FaRocket,
      title: "Production Ready",
      description: "Battle-tested components for real-world use.",
    },
  ];

  return (
    <section className="border border-t-0 pt-2 border-b border-primary/10 max-w-[60rem] w-[90%] mx-auto relative overflow-hidden bg-homecards">
      <div className="">
        <div className="flex items-center justify-center flex-col gap-4 my-24 px-2">
          <div>
            <h2 className="text-4xl font-bold mb-4 flex items-center gap-4 justify-center flex-wrap">
              Why Choose HextaUI?
            </h2>
            <p className="text-primary/70 text-lg mb-3  ">
              Everything you need to build modern web applications
            </p>
          </div>
        </div>
        {/* Features Grid */}
        <div className="flex flex-wrap">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
