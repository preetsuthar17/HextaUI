"use client";

import { useEffect, useState } from "react";

import { FaHeart } from "react-icons/fa";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
}

const Contributors = () => {
  const [stats, setStats] = useState<{
    stars: number;
    contributors: Contributor[];
  }>({ stars: 0, contributors: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch repository stats
        const repoResponse = await fetch(
          "https://api.github.com/repos/preetsuthar17/HextaUI"
        );
        const repoData = await repoResponse.json();

        // Fetch contributors
        const contributorsResponse = await fetch(
          "https://api.github.com/repos/preetsuthar17/HextaUI/contributors"
        );
        const contributorsData = await contributorsResponse.json();

        setStats({
          stars: repoData.stargazers_count,
          contributors: contributorsData,
        });
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-primary/70">
        Unable to fetch GitHub data at the moment
      </div>
    );
  }

  const displayedContributors = stats.contributors.slice(0, 10);
  const remainingContributors = Math.max(0, stats.contributors.length - 10);

  return (
    <section className="border border-t-0 border-primary/10 max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden py-20">
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

          <div className="flex flex-wrap items-center justify-center gap-4">
            {displayedContributors.map((contributor, index) => (
              <div key={contributor.id} className="group relative">
                <img
                  src={contributor.avatar_url}
                  alt={`${contributor.login}'s avatar`}
                  className="w-12 h-12 rounded-full border-2 border-primary/10 transition-transform duration-200 group-hover:scale-110"
                />
              </div>
            ))}
            {remainingContributors > 0 && (
              <div className="w-12 h-12 rounded-full border-2 border-primary/10 flex items-center justify-center bg-primary/5 font-medium">
                +{remainingContributors}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contributors;
