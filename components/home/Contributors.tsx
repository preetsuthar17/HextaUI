"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

import { FaHeart } from "react-icons/fa";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
}

const Contributors = () => {
  const [stats, setStats] = useState<{
    contributors: Contributor[];
  }>({ contributors: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        };

        const contributorsResponse = await fetch(
          "https://api.github.com/repos/preetsuthar17/HextaUI/contributors",
          { headers },
        );

        if (!contributorsResponse.ok) {
          throw new Error(`HTTP error! status: ${contributorsResponse.status}`);
        }

        const contributorsData = await contributorsResponse.json();

        if (!Array.isArray(contributorsData)) {
          throw new Error("Contributors data is not an array");
        }

        setStats({ contributors: contributorsData });
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className="border border-t-0 border-primary/10 max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden py-20 flex items-center justify-center">
        <div className="w-6 h-6 border-4 border-zinc-200 border-t-zinc-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-t-0 border-primary/10 max-w-[60rem] w-[90%] mx-auto relative overflow-hidden py-20 bg-homecards text-center justify-center items-center text-muted-foreground font-medium">
        <div className="flex items-center justify-center flex-col gap-2">
          <AlertTriangle className="text-destructive" />
          Unable to fetch Contributor data at the moment
        </div>
      </div>
    );
  }

  const displayedContributors = stats.contributors.slice(0, 10);
  const remainingContributors = Math.max(0, stats.contributors.length - 10);

  return (
    <section className="border border-t-0 border-primary/10 max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden py-20 bg-homecards">
      <div className="flex flex-col gap-8 p-8 max-sm:p-4">
        <div className="text-center">
          <div className=" flex items-center justify-center flex-col gap-4">
            <FaHeart className="text-primary text-3xl fill-red-500 " />
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Our Amazing Contributors
              </h2>
              <p className="text-primary/70 text-lg mb-8">
                Thank you to all the wonderful people who have contributed to
                HextaUI
              </p>
            </div>
          </div>

          {loading ? (
            <div className="w-6 h-6 border-4 border-zinc-200 border-t-zinc-500 rounded-full animate-spin"></div>
          ) : error ? (
            <div className="text-center py-20 text-primary/70">
              Unable to fetch GitHub data at the moment
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center -space-x-4">
              {displayedContributors.map((contributor, index) => (
                <div key={contributor.id} className="group relative">
                  <img
                    src={contributor.avatar_url}
                    alt={`${contributor.login}'s avatar`}
                    className="w-12 h-12 rounded-full border-4 border-background "
                  />
                </div>
              ))}
              {remainingContributors > 0 && (
                <div className="w-12 h-12 rounded-full border-4 border-background flex items-center justify-center bg-secondary font-medium z-1">
                  +{remainingContributors}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contributors;
