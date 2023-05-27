import styled from '@emotion/styled';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import PostingBox from '../features/post/PostingBox';
import BackButton from '../components/BackButton';

export default function PostingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    alert('로그인이 필요합니다.');
    navigate('/login');
  }

  return (
    <>
      <NavBar />
      <S.Container>
        <S.WithBackWrapper>
          <BackButton url={"/"} />
          <PostingBox />
        </S.WithBackWrapper>
      </S.Container>
    </>
  );
}

const S = {
  Container: styled.div`
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  WithBackWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
}