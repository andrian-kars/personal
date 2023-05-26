import s from './BucketOfBolts.module.scss';

export const BucketOfBolts = () => (
  <div className={s.BucketOfBolts}>
    <div className={s.starLayerClose}>
      <div className={`${s.smallStar} ${s.star0}`}></div>
      <div className={`${s.smallStar} ${s.star1}`}></div>
      <div className={`${s.smallStar} ${s.star2}`}></div>
      <div className={`${s.smallStar} ${s.star3}`}></div>
      <div className={`${s.smallStar} ${s.star4}`}></div>
      <div className={`${s.smallStar} ${s.star5}`}></div>
    </div>

    <div className={s.starLayerFar}>
      <div className={`${s.smallStar} ${s.star6}`}></div>
      <div className={`${s.smallStar} ${s.star7}`}></div>
      <div className={`${s.smallStar} ${s.star8}`}></div>
      <div className={`${s.smallStar} ${s.star9}`}></div>
      <div className={`${s.smallStar} ${s.star10}`}></div>
      <div className={`${s.smallStar} ${s.star11}`}></div>
    </div>

    <div className={s.falconContainer}>
      <div className={`${s.nose} ${s.noseLeft}`}></div>
      <div className={`${s.nose} ${s.noseRight}`}></div>
      <div className={s.engineGlow}></div>
      <div className={s.falconRear}></div>
      <div className={`${s.falconCircle} ${s.colorMain}`}></div>
      <div className={s.detailCircle}></div>
      <div className={s.turret}></div>
      <div className={`${s.holes} ${s.hole0}`}></div>
      <div className={`${s.holes} ${s.hole1}`}></div>
      <div className={`${s.holes} ${s.hole2}`}></div>
      <div className={`${s.holes} ${s.hole3}`}></div>
      <div className={s.falconBodyY}></div>
      <div className={s.falconBodyX}></div>
      <div className={s.cockpit}>
        <div className={s.windows}></div>
      </div>
      <div className={s.cockpitTube}></div>
      <div className={s.dish}></div>
      <div className={s.upperVents}></div>
      <div className={s.lowerVents}></div>
      <div className={s.glow}></div>
    </div>
  </div>
);
