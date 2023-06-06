import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../services/api/api';
import { Card, Input, Flex, Button, Avatar } from '@chakra-ui/react';
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
  }, [postId]);

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

      await response.data;

      if (response?.status === 200) {
        setCommentInput('');
        fetchPost(postId);
      } else if (response?.status === 401) {
        alert('로그인 후 이용해주세요.');
      } else {
        alert(`댓글 작성에 실패하였습니다.${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.log(error.message);
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
  }, [commentInput, post, user]);

  return (
    <Card width='90vw' maxW={"1200px"} padding={{ base: "16px", md: '30px' }} borderRadius={"24px"} height={{ base: "155vh", md: "76vh" }}>
      <Flex gap="30px" height="75vh" flexDir={{ base: "column", md: "row" }}>
        <S.ImageArea>
          {
            post?.image ?
              <S.Image src={post?.image} />
              :
              <S.SkeletonImage />
          }
        </S.ImageArea>
        <S.TextArea>
          <S.Title><h3>{post?.title}</h3></S.Title>
          <S.Description>
            {
              post?.description.split('\n').map((line, index) => (
                <Fragment key={index}>
                  {line}
                  <br />
                </Fragment>
              ))
            }
          </S.Description>
          <S.UserArea>
            <Avatar width="40px" height="40px" src={post?.creator?.image} />
            <S.UserName>{post?.creator?.name}</S.UserName>
          </S.UserArea>
          <S.CommentArea>
            <S.CommentAreaTitle>
              <h3>댓글</h3>
            </S.CommentAreaTitle>
            <S.CommentListArea>
              <Comments comments={post?.comments} />
            </S.CommentListArea>
            {
              user?.userId &&
              <Flex gap="8px" marginTop="auto">
                <Input placeholder='댓글을 작성하세요.' onChange={handleChangeCommentInput} onKeyDown={handleEnterSubmitComment} value={commentInput} />
                <Button onClick={handleClickSubmitComment}>작성</Button>
              </Flex>
            }
          </S.CommentArea>
        </S.TextArea>
      </Flex>
    </Card >
  );
};

const S = {
  ImageArea: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    `,
  Image: styled.img`
    /* height: auto; */
    height: 68vh;
    max-height: 87vh;
    // smaller than mobile
    @media (max-width: 768px) {
      width: 100%;
      height: auto;
      height: fit-content;
    }
    object-fit: contain;
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
    justify-content: start;
    gap: 24px;
    width: 100%;
    height: 68vh;
    max-height: 68vh;
    @media (max-width: 768px) {
      height: fit-content;
      max-height: fit-content;
    }
    label: TextArea;
  `,
  Title: styled.div`
    border-bottom: 2px solid #E2E8F0;
    padding: 8px 16px;
    > h3 {
      font-size: 2vh;
    };
  `,
  Description: styled.div`
    height: fit-content;
    max-height: 20%;
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
    height: fit-content;
    max-height: 20.5vh;
    label: CommentArea;
  `,
  CommentListArea: styled.div`
    height: 100%;
  `,
  CommentAreaTitle: styled.div`
    border-bottom: 2px solid #E2E8F0;
    padding: 8px 16px;
    > h3 {
      font-size: 1.8vh;
    };
  `,
};
