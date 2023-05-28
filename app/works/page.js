import { BucketOfBolts } from "@components/animation";
import anilibria from "@public/images/projects/anilibria.jpg";
import htmlCoding from "@public/images/projects/html-coding.jpg";
import movie from "@public/images/projects/movie.jpg";
import personal from "@public/images/projects/personal.jpg";
import social from "@public/images/projects/social.jpg";
import solidaro from "@public/images/projects/solidaro.png";
import s from "./page.module.scss";

const works = [
  {
    nameId: "Movies",
    descriptionId:
      "Search bnameId, movies rating, saving a movie to favorites, detailed information about a movie...",
    technologiesId: "React | TypeScript | API",
    photoId: movie.src,
    linkId: "https://andrian-kars.github.io/movies",
  },
  {
    nameId: "Social",
    descriptionId: "Social Network, with lots of cool features",
    technologiesId: "React | TypeScript | API",
    photoId: social.src,
    linkId: "https://andrian-kars.github.io/social",
  },
  {
    nameId: "Anilibria",
    descriptionId: "Significantly improved the current website of anilibria.tv",
    technologiesId: "React | SCSS Modules | API",
    photoId: anilibria.src,
    linkId: "https://andrian-kars.github.io/anilibria-react",
  },
  {
    nameId: "This Website",
    descriptionId: "My Personal well build website",
    technologiesId: "Webpack | SCSS modules | React",
    photoId: personal.src,
    linkId: "https://andrian-kars.com/",
  },
  {
    nameId: "Solidaro",
    descriptionId: "Landing page for Solidaro Software Development company",
    technologiesId: "TypeScript | NextJs | SCSS modules",
    photoId: solidaro.src,
    linkId: "https://solidaro.com/",
  },
  {
    nameId: "Mavic",
    descriptionId: "Example of HTML Coding",
    technologiesId: "HTML | CSS | SASS | jQuerry",
    photoId: htmlCoding.src,
    linkId: "https://andrian-kars.github.io/mavic-2",
  },
];

export default function Works() {
  return (
    <div className={s.works}>
      <BucketOfBolts />
      <div className={s.content}>
        {works.map(
          ({ nameId, descriptionId, technologiesId, photoId, linkId }) => (
            <div
              key={nameId}
              style={{
                backgroundImage: `url(${photoId})`,
              }}
              className={s.work}
            >
              <a
                href={linkId}
                target="_blank"
                rel="noreferrer"
                className={s.workContent}
              >
                <h3>{nameId}</h3>
                <p>{technologiesId}</p>
                <p>{descriptionId}</p>
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
}
