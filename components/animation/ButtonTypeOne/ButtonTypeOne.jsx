import s from './ButtonTypeOne.module.scss';

export const ButtonTypeOne = ({ href, content }) => (
  <a href={href} className={s.horizontal} target="_blank" rel="noreferrer">
    <span className={s.text}>{content}</span>
  </a>
);
