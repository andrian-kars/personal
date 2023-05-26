import { DeathStar } from "@components/animation";
import cvDocument from "@public/andrian-kars-cv.pdf";
import s from "./page.module.scss";

const currentYear = new Date().getFullYear();

const { aboutInfo, educationInfo, experienceInfo } = {
  aboutInfo: [
    { titleId: "Name", descriptionId: "Andrian Karsanashvili", type: "h1" },
    {
      titleId: "Experience",
      descriptionId: `${currentYear - 2019}+ years`,
    },
    { titleId: "Location", descriptionId: "L'viv, Ukraine" },
    { titleId: "LinkedIn & GitHub", descriptionId: "/andrian-kars" },
  ],
  educationInfo: [
    {
      titleId: "EPAM Senior SE Growth",
      descriptionId: "Senior Software Engineering",
      timeId: "2022",
    },
    {
      titleId: "Ivan Franko University",
      descriptionId: "Software Engineering",
      timeId: "2020 - 2022",
    },
    {
      titleId: "EPAM Front-End Winter",
      descriptionId: "Strong Junior Front-End Engineer",
      timeId: "2021",
    },
    {
      titleId: "React Way Of Samurai",
      descriptionId: "Junior Front-End Engineer",
      timeId: "2020",
    },
    {
      titleId: "JavaScript 30",
      descriptionId: "JavaScript quirks and features",
      timeId: "2019",
    },
    {
      titleId: "High School in Germany",
      descriptionId: "Associate Degree in Economics",
      timeId: "2016 - 2018",
    },
  ],
  experienceInfo: [
    {
      titleId: `EPAM Systems`,
      timeId: `Feb. 2021 – Till Now`,
      descriptionId: `Optimization of pipelines for faster builds. Reducing "webpack build" from 40 to 15-18 seconds. \n Application architecture creation. Refactoring already written code to use Redux, the connection of architecture levels, implementation of patterns. \n Reusable, optimized and clean components creation. \n Reordering the folder structure for easier understanding and navigation. \n Optimization of the application to load it quicker. When the app was starting, it had nine renders. After implementing my ideas, the number is one. \n To see more read my CV`,
      linkId: {
        textToMakeLink: `CV`,
        url: cvDocument,
      },
    },
    {
      titleId: `Freelance`,
      timeId: `Mar. 2019 - Feb. 2021`,
      descriptionId:
        "Daily communication with customers to fulfil their business requirements. \n Working with experienced engineers to develop complex React applications. \n Creating API endpoints with authorization. \n Development of several React applications from scratch to deployment. \n SEO optimization of HTML pages and React apps. \n Transforming HTML Coding template into WordPress theme. \n Developing modern HTML Coding websites, making them browser and device agnostic. \n",
      linkId: null,
    },
  ],
};

export default function About() {
  return (
    <div className={s.about}>
      <DeathStar />
      <div className={s.content}>
        <div className={s.left}>
          <div className={`${s.section} ${s.sectionAbout}`}>
            <h3>Me, Myself & I</h3>
            {aboutInfo.map((it) => {
              const title = it.titleId;
              const description = it.descriptionId;

              return (
                <div key={title} className={s.item}>
                  <div className={s.titleAbout}>
                    {title}:
                    {it.type === "h1" ? (
                      <h1 className={s.descriptionAbout}>{description}</h1>
                    ) : (
                      <span className={s.descriptionAbout}>{description}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={s.section}>
            <h3>Education</h3>
            <div className={s.items}>
              {educationInfo.map((it) => (
                <div key={it.titleId} className={s.item}>
                  <p className={s.title}>
                    {it.titleId}
                    <span className={s.time}>{it.timeId}</span>
                  </p>
                  <p className={s.description}>{it.descriptionId}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.section}>
            <h3>Experience</h3>
            <div className={s.items}>
              {experienceInfo.map((it) => (
                <div key={it.titleId} className={s.item}>
                  <p className={s.title}>
                    {it.titleId}
                    <span className={s.time}>{it.timeId}</span>
                  </p>
                  {it.descriptionId.split("\n").map((desc, i) => {
                    const textToMakeLink =
                      it.linkId && it.linkId.textToMakeLink;

                    return (
                      <p key={i} className={s.description}>
                        {textToMakeLink && desc.includes(textToMakeLink) ? (
                          <>
                            {desc.split(textToMakeLink)[0]}
                            <a
                              href={it.linkId.url}
                              target="_blank"
                              rel="noreferrer"
                              className={s.link}
                            >
                              {textToMakeLink}
                            </a>
                            {desc.split(textToMakeLink)[1]}
                          </>
                        ) : (
                          desc
                        )}
                      </p>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
