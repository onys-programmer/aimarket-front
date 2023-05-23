import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>home</div>,
  },
  {
    path: '/about',
    element: <div>about</div>,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default router;
