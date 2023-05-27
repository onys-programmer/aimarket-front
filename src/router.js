import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PostingPage from './pages/PostingPage';
import PostDetailPage from './pages/PostDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/about',
    element: <div>about</div>,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/posting',
    element: <PostingPage />,
  },
  {
    path: '/post/:postId',
    element: <PostDetailPage />,
  }
]);

export default router;
