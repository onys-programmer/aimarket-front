import { Avatar } from "@chakra-ui/react";
import styled from "@emotion/styled";

export default function Comment({ comment }) {
  return (
    <S.Container>
      <Avatar src="" />
      <p>{comment?.content}</p>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `,
}