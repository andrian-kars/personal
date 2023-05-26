import { NightSky } from "@components/animation";
import { TerminalLetters } from "@components/common";
import { HomePageButtons } from "@components/pages/HomePage/HomePageButtons";
import me from "@public/images/background/me.png";
import Image from "next/image";
import s from "./page.module.scss";

const TYPING_SPEED = 120;

const p1 = "Hi,";
const p2 = "I'm";
const p3 = "Andrian,";
const p4 = "Software Engineer";
const homeDescription = "Senior Front-End Developer / Mentor / Teacher";

export default function Home() {
  return (
    <div className={s.whrapper}>
      <NightSky />
      <div className={s.content}>
        <h2>
          <p>
            <TerminalLetters
              textToType={p1}
              isBouncing={true}
              typingSpeed={TYPING_SPEED}
            />
          </p>
          <p>
            <TerminalLetters
              textToType={p2}
              timeToWaitBeforeTyping={(p1.length + 1) * TYPING_SPEED}
              isBouncing={true}
              typingSpeed={TYPING_SPEED}
            />
            &nbsp;
            <span className={s.specialTextColor}>
              <TerminalLetters
                textToType={p3}
                timeToWaitBeforeTyping={
                  (p1.length + p2.length + 1) * TYPING_SPEED
                }
                isBouncing={true}
                typingSpeed={TYPING_SPEED}
              />
            </span>
          </p>
          <p>
            <TerminalLetters
              textToType={p4}
              timeToWaitBeforeTyping={
                (p1.length + p2.length + p3.length + 1) * TYPING_SPEED
              }
              isBouncing={true}
              typingSpeed={TYPING_SPEED}
            />
          </p>
        </h2>
        <p className={s.description}>
          <TerminalLetters
            textToType={homeDescription}
            timeToWaitBeforeTyping={
              (p1.length + p2.length + p3.length + p4.length + 1) * TYPING_SPEED
            }
            typingSpeed={TYPING_SPEED - 50}
          />
        </p>
        <HomePageButtons
          timeToWaitBeforeShowing={
            (p1.length + p2.length + p3.length + p4.length + 1) * TYPING_SPEED
          }
        />
      </div>
      <Image src={me.src} alt="me" className={s.me} width={730} height={980} />
    </div>
  );
}
