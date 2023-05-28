import styled from '@emotion/styled';
import BackButton from '../components/BackButton';
import { useParams } from 'react-router-dom';
import PostDetailBox from '../features/post/PostDetailBox';

export default function PostDetailPage() {
  const { postId } = useParams();
  console.log(postId, "postId")
  // const { postId } = param;

  return (
    <S.PostDetailPage>
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
    /* margin-top: 70px; */
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