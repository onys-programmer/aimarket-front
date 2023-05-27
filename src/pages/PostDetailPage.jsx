import styled from '@emotion/styled';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';
import { useParams } from 'react-router-dom';
import PostDetailBox from '../features/post/PostDetailBox';

export default function PostDetailPage() {
  const { postId } = useParams();
  console.log(postId, "postId")
  // const { postId } = param;

  return (
    <S.PostDetailPage>
      <NavBar />
      <S.Container>
        <S.WithBackWrapper>
          <BackButton url={"/"} />
          <PostDetailBox postId={postId} />
        </S.WithBackWrapper>
      </S.Container>
    </S.PostDetailPage>
  );
}

const S = {
  PostDetailPage: styled.div`
    display: flex;
    flex-direction: column;
  `,
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