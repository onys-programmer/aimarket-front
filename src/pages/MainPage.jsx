import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMainPosts } from '../app/slice';
import { BASE_URL } from '../services/api/api';
import { useNavigate } from 'react-router-dom';
import PostsGrid from '../components/PostsGrid.jsx';

export default function MainPage() {
  const dispatch = useDispatch();
  const mainPosts = useSelector((state) => state.app.mainPosts);
  const navigate = useNavigate();

  const fetchPosts = async (pageNum) => {
    const response = await axios.get(`${BASE_URL}/posts/`, {
      params: {
        page: 1, // 원하는 값으로 설정
        perPage: 30, // 원하는 값으로 설정
      },
    });
    const posts = response.data.posts;
    if (!posts) {
      alert('이미지를 불러오는데 실패하였습니다.');
      return;
    }
    dispatch(updateMainPosts(posts));
  }

  useEffect(() => {
    fetchPosts(0);
  }, []);

  const breakpointColumnsObj = {
    default: 7,
    1620: 5,
    1240: 3,
    700: 2,
    500: 1
  };

  const handleClickGoToPost = (postId) => {
    // console.log(postId)
    navigate(`/post/${postId}`);
  };

  return (
    <>
      <S.Container>
        <PostsGrid posts={mainPosts} />
      </S.Container >
    </>
  );
};

const S = {
  Container: styled.div`
    padding-top: 10px;
    width: 100%;
    max-width: 1740px;
    margin: 0 auto;
  `,
};
