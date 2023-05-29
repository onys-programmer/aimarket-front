import { useSelector } from "react-redux";
import { Avatar, Stack } from "@chakra-ui/react";
import styled from "@emotion/styled";

export default function ProfileBox() {
  const user = useSelector((state) => state.app.user);
  // console.log(user);
  return (
    <S.Container>
      <Stack alignItems="center">
        <Avatar src={user?.image} />
        <S.Name>
          {user?.name}
        </S.Name>
        <S.Email>
          {user?.email}
        </S.Email>
      </Stack>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
  `,
  Name: styled.p``,
  Email: styled.p``,
};
