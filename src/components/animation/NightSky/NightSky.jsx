import s from './NightSky.module.scss';

export const NightSky = () => (
  <div className={s.stars}>
    <div className={s.starsGroup1}></div>
    <div className={s.starsGroup2}></div>
    <div className={s.starsGroup3}></div>
    <div className={s.starsGroup4}></div>
    <div className={s.starsGroup5}></div>
    <div className={s.starsGroup6}></div>
  </div>
);
