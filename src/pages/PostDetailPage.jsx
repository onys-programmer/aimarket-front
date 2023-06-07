import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../services/api/api';
import styled from '@emotion/styled';
import BackButton from '../components/BackButton';
import { useParams } from 'react-router-dom';
import PostDetailBox from '../features/post/PostDetailBox';
import DeletePostButton from '../features/post/DeletePostButton';
import { EditIcon } from '@chakra-ui/icons';
import { Flex, Button } from '@chakra-ui/react';
import PostEditingBox from '../features/post/PostEditingBox';

export default function PostDetailPage() {
  const [post, setPost] = useState(null);
  const [boxState, setBoxState] = useState('default');
  const user = useSelector((state) => state.app.user);
  const [creator, setCreator] = useState('');
  const isOwner = creator?.id === user?.userId;
  console.log(isOwner, "isOwner")
  useEffect(() => {
    if (post) {
      setCreator(post.creator);
    }
  }, [post]);

  const fetchPost = async (postId) => {
    try {
      const res = await axios.get(`${BASE_URL}/posts/${postId}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  const { postId } = useParams();
  // console.log(postId, "postId")
  // const { postId } = param;

  useEffect(() => {
    fetchPost(postId)
      .then((res) => {
        setPost(res.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  const handleClickEditPost = () => {
    setBoxState('editing');
  };

  const handleClickCancelEditPost = () => {
    setBoxState('default');
  };

  return (
    <S.PostDetailPage>
      <S.Container>
        <S.WithBackWrapper>
          <Flex justifyContent="space-between" alignItems="center" gap={3}>
            <BackButton url={"/"} />
            {
              isOwner && boxState === 'editing' &&
              <Button
                color="#333333"
                marginLeft={"auto"}
                onClick={handleClickCancelEditPost}
              >
                취소
              </Button>
            }
            {
              isOwner && boxState !== 'editing' &&
              <EditIcon
                boxSize={9}
                cursor="pointer"
                color="#333333"
                marginLeft={"auto"}
                _hover={{ color: "#279df4" }}
                onClick={handleClickEditPost}
              />
            }
            {
              isOwner && boxState !== 'editing' ?
                <DeletePostButton post={post} />
                :
                <></>
            }
          </Flex>
          {
            boxState === 'editing' ?
              <PostEditingBox postId={postId} boxState={boxState} setBoxState={setBoxState} />
              :
              <PostDetailBox postId={postId} boxState={boxState} />
          }
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
    // smaller than mobile
    @media (max-width: 768px) {
      height: 175vh;
    }
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