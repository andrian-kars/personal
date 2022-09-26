import { useIntl } from 'react-intl';
import { BucketOfBolts } from 'src/components/animation';
import s from './WorksPage.module.scss';

const works = Array.from([1, 2, 3, 4, 5, 6], (n) => ({
  nameId: `works.${n}.name`,
  descriptionId: `works.${n}.description`,
  technologiesId: `works.${n}.technologies`,
  photoId: `works.${n}.photo`,
  linkId: `works.${n}.link`,
}));

export const WorksPage = () => {
  const { formatMessage } = useIntl();

  return (
    <div className={s.works}>
      <BucketOfBolts />
      <div className={s.content}>
        {works.map(({ nameId, descriptionId, technologiesId, photoId, linkId }) => (
          <div
            key={nameId}
            style={{ backgroundImage: `url('${formatMessage({ id: photoId })}'` }}
            className={s.work}
          >
            <a
              href={formatMessage({ id: linkId })}
              target="_blank"
              rel="noreferrer"
              className={s.workContent}
            >
              <h3>{formatMessage({ id: nameId })}</h3>
              <p>{formatMessage({ id: technologiesId })}</p>
              <p>{formatMessage({ id: descriptionId })}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
