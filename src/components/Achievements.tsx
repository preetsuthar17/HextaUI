import React from "react";

interface AchievementProps {
  date: string;
  title: string;
  link?: string;
}

interface AchievementsComponentProps {
  achievements: AchievementProps[];
  title?: string;
}

const Achievements: React.FC<AchievementsComponentProps> = ({
  achievements,
  title = "Achievements",
}) => {
  return (
    <div className="font-mono not-prose">
      <h2 className="text-xl font-bold text-foreground mb-6">{title}</h2>
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                <span className="text-muted-foreground text-sm font-medium whitespace-nowrap">
                  {achievement.date}:
                </span>
                <div className="text-secondary-foreground text-sm leading-relaxed">
                  {achievement.link ? (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/50 hover:decoration-blue-300/50 transition-colors duration-200"
                    >
                      {achievement.title}
                    </a>
                  ) : (
                    <span>{achievement.title}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AchievementsComponent = () => {
  const achievementsList: AchievementProps[] = [
    {
      date: "25th June, 2025",
      title: "HextaUI crossed 200 stars on GitHub",
      link: "https://github.com/preetsuthar17/HextaUI",
    },
    {
      date: "16th June, 2025",
      title: "First HextaUI pro customer",
      link: "https://x.com/preetsuthar17/status/1936694237959241944",
    },
    {
      date: "11th June, 2025",
      title: "HextaUI crossed 150 stars on GitHub",
      link: "https://x.com/preetsuthar17/status/1932629080563720675",
    },
    {
      date: "4th June, 2025",
      title: "Started working on HextaUI v2",
      link: "https://github.com/preetsuthar17/HextaUI/pull/16",
    },
    {
      date: "15th May, 2025",
      title: "HextaUI crossed 100 stars on GitHub",
      link: "https://x.com/preetsuthar17/status/1922992543052202380",
    },
  ];

  return (
    <div className="text-foreground bg-background max-w-xl">
      <Achievements achievements={achievementsList} />
    </div>
  );
};
