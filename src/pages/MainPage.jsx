import NavBar from '../components/NavBar';
import styled from '@emotion/styled';
import thumbnails from '../__fixtures__/thumbnails';
import ImageCard from '../components/ImageCard.jsx';
import Masonry from 'react-masonry-css';

export default function MainPage() {
  const thumbnailImages = thumbnails.map((thumbnail) => thumbnail.thumbnail);
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