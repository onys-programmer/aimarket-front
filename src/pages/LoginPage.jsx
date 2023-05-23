import LoginBox from '../features/auth/LoginBox';
import styled from '@emotion/styled';

export default function LoginPage() {
  return (
    <S.Container>
      <LoginBox />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
}