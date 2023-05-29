import FindPasswordBox from "../features/auth/FindPasswordBox"
import styled from "@emotion/styled"

export default function FindPassWordpage() {
  return (
    <S.Container>
      <FindPasswordBox />
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
}