import NavBar from '../components/NavBar';
import styled from '@emotion/styled';

export default function MainPage() {
  return (
    <>
      <NavBar />
      <S.Container>
        <h1>aimarket</h1>
      </S.Container>
    </>
  );
}

const S = {
  Container: styled.div`
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
}