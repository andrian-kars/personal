import { NightSky } from "@components/animation";
import { Navigation } from "../Navigation/Navigation";
import s from "./Main.module.scss";

export const Main = ({ children }) => (
  <main className={s.app}>
    <div className={s.mobileBg}>
      <NightSky />
    </div>
    <Navigation />
    <div className={s.content}>{children}</div>
  </main>
);
