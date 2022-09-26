import s from './Main.module.scss';
import { Route, Routes } from 'react-router';
import { NightSky } from 'src/components/animation';
import { AboutPage, HomePage, SkillsPage, WorksPage } from 'src/components/pages';
import { Navigation } from '../Navigation/Navigation';

export const Main = () => (
  <main className={s.app}>
    <div className={s.mobileBg}>
      <NightSky />
    </div>
    <Navigation />
    <div className={s.content}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/works" element={<WorksPage />} />
        {/* <Route path="*" element={<ErrorPage errorCode={ERROR_CODE_404} />} /> */}
      </Routes>
    </div>
  </main>
);
