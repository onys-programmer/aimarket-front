import styled from '@emotion/styled';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMainPosts, addMainPosts } from '../app/slice';
import { BASE_URL } from '../services/api/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostsGrid from '../components/PostsGrid.jsx';

export default function MainPage() {
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const mainPosts = useSelector((state) => state.app.mainPosts);

  const fetchPosts = async (pageNum) => {
    console.log(pageNum, "pagenum");
    const response = await axios.get(`${BASE_URL}/posts/`, {
      params: {
        page: pageNum, // 원하는 값으로 설정
        perPage: 20, // 원하는 값으로 설정
      },
    });
    const { posts, isLastPage } = response.data;
    if (!posts) {
      alert('이미지를 불러오는데 실패하였습니다.');
      return;
    }
    if (isLastPage) {
      setHasMore(false);
    }
    if (pageNum === 1) {
      dispatch(updateMainPosts(posts));
      return posts;
    } else {
      dispatch(addMainPosts(posts));
    }
    return posts;
  }

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const fetchNextPosts = async () => {
    await fetchPosts(pageNum + 1);
    // dispatch(addMainPosts(posts));
    setPageNum(pageNum + 1);
  };

  return (
    <>
      <S.Container>
        <InfiniteScroll
          dataLength={mainPosts.length}
          next={fetchNextPosts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center', color: 'white' }}>
              <b>Yay! You have seen them all</b>
            </p>
          }
        >
          <PostsGrid posts={mainPosts} />
        </InfiniteScroll>
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
