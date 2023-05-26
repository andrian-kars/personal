"use client";
import { memo, useEffect, useState } from "react";
import s from "./Saber.module.scss";

export const LightSaber = memo(
  ({ isActive, skillName, saberColor, textColor, description }) => {
    const [isSaberActive, setIsSaberActive] = useState(isActive);

    useEffect(() => {
      setIsSaberActive(isActive);
    }, [isActive]);

    const handleSaverActiveChange = () =>
      setIsSaberActive((prevState) => !prevState);

    return (
      <div className={s.sabers}>
        <button
          onClick={handleSaverActiveChange}
          type="button"
          className={s.hilt}
        >
          {skillName ? skillName : "Yoda taught me"}
          <div className={s.switch}></div>
        </button>
        <div
          style={
            isSaberActive
              ? {
                  boxShadow: `0 0 5px #fff, 0 0 10px #fff, 0 0 15px ${saberColor}, 0 0 20px ${saberColor}, 0 0 35px ${saberColor}, 0 0 40px ${saberColor}`,
                }
              : {
                  boxShadow: `0 0 5px #fff, 0 0 10px #fff, 0 0 15px ${saberColor}`,
                }
          }
          className={isSaberActive ? `${s.saber} ${s.activated}` : s.saber}
        >
          <span style={{ color: textColor }}>{description}</span>
        </div>
      </div>
    );
  }
);
