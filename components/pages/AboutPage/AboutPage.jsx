import { DeathStar } from "@components/animation";
import { FormattedMessage, useIntl } from "react-intl";
import s from "./AboutPage.module.scss";

const { aboutInfo, educationInfo, experienceInfo } = {
  aboutInfo: [
    { titleId: "about.name", descriptionId: "name", type: "h1" },
    {
      titleId: "about.experience",
      descriptionId: "about.experience.description",
    },
    { titleId: "about.location", descriptionId: "location" },
    { titleId: "about.socials", descriptionId: "about.socials.description" },
  ],
  educationInfo: Array.from([1, 2, 3, 4, 5, 6], (n) => ({
    titleId: `about.education.${n}`,
    timeId: `about.education.${n}.time`,
    descriptionId: `about.education.${n}.description`,
  })),
  experienceInfo: Array.from([1, 2], (n) => ({
    titleId: `about.experience.${n}`,
    timeId: `about.experience.${n}.time`,
    descriptionId: `about.experience.${n}.description`,
    linkId:
      n === 4
        ? null
        : {
            textToMakeLink: `about.experience.${n}.textToMakeLink`,
            url: `about.experience.${n}.url`,
          },
  })),
};

export const AboutPage = () => {
  const { formatMessage } = useIntl();

  return (
    <div className={s.about}>
      <DeathStar />
      <div className={s.content}>
        <div className={s.left}>
          <div className={`${s.section} ${s.sectionAbout}`}>
            <h3>
              <FormattedMessage id="about.title.about" />
            </h3>
            {aboutInfo.map((it) => {
              const title = formatMessage({ id: it.titleId });
              const description = formatMessage({ id: it.descriptionId });

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
            <h3>
              <FormattedMessage id="about.title.education" />
            </h3>
            <div className={s.items}>
              {educationInfo.map((it) => (
                <div key={it.titleId} className={s.item}>
                  <p className={s.title}>
                    {formatMessage({ id: it.titleId })}
                    <span className={s.time}>
                      {formatMessage({ id: it.timeId })}
                    </span>
                  </p>
                  <p className={s.description}>
                    {formatMessage({ id: it.descriptionId })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.section}>
            <h3>
              <FormattedMessage id="about.title.experience" />
            </h3>
            <div className={s.items}>
              {experienceInfo.map((it) => (
                <div key={it.titleId} className={s.item}>
                  <p className={s.title}>
                    {formatMessage({ id: it.titleId })}
                    <span className={s.time}>
                      {formatMessage({ id: it.timeId })}
                    </span>
                  </p>
                  {formatMessage({ id: it.descriptionId })
                    .split("\n")
                    .map((desc, i) => {
                      const textToMakeLink =
                        it.linkId &&
                        formatMessage({ id: it.linkId.textToMakeLink });

                      return (
                        <p key={i} className={s.description}>
                          {textToMakeLink && desc.includes(textToMakeLink) ? (
                            <>
                              {desc.split(textToMakeLink)[0]}
                              <a
                                href={formatMessage({ id: it.linkId.url })}
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
};
