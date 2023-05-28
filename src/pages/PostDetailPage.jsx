import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../services/api/api';
import styled from '@emotion/styled';
import BackButton from '../components/BackButton';
import { useParams } from 'react-router-dom';
import PostDetailBox from '../features/post/PostDetailBox';
import DeletePostButton from '../features/post/DeletePostButton';

export default function PostDetailPage() {
  const [post, setPost] = useState(null);
  const fetchPost = async (postId) => {
    try {
      const res = await axios.get(`${BASE_URL}/posts/${postId}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  const { postId } = useParams();
  console.log(postId, "postId")
  // const { postId } = param;

  useEffect(() => {
    fetchPost(postId)
      .then((res) => {
        setPost(res.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <S.PostDetailPage>
      <S.Container>
        <S.WithBackWrapper>
          <S.ButtonsWrapper>
            <BackButton url={"/"} />
            <DeletePostButton post={post} />
          </S.ButtonsWrapper>
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
  ButtonsWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
}