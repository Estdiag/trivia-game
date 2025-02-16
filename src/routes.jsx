import { lazy } from 'react';
import paths from './types/paths';
const Landing = lazy(() => import('./pages/Landing'));
const Game = lazy(() => import('./pages/Game'));
const Error = lazy(() => import('./pages/Error'));

const routes = [
  { path: paths.HOME, component: Landing },
  { path: paths.PLAY, component: Game },
  { path: '*', component: Error },
];

export default routes;
