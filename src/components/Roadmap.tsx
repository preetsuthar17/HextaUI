import React from "react";

interface RoadmapProps {
  title: string;
  description: string;
  status: "completed" | "inProgress" | "notStarted" | "planned";
}

interface RoadmapComponentProps {
  items: RoadmapProps[];
  title?: string;
}

const Roadmap: React.FC<RoadmapComponentProps> = ({
  items,
  title = "Roadmap",
}) => {
  const getStatusColor = (status: RoadmapProps["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "inProgress":
        return "bg-blue-500";
      case "notStarted":
        return "bg-gray-500";
      case "planned":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: RoadmapProps["status"]) => {
    switch (status) {
      case "completed":
        return "done";
      case "inProgress":
        return "in progress";
      case "notStarted":
        return "not started";
      case "planned":
        return "planned";
      default:
        return "unknown";
    }
  };

  return (
    <div className="font-mono not-prose">
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center space-x-3">
              <div
                className={`w-2 h-2 rounded-full text-foreground ${getStatusColor(item.status)}`}
              ></div>
              <h3 className="text-lg font-medium">{item.title}</h3>
            </div>
            <div className="ml-6 space-y-1">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
              <p
                className={`text-xs font-medium ${
                  item.status === "completed"
                    ? "text-green-400"
                    : item.status === "inProgress"
                      ? "text-blue-400"
                      : item.status === "planned"
                        ? "text-yellow-400"
                        : "text-gray-400"
                }`}
              >
                {getStatusText(item.status)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RoadmapComponent = () => {
  const roadmapItems: RoadmapProps[] = [
    {
      title: "Foundation/Primitive Components",
      description: "A set of basic components for building UIs.",
      status: "completed",
    },
    {
      title: "Basic Theme presets",
      description: "A set of pre-defined themes for HextaUI.",
      status: "completed",
    },
    {
      title: "Navigation Menu",
      description: "A component to navigate through websites.",
      status: "inProgress",
    },
    {
      title: "Charts",
      description: "A component to render and plot charts.",
      status: "inProgress",
    },
    {
      title: "Theme builder v2",
      description: "Fully customizable theme builder for HextaUI.",
      status: "notStarted",
    },
    {
      title: "AI Block builder",
      description: "AI block builder using HextaUI components.",
      status: "planned",
    },
  ];

  return (
    <div className="text-foreground bg-background max-w-xl">
      <Roadmap items={roadmapItems} />
    </div>
  );
};
