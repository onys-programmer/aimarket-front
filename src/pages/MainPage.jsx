import NavBar from '../components/NavBar';
import styled from '@emotion/styled';
import ImageCard from '../components/ImageCard.jsx';
import Masonry from 'react-masonry-css';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateThumbnailImages } from '../app/slice';
import { BASE_URL } from '../services/api/api';

export default function MainPage() {
  const dispatch = useDispatch();
  const thumbnailImages = useSelector((state) => state.app.thumbnailImages);

  const fetchPosts = async (pageNum) => {
    const response = await axios.get(`${BASE_URL}/posts/`, {
      params: {
        page: 1, // 원하는 값으로 설정
        perPage: 10, // 원하는 값으로 설정
      },
    });
    const posts = response.data.posts;
    console.log(posts);
    if (!posts) {
      alert('이미지를 불러오는데 실패하였습니다.');
      return;
    }
    const thumbnailImages = posts.map((post) => post.thumbnail);
    dispatch(updateThumbnailImages(thumbnailImages));
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

  return (
    <>
      <NavBar />
      <S.Container>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {
            thumbnailImages.map((thumbnailImage) => (
              <ImageCard thumbnailImage={thumbnailImage} />
            ))
          }
        </Masonry>
      </S.Container>
    </>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 1740px;
    margin: 0 auto;
  `,
}