import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PostingPage from './pages/PostingPage';
import PostDetailPage from './pages/PostDetailPage';
import MyPage from './pages/MyPage';
import UserPostsPage from './pages/UserPostsPage';

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
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: `/:userId/posts`,
    element: <UserPostsPage />,
  }
]);

export default router;
