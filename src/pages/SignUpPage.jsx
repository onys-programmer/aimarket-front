import SignUpBox from '../features/auth/SignUpBox';
import styled from '@emotion/styled';

export default function signUpPage() {
  return (
    <S.Container>
      <SignUpBox />
    </S.Container>
  );
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