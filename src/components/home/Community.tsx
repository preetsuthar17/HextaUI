import React from "react";
import { FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

const CommunityCard = ({
  title,
  description,
  icon,
  link,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  link: string;
  linkText: string;
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-8 border border-border rounded-ele transition-all duration-200 group hover:bg-accent"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="transition-colors text-muted-foreground">{icon}</div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm  leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </a>
  );
};

const Community = () => {
  const communityLinks = [
    {
      title: "Twitter",
      description: "Stay updated with latest releases, updates and features.",
      icon: <FaTwitter size={38} />,
      link: "https://twitter.com/preetsuthar17",
      linkText: "Follow @hextaui",
    },
    {
      title: "GitHub",
      description:
        "Report bugs, request features, and contribute to the project.",
      icon: <FaGithub size={38} />,
      link: "https://github.com/preetsuthar17/HextaUI",
      linkText: "View Repository",
    },
    {
      title: "Discord",
      description: "Join our community for support and discussions.",
      icon: <FaDiscord size={38} />,
      link: "https://discord.gg/hG4dkbMcZf",
      linkText: "Join Discord",
    },
  ];

  return (
    <>
      {" "}
      <section className="flex flex-col items-center justify-center gap-16 py-28 px-8 text-center w-full border-t">
        <div className="flex items-center justify-center gap-6 flex-col">
          <Badge variant="secondary" className="px-4 py-2">
            Community
          </Badge>{" "}
          <h2 className="text-4xl font-medium ">Join our community</h2>
          <p className="max-w-2xl mx-auto  max-sm:text-sm">
            Connect with developers and get support.
          </p>
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {communityLinks.map((community, index) => (
            <CommunityCard
              key={index}
              title={community.title}
              description={community.description}
              icon={community.icon}
              link={community.link}
              linkText={community.linkText}
            />
          ))}
        </div>
        <p className="text-sm  max-w-md text-muted-foreground">
          Get help, share feedback, and stay updated with the latest releases.
        </p>
      </section>
    </>
  );
};

export default Community;
