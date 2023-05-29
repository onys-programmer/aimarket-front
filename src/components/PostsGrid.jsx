import styled from '@emotion/styled';
import ImageCard from '../components/ImageCard.jsx';
import Masonry from 'react-masonry-css';
import { useNavigate } from 'react-router-dom';

export default function PostsGrid({ posts }) {
  const navigate = useNavigate();

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
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {
            posts?.map((post) => (
              <div key={post.thumbnail} onClick={() => handleClickGoToPost(post.id)}>
                <ImageCard post={post} />
              </div>
            ))
          }
        </Masonry>
      </S.Container >
    </>
  );
}

const S = {
  Container: styled.div`
    padding-top: 10px;
    width: 100%;
    max-width: 1740px;
    margin: 0 auto;
  `,
};
