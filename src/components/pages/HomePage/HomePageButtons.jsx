import { useState } from 'react';
import { useIntl } from 'react-intl';
import cvDocument from 'src/assets/andrian-kars-cv.pdf';
import { ButtonTypeOne } from 'src/components/animation';
import { useEffectOnce } from 'src/hooks';
import s from './HomePage.module.scss';

export const HomePageButtons = ({ timeToWaitBeforeShowing }) => {
  const { formatMessage } = useIntl();

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
            content={formatMessage({ id: 'home.getInTouch' })}
          />
          <ButtonTypeOne href={cvDocument} content={formatMessage({ id: 'home.myCv' })} />
          <ButtonTypeOne
            href="https://www.youtube.com/channel/UCEH5y2m_i1-dqnV0oQoJTPQ"
            content={formatMessage({ id: 'home.lessons' })}
          />
        </div>
      )}
    </div>
  );
};
