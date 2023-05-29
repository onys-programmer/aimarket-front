import { Card } from "@chakra-ui/react";
import styled from "@emotion/styled";
import UserComments from "../comment/UserComments";

export default function CommentsBox({ userId }) {
  return (
    <Card
      gap="20px"
      borderRadius="16px"
      width="100%"
      maxW="843px"
      height="fit-content"
      minH="250px"
      maxH="672px"
      padding="24px"
    >
      <S.BoxTitle>
        <h3>작성한 댓글</h3>
      </S.BoxTitle>
      <UserComments userId={userId} />
    </Card>
  );
}

const S = {
  BoxTitle: styled.div`

  `,
}