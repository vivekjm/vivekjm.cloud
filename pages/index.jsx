import Hero from "../components/sections/index/hero";
import Looking from "../components/sections/index/looking";
import About from "../components/sections/index/about";
import Technical from "../components/sections/index/technical";
import Career from "../components/sections/index/career";
import FeaturedProjects from "../components/sections/projects/featured";
import HomeProjects from "../components/sections/projects/home_project";
import Color from "../components/utils/page.colors.util";
import Recent 		from '../components/sections/articles/recent'
import colors from "../content/index/_colors.json";
import Articles 		from '../pages/articles/index'
import settings from "../content/_settings.json";
export default function HomePage({ user, repos ,mediumArticles}) {
  return (
    <>
      <Color colors={colors} />
      <Hero />
      {/* <Looking /> */}
      {/* <FeaturedProjects /> */}
      <HomeProjects user={user} repos={repos} />
      <About />
      {/* <Technical /> */}
    <Recent mediumArticles={mediumArticles}/>
    </>
  );
}




export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=59"
  );

  // Fetch GitHub user and repos
  const [gitUserRes, gitReposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${settings.username.github}`),
    fetch(`https://api.github.com/users/${settings.username.github}/repos`),
  ]);

  let [user, repos] = await Promise.all([
    gitUserRes.json(),
    gitReposRes.json(),
  ]);

  // Fetch Medium articles
  const mediumRSS = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${settings.username.medium}`);
  const mediumArticles = await mediumRSS.json();

  // Process GitHub user
  if (user.login) {
    user = [user].map(({  name,
        fork,
        description,
        forks_count,
        html_url,
        language,
        watchers,
        default_branch,
        homepage,
        pushed_at,
        topics, }) => ({
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
    }));
  }

  // Process GitHub repos
  if (repos.length) {
    repos = repos.map(/* Your existing mapping logic here */).filter(/* Your existing filtering logic here */);
    repos.sort((a, b) => b.timestamp - a.timestamp);
  }

  // Validate fetched data
  if (!repos || !user || !mediumArticles) {
    return { notFound: true };
  }

  // Return all props
  return { props: { repos, user, mediumArticles } };
}
