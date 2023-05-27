import { Card } from '@chakra-ui/react';
import styled from '@emotion/styled';

export default function ImageCard({ post }) {
  const thumbnailImage = post.thumbnail;
  return (
    <Card width={"236px"} height="fit-content" padding="4px" background={"none"} shadow={"none"}>
      <S.Thumbnail src={thumbnailImage} />
    </Card>
  );
}

const S = {
  Container: styled.div``,
  Thumbnail: styled.img`
    width: 100%;
    border-radius: 16px;
    cursor: pointer;
    &:hover {
      transition: 0.1s;
      opacity: 0.7;
    }
  `,
};