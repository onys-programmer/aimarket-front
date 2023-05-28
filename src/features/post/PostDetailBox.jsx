import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../services/api/api';
import { Card, Input, Flex, Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Comments from '../comment/Comments';
import { useSelector } from 'react-redux';

export default function PostDetailBox({ postId }) {
  const user = useSelector((state) => state.app.user);
  const [post, setPost] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [commentData, setCommentData] = useState({});

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

  const handleChangeCommentInput = (e) => {
    setCommentInput(e.target.value);
  };

  const handleEnterSubmitComment = (e) => {
    if (e.key === 'Enter') {
      handleSubmitComment(commentData);
    }
  };

  const handleSubmitComment = async (data) => {
    if (!commentInput) {
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/comments`, data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`
          }
        });

      const result = await response.data;

      if (response?.status === 200) {
        alert('댓글이 작성되었습니다.');
        setCommentInput('');
        fetchPost(postId);
      } else if (response?.status === 401) {
        alert('로그인 후 이용해주세요.');
      } else {
        alert(`댓글 작성에 실패하였습니다.${JSON.stringify(response)}`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleClickSubmitComment = () => {
    handleSubmitComment(commentData);
  };

  useEffect(() => {
    if (commentInput.length > 200) {
      alert('댓글은 200자 이내로 작성해주세요.');
      setCommentInput(commentInput.slice(0, 200));
      return;
    }
    setCommentData({
      content: commentInput,
      creator: user?.userId,
      postId: post?.id,
    });
  }, [commentInput]);

  return (
    <Card width='80vw' maxW={"1200px"} padding={'30px'} borderRadius={"24px"} height="fit-content">
      <Flex gap="30px">
        {
          post?.image ?
            <S.Image src={post?.image} />
            :
            <S.SkeletonImage />
        }
        <S.TextArea>
          <S.Title><h3>{post?.title}</h3></S.Title>
          <S.Description>{post?.description}</S.Description>
          <S.UserArea>
            <S.ProfileImage src={post?.creator?.image} />
            <S.UserName>{post?.creator?.name}</S.UserName>
          </S.UserArea>
          <S.CommentArea>
            <S.CommentAreaTitle>
              <h3>댓글</h3>
            </S.CommentAreaTitle>
            <Comments comments={post?.comments} />
          </S.CommentArea>
          {
            user?.userId &&
            <Flex gap="8px" marginTop="auto">
              <Input placeholder='댓글을 작성하세요.' onChange={handleChangeCommentInput} onKeyDown={handleEnterSubmitComment} value={commentInput} />
              <Button onClick={handleClickSubmitComment}>작성</Button>
            </Flex>
          }
        </S.TextArea>
      </Flex>
    </Card >
  );
};

const S = {
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
    display: flex;
    flex-direction: column;
    height: 66vh;
    gap: 24px;
    width: 100%;
  `,
  Title: styled.div`
    border-bottom: 2px solid #E2E8F0;
    padding: 8px 16px;
    > h3 {
      font-size: 22px;
    };
  `,
  Description: styled.div`
    height: fit-content;
    max-height: 30%;
    overflow: auto;
    border-radius: 16px;
    padding: 16px;
  `,
  UserArea: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
  `,
  ProfileImage: styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
  `,
  UserName: styled.div`
    padding: 8px;
    display: flex;
    align-items: center;
  `,
  CommentArea: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    gap: 8px;
    padding: 4px 8px;
  `,
  CommentAreaTitle: styled.div`
    border-bottom: 2px solid #E2E8F0;
    padding: 8px 16px;
    > h3 {
      font-size: 18px;
    };
  `,
};
