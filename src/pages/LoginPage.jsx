import LoginBox from '../features/auth/LoginBox';
import MainTitle from '../components/MainTitle';
import styled from '@emotion/styled';

export default function LoginPage() {
  return (
    <S.Container>
      {/* <MainTitle /> */}
      <LoginBox />
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