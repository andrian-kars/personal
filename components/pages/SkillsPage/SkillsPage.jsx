import { LightSaber, NightSky } from "@components/animation";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import s from "./SkillsPage.module.scss";

// TODO: this whole component
const { hard, soft, languages } = {
  hard: [
    { skill: "App", level: 4, descriptionId: "skills.app.description" },
    {
      skill: "React.js, Redux",
      level: 5,
      descriptionId: "skills.react.description",
    },
    {
      skillId: "skills.programming",
      skill: "Programming",
      level: 4,
      descriptionId: "skills.programming.description",
    },
    {
      skill: "JavaScript, TS",
      level: 5,
      descriptionId: "skills.js.description",
    },
    { skill: "HTML, CSS", level: 5, descriptionId: "skills.html.description" },
    { skill: "CI/CD", level: 4, descriptionId: "skills.ci/cd.description" },
    { skill: "Git", level: 4, descriptionId: "skills.git.description" },
    {
      skill: "Webpack, Gulp",
      level: 5,
      descriptionId: "skills.webpack.description",
    },
    { skill: "jQuery", level: 3, descriptionId: "skills.jQuery.description" },
    {
      skillId: "skills.protocols",
      skill: "Protocols",
      level: 4,
      descriptionId: "skills.protocols.description",
    },
    { skill: "SDLC", level: 4, descriptionId: "skills.sdlc.description" },
    {
      skillId: "skills.libraries",
      skill: "Libraries",
      level: 5,
      descriptionId: "skills.libraries.description",
    },
  ],
  soft: [
    { descriptionId: "skills.adaptability.description" },
    { descriptionId: "skills.fastLearning.description" },
    { descriptionId: "skills.analyticalUnderstanding.description" },
    { descriptionId: "skills.attentionToDetails.description" },
    { descriptionId: "skills.criticalThinking.description" },
    { descriptionId: "skills.goodCommunacation.description" },
    { descriptionId: "skills.selfConfidence.description" },
    { descriptionId: "skills.stressManagement.description" },
    { descriptionId: "skills.flexibility.description" },
  ],
  languages: [
    {
      skillId: "english",
      level: 3,
      descriptionId: "skills.english.description",
    },
    { skillId: "german", level: 2, descriptionId: "skills.german.description" },
    {
      skillId: "japanese",
      level: 1,
      descriptionId: "skills.japanese.description",
    },
  ],
};

export const SkillsPage = () => {
  const { formatMessage } = useIntl();

  const [areSabersActive, setAreSebersActive] = useState(false);

  const handleToggleSabers = () =>
    setAreSebersActive((prevState) => !prevState);

  return (
    <div className={s.skills}>
      <NightSky />
      <h2>
        <FormattedMessage id="skills.header.part1" />
        &nbsp;
        <span onClick={handleToggleSabers}>
          <FormattedMessage id="skills.header.part2" />
        </span>
      </h2>
      <p>
        <FormattedMessage id="skills.description.forceSensitive" />
        <br />
        <FormattedMessage id="skills.description.activateThem" />
      </p>
      <div className={s.content}>
        <div className={s.hardSkills}>
          {hard.map(({ skillId, skill, level, descriptionId }) => (
            <div key={skill} className={s.item}>
              <LightSaber
                saberColor={
                  level === 5 ? "#03cafc" : level === 4 ? "#ed0000" : "#eff222"
                }
                textColor={
                  level === 5 ? "#00b1dd" : level === 4 ? "#ed0000" : "#cccf14"
                }
                isActive={areSabersActive}
                skillName={skillId ? formatMessage({ id: skillId }) : skill}
                description={formatMessage({ id: descriptionId })}
              />
            </div>
          ))}
        </div>
        <div>
          <div className={s.hardSkills}>
            {languages.map(({ skillId, level, descriptionId }) => (
              <div key={skillId} className={s.item}>
                <LightSaber
                  saberColor={
                    level === 3 ? "#8d00c4" : level === 2 ? "#0000FF" : "#fff"
                  }
                  textColor={
                    level === 3 ? "#8d00c4" : level === 2 ? "#001F76" : "#000"
                  }
                  isActive={areSabersActive}
                  skillName={formatMessage({ id: skillId })}
                  description={`${
                    level === 3 ? "C2" : level === 2 ? "C1+" : "A1"
                  }. ${formatMessage({ id: descriptionId })}`}
                />
              </div>
            ))}
          </div>
          <div className={s.hardSkills}>
            {soft.map(({ descriptionId }) => (
              <div key={descriptionId} className={s.item}>
                {
                  <LightSaber
                    saberColor="#02d60d"
                    textColor="#00c00a"
                    isActive={areSabersActive}
                    description={formatMessage({ id: descriptionId })}
                  />
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
