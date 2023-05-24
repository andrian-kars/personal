import { useIntl } from 'react-intl';
import me from 'src/assets/images/background/me.png';
import { NightSky } from 'src/components/animation';
import { TerminalLetters } from 'src/components/common';
import s from './HomePage.module.scss';
import { HomePageButtons } from './HomePageButtons';

const TYPING_SPEED = 120;

export const HomePage = () => {
  const { formatMessage } = useIntl();

  const p1 = formatMessage({ id: 'home.p.1' });
  const p2 = formatMessage({ id: 'home.p.2' });
  const p3 = formatMessage({ id: 'home.p.3' });
  const p4 = formatMessage({ id: 'home.p.4' });
  const homeDescription = formatMessage({ id: 'home.description' });

  return (
    <div className={s.whrapper}>
      <NightSky />
      <div className={s.content}>
        <h2>
          <p>
            <TerminalLetters textToType={p1} isBouncing={true} typingSpeed={TYPING_SPEED} />
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
                timeToWaitBeforeTyping={(p1.length + p2.length + 1) * TYPING_SPEED}
                isBouncing={true}
                typingSpeed={TYPING_SPEED}
              />
            </span>
          </p>
          <p>
            <TerminalLetters
              textToType={p4}
              timeToWaitBeforeTyping={(p1.length + p2.length + p3.length + 1) * TYPING_SPEED}
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
      <img src={me} alt="me" className={s.me} />
    </div>
  );
};
