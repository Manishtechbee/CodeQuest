import { createBrowserRouter } from 'react-router';
import { Landing } from './pages/Landing';
import { Auth } from './pages/Auth';
import { JudgeDashboard } from './pages/JudgeDashboard';
import { JudgeEvaluate } from './pages/JudgeEvaluate';
import { TeamDashboard } from './pages/TeamDashboard';
import { TeamProject } from './pages/TeamProject';
import { Leaderboard } from './pages/Leaderboard';
import { Quiz } from './pages/Quiz';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/auth',
    Component: Auth,
  },
  {
    path: '/judge',
    Component: JudgeDashboard,
  },
  {
    path: '/judge/teams',
    Component: JudgeEvaluate,
  },
  {
    path: '/team',
    Component: TeamDashboard,
  },
  {
    path: '/team/project',
    Component: TeamProject,
  },
  {
    path: '/leaderboard',
    Component: Leaderboard,
  },
  {
    path: '/quiz',
    Component: Quiz,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);