import Hero from "../components/sections/index/hero";
import Looking from "../components/sections/index/looking";
import About from "../components/sections/index/about";
import Technical from "../components/sections/index/technical";
import Career from "../components/sections/index/career";
import FeaturedProjects from "../components/sections/projects/featured";
import HomeProjects from "../components/sections/projects/home_project";
import Color from "../components/utils/page.colors.util";

import colors from "../content/index/_colors.json";

import settings from "../content/_settings.json";
export default function HomePage({ user, repos }) {
  return (
    <>
      <Color colors={colors} />
      <Hero />
      {/* <Looking /> */}
      {/* <FeaturedProjects /> */}
      <HomeProjects user={user} repos={repos} />
      <About />
      <Technical />
      {/* <Career /> */}
    </>
  );
}

// This gets called on every request
export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=59"
  );

  const [gitUserRes, gitReposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${settings.username.github}`),
    fetch(`https://api.github.com/users/${settings.username.github}/repos`),
  ]);

  let [user, repos] = await Promise.all([
    gitUserRes.json(),
    gitReposRes.json(),
  ]);

  if (user.login) {
    user = [user].map(({ login, name, avatar_url, html_url }) => ({
      login,
      name,
      avatar_url,
      html_url,
    }));
  }

  if (repos.length) {
    repos = repos.map(
      ({
        name,
        fork,
        description,
        forks_count,
        html_url,
        language,
        watchers,
        default_branch,
        homepage,
        pushed_at,
        topics,
      }) => {
        const timestamp = Math.floor(new Date(pushed_at) / 1000);
        return {
          name,
          fork,
          description,
          forks_count,
          html_url,
          language,
          watchers,
          default_branch,
          homepage,
          timestamp,
          topics,
          pushed_at,
        };
      }
    );

    repos.sort((a, b) => b.timestamp - a.timestamp);

    repos = repos.filter((e, i) => {
      if (i < 8 && !e.topics.includes("github-config")) return e;
      return false;
    });
  }

  if (!repos || !user) {
    return { notFound: true };
  }

  return { props: { repos, user } };
}
