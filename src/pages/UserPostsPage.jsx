import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../services/api/api';

import styled from '@emotion/styled';
import PostsGrid from '../components/PostsGrid';

export default function UserPostsPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  const fetchUser = async (userId) => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${userId}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const [posts, setPosts] = useState(null);

  const fetchPosts = async (userId) => {
    try {
      const res = await axios.get(`${BASE_URL}/posts/user/${userId}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts(userId)
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    fetchUser(userId)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <>
      <S.Container>
        <S.PageTitle>{user?.name}님의 포스트</S.PageTitle>
        <PostsGrid posts={posts} />
      </S.Container >
    </>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;
    width: 100%;
    max-width: 1740px;
    margin: 0 auto;
  `,
  PageTitle: styled.h1`
    font-size: 3vh;
  `,
};
