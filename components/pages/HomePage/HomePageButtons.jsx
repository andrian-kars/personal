"use client";
import s from "@app/page.module.scss";
import { ButtonTypeOne } from "@components/animation";
import { useEffectOnce } from "@hooks";
import cvDocument from "@public/andrian-kars-cv.pdf";
import { useState } from "react";

export const HomePageButtons = ({ timeToWaitBeforeShowing }) => {
  const [isTimeToShow, setIsTimeToShow] = useState(false);

  useEffectOnce(() => {
    setTimeout(() => setIsTimeToShow(true), timeToWaitBeforeShowing);
  });

  return (
    <div className={s.buttonsWrapper}>
      {isTimeToShow && (
        <div className={s.buttons}>
          <ButtonTypeOne
            href="https://www.linkedin.com/in/andrian-kars/"
            content="Get in touch"
          />
          <ButtonTypeOne href={cvDocument} content="My CV" />
          <ButtonTypeOne
            href="https://www.youtube.com/channel/UCEH5y2m_i1-dqnV0oQoJTPQ"
            content="Programming lessons"
          />
        </div>
      )}
    </div>
  );
};
