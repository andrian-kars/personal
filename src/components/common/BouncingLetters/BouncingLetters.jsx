import { Fragment } from 'react';
import s from './BouncingLetters.module.scss';

export const BouncingLetters = ({ lettersToBounce }) => {
  const handleBounce = (e) => {
    if (!e.target.classList.contains(s.bounce)) {
      e.target.classList.add(s.bounce);
      setTimeout(function () {
        e.target.classList.remove(s.bounce);
      }, 1000);
    }
  };

  return (
    <span className={s.bouncingLetters}>
      {lettersToBounce.split('').map((letter, i) =>
        letter === ' ' ? (
          <Fragment key={i}>&nbsp;</Fragment>
        ) : (
          <span onMouseOver={handleBounce} key={i}>
            {letter}
          </span>
        ),
      )}
    </span>
  );
};
