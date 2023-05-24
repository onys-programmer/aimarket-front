import { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@chakra-ui/react';

export default function NavBar() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <S.Container>
      <li>
        <a href="/">
          <S.SectionTitleEng>
            aimarket
          </S.SectionTitleEng>
        </a>
      </li>
      {
        token
          ?
          <li>
            <Button variant='outline' colorScheme='gray'>
              로그아웃
            </Button>
          </li>
          :
          <li>
            <a href="/login">
              <Button variant='outline' colorScheme='gray'>
                로그인
              </Button>
            </a>
          </li>
      }
    </S.Container>
  );
}

const S = {
  Container: styled.ul`
    position: absolute;
    padding: 40px;
    font-family: 'Noto Sans KR', sans-serif;
    list-style: none;
    width: 100%;
    height: 70px; /* 104px */
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
  `,
  SectionTitleEng: styled.h2`
    font-family: 'League Spartan', sans-serif;
    font-size: 16px;
  `,
  ParagraphSmallEng: styled.p`
    font-family: 'League Spartan', sans-serif;
    font-size: 14px;
  `,
}