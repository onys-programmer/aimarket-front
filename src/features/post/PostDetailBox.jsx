import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../services/api/api';
import { Card } from '@chakra-ui/react';
import styled from '@emotion/styled';

export default function PostDetailBox({ postId }) {
  const [post, setPost] = useState(null);

  const fetchPost = async (postId) => {
    const response = await axios.get(`${BASE_URL}/posts/${postId}`);
    const post = response.data.post;
    if (!post) {
      alert('게시글을 불러오는데 실패하였습니다.');
      return;
    }
    setPost(post);
  }

  useEffect(() => {
    fetchPost(postId);
  }, []);

  return (
    <Card width='80vw' maxW={"1200px"} padding={'30px'} borderRadius={"24px"} height="fit-content">
      <S.Stack>
        {
          post?.image ?
            <S.Image src={post?.image} />
            :
            <S.SkeletonImage />
        }
        <S.TextArea>
          <S.Title>{post?.title}</S.Title>
          <S.Description>{post?.description}</S.Description>
        </S.TextArea>
      </S.Stack>
    </Card >
  );
};

const S = {
  Stack: styled.div`
    display: flex;
  `,
  Image: styled.img`
    height: 70vh;
    border-radius: 16px;
  `,
  SkeletonImage: styled.div`
    height: 70vh;
    width: 100%;
    border-radius: 16px;
    background-color: #E2E8F0;
  `,
  TextArea: styled.div`
    width: 100%;
    padding: 0 50px;
  `,
  Title: styled.div``,
  Description: styled.div``,
};
