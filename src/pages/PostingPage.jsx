import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import PostingBox from '../features/post/PostingBox';
import BackButton from '../components/BackButton';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function PostingPage() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.app.token);

  useEffect(() => {
    if (token === "") {
      // if click 'ok' button, redirect to login page
      if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
        navigate("/login");
      }
    }
  }, [token]);

  return (
    <>
      <S.Container>
        {
          token &&
          <S.WithBackWrapper>
            <BackButton url={"/"} />
            <PostingBox />
          </S.WithBackWrapper>
        }
      </S.Container>
    </>
  );
}

const S = {
  Container: styled.div`
    /* margin-top: 70px; */
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