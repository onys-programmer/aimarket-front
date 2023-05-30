import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../services/api/api';
import { Card, Input, Flex, Button, Textarea, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Comments from '../comment/Comments';
import { useSelector } from 'react-redux';

export default function PostDetailBox({ postId, boxState }) {
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
  }, [commentInput]);

  // when edit
  const [titleInput, setTitleInput] = useState(post?.title);
  const [contentInput, setContentInput] = useState(post?.description);

  useEffect(() => {
    setTitleInput(post?.title);
    setContentInput(post?.description);
  }, [post]);

  const handleChangeTitleInput = (e) => {
    setTitleInput(e.target.value);
  };

  const handleChangeContentInput = (e) => {
    setContentInput(e.target.value);
  };

  const requestEditPost = async (data) => {
    try {
      const response = await axios.patch(`${BASE_URL}/posts/${post?.id}`, data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`
          }
        }
      );

      const result = await response.data;
      if (response?.status === 200) {
        window.location.reload();
      } else if (response?.status === 401) {
        alert('로그인 후 이용해주세요.');
      } else {
        alert('게시글 수정에 실패하였습니다.');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onEditPost = () => {
    if (!titleInput) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!contentInput) {
      alert('내용을 입력해주세요.');
      return;
    }
    const data = {
      title: titleInput,
      description: contentInput,
    }
    requestEditPost(data);
  };

  const handleEnterEditPost = (e) => {
    if (e.key === 'Enter') {
      onEditPost();
    }
  };

  useEffect(() => {
    if (titleInput?.length > 50) {
      alert('제목은 50자 이내로 작성해주세요.');
      setTitleInput(titleInput.slice(0, 50));
      return;
    }
  }, [titleInput]);

  useEffect(() => {
    if (contentInput?.length > 500) {
      alert('내용은 500자 이내로 작성해주세요.');
      setContentInput(contentInput.slice(0, 500));
      return;
    }
  }, [contentInput]);

  return (
    <Card width='80vw' maxW={"1200px"} padding={'30px'} borderRadius={"24px"} height="76vh" maxH="76vh">
      <Flex gap="30px" height="75vh">
        <S.ImageArea>
          {
            post?.image ?
              <S.Image src={post?.image} />
              :
              <S.SkeletonImage />
          }
        </S.ImageArea>
        {
          boxState === 'default' &&
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
        }
        {
          boxState === 'editing' &&
          <Stack width="100%" height="68vh">
            <Input size="lg" placeholder='제목을 입력하세요.' value={titleInput} onChange={handleChangeTitleInput} />
            <Textarea
              placeholder='내용을 입력하세요.'
              value={contentInput}
              height="100%"
              onChange={handleChangeContentInput}
              onKeyDown={handleEnterEditPost}
            />
            <Button colorScheme="blue" onClick={() => onEditPost()}>수정</Button>
          </Stack>
        }
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
