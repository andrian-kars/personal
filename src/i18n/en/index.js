import { common } from './common';
import { home } from './home';
import { skills } from './skills';
import { about } from './about';
import { works } from './works';

export default {
  ...common,
  ...about,
  ...home,
  ...skills,
  ...works,
};
