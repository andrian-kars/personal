"use client";
import { LightSaber, NightSky } from "@components/animation";
import { useState } from "react";
import s from "./page.module.scss";

// TODO: this whole component
const { hard, soft, languages } = {
  hard: [
    {
      skill: "App",
      level: 4,
      descriptionId: "Architecture, Optimization, Security",
    },
    {
      skill: "React.js, Redux",
      level: 5,
      descriptionId: "Created and managed lots of projects",
    },
    {
      skillId: "Programming",
      skill: "Programming",
      level: 4,
      descriptionId: "Paradigms, Patterns, Principles",
    },
    {
      skill: "JavaScript, TS",
      level: 5,
      descriptionId: "ES5/ES6+, Types, Interfaces, Abstractions",
    },
    {
      skill: "HTML, CSS",
      level: 5,
      descriptionId: "HTML Coding with features of SCSS/LESS",
    },
    { skill: "CI/CD", level: 4, descriptionId: "Linting, testing, deploying" },
    { skill: "Git", level: 4, descriptionId: "Environments: Github/Gitlab" },
    {
      skill: "Webpack, Gulp",
      level: 5,
      descriptionId: "Reducing build time, builds creation",
    },
    {
      skill: "jQuery",
      level: 3,
      descriptionId: "Partical usage supporting legacy Apps",
    },
    {
      skillId: "Protocols",
      skill: "Protocols",
      level: 4,
      descriptionId: "Http(s), Rest, Web Sockets",
    },
    {
      skill: "SDLC",
      level: 4,
      descriptionId: "Agile Scrum, Kanban. Waterfall",
    },
    {
      skillId: "Libraries",
      skill: "Libraries",
      level: 5,
      descriptionId: "Bootstrap, Axios, Formik, yup, etc.",
    },
  ],
  soft: [
    { descriptionId: "Adaptability" },
    { descriptionId: "Ability to fast-learning" },
    { descriptionId: "Analytical Understanding" },
    { descriptionId: "Attention to details" },
    { descriptionId: "Critical Thinking" },
    { descriptionId: "Good Communication & Teamwork" },
    { descriptionId: "Self-Confidence & Self-Motivation" },
    { descriptionId: "Stress Management & Patience" },
    { descriptionId: "Flexibility" },
  ],
  languages: [
    {
      skillId: "English",
      level: 3,
      descriptionId: "Fluent communication",
    },
    {
      skillId: "German",
      level: 2,
      descriptionId: "Lived to Germany for 4 years",
    },
    {
      skillId: "Japanese",
      level: 1,
      descriptionId: "Opening new horizons",
    },
  ],
};

export default function Skills() {
  const [areSabersActive, setAreSebersActive] = useState(false);

  const handleToggleSabers = () =>
    setAreSebersActive((prevState) => !prevState);

  return (
    <div className={s.skills}>
      <NightSky />
      <h2>
        My Hard and Soft &nbsp;
        <span onClick={handleToggleSabers}>Lightsabers</span>
      </h2>
      <p>
        if you are Force-sensitive you might be able to activate them
        <br />
        (try to click them or &quot;Lightsabers&quot; to activate all)
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
                skillName={skillId || skill}
                description={descriptionId}
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
                  skillName={skillId}
                  description={`${
                    level === 3 ? "C2" : level === 2 ? "C1+" : "A1"
                  }. ${descriptionId}`}
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
                    description={descriptionId}
                  />
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
