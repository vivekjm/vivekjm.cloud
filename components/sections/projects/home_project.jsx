// Section structure
import Section from "../../structure/section";
import Container from "../../structure/container";

import Image from "next/image";

import Icon from "../../utils/icon.util";
import content from "../../../content/projects/featured.json";
import css from "../../../styles/sections/projects/recent.module.scss";
import SectionTitle from '../../blocks/section.title.block'

export default function HomeProjects({ repos, user }) {
  return (
    <Section classProp={css.section}>
      <Container classProp={css.container} spacing={"verticalXXXLrg"}>
        <SectionTitle
          title="Recent Projects"
          preTitle="UX and Full Stack"
          subTitle="Focused on the experience, driven by the engineering."
        />
        <div className={css.projects}>
          {content.map(
            (
              {
                project,
                description,
                topics,
                forks_count,
                html_url,
                language,
                watchers,
                homepage,
                pushed_at,
                date
              },
              index
            ) => (
              <article key={index} className={css.project}>
                <span className={css.header}>
                  <div className={css.header}>
                    <h3 className="highlight">{project}</h3>
                    <a href={html_url} rel="noreferrer" target="_blank">
                      <Icon icon={['far', 'arrow-up-right-from-square']} />
                    </a>
                    <span className={css.privateOr}></span>
                  </div>
                  <p className={css.homepage}>{homepage}</p>
                </span>
                <span className={css.descriptionContainer}>
                  <p className={css.description}>{description}</p>
                </span>
                <span className={css.details}>
                  <p>
                    <i className={`devicon-typescript-plain colored`} /> Typescript
                  </p>
                  <p>
                    <i className={`devicon-kotlin-plain colored`} /> Kotlin
                  </p>
                  <p>
                    <i className={`devicon-swift-plain colored`} /> Swift
                  </p>
                  <p className={css.pushedAt}>{date}</p>
                </span>
                <span className={css.topicsContainer}>
                  <span key={index} className={css.topics}>
                    <i className="devicon-github-plain"></i> Private
                  </span>
                </span>
              </article>
            )
          )}
        </div>
        {/*<pre>{JSON.stringify(user, undefined, 2)}</pre>
        <pre>{JSON.stringify(repos, undefined, 2)}</pre>*/}
      </Container>
    </Section>
  );
}
