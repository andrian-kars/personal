import { ButtonTypeOne } from 'src/components/animation';
import cvDocument from 'src/assets/andrian-kars-cv.pdf';
import { useIntl } from 'react-intl';
import s from './HomePage.module.scss';
import { useState } from 'react';
import { useEffectOnce } from 'src/hooks';

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
            href={'https://www.linkedin.com/in/andrian-kars/'}
            content={formatMessage({ id: 'home.getInTouch' })}
          />
          <ButtonTypeOne href={cvDocument} content={formatMessage({ id: 'home.myCv' })} />
        </div>
      )}
    </div>
  );
};
