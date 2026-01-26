import { createMemoryRouter } from 'react-router-dom';
import App from '../app/App';
import AppShell from '../app/AppShell';
import { MySkillPage } from '../features/myskill';
import { SearchMemberPage } from '../features/search_member';

/**
 * アプリケーションのルート定義
 */
const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/main',
    element: <AppShell />,
    children: [
      {
        path: 'my-skills',
        element: <MySkillPage />,
      },
      {
        path: 'member-search',
        element: <SearchMemberPage />,
      },
    ],
  },
];

/**
 * アプリケーションルーターを作成
 */
export const createAppRouter = () => {
  return createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0,
  });
};
