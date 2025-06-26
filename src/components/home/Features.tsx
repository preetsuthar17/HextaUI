import React from "react";
import { Brush, Star, Code, Wand, Rocket, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-center flex-col gap-4 p-4">
      <div className="icon">{icon}</div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      title: "Customizable",
      description: "Modify components with props and Tailwind classes.",
      icon: <Brush size={18} />,
    },
    {
      title: "Ready to Use",
      description: "Production-ready components out of the box.",
      icon: <Star size={18} />,
    },
    {
      title: "Copy & Paste",
      description: "Copy code directly into your project.",
      icon: <Code size={18} />,
    },
    {
      title: "Open Source",
      description: "Free to use and modify.",
      icon: <Rocket size={18} />,
    },
    {
      title: "Fast Development",
      description: "Build UIs faster with pre-built components.",
      icon: <Zap size={18} />,
    },
    {
      title: "Accessible",
      description: "Components work for everyone.",
      icon: <Wand size={18} />,
    },
  ];

  return (
    <>
      {" "}
      <section className="flex flex-col items-center justify-center gap-16 py-28 p-8 text-center px-4 w-full border-t">
        <div className="flex items-center justify-center gap-6 flex-col">
          <Badge variant="secondary" className="px-4 py-2">
            Features
          </Badge>{" "}
          <h2 className="text-4xl font-medium">Why use HextaUI?</h2>
          <p className="max-w-2xl mx-auto max-sm:text-sm text-muted-foreground">
            50+ components ready to copy and paste into your project.
          </p>
        </div>{" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="p-8 relative">
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
              {/* Faded bottom border */}
              {index < features.length - 1 && (
                <div className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-border to-transparent sm:hidden" />
              )}
              {index < features.length - 2 && (
                <div className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-border to-transparent hidden sm:block lg:hidden" />
              )}
              {index < 3 && (
                <div className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
              )}
              {/* Faded right border */}
              {index % 2 === 0 && index < features.length - 1 && (
                <div className="absolute right-0 top-4 bottom-4 w-[1.5px] bg-gradient-to-b from-transparent via-border to-transparent hidden sm:block lg:hidden" />
              )}
              {index % 3 !== 2 && (
                <div className="absolute right-0 top-4 bottom-4 w-[1.5px] bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />
              )}{" "}
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Copy components, customize them, and ship your product faster.
        </p>
      </section>
    </>
  );
};

export default Features;
