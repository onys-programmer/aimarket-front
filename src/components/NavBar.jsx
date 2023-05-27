import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button } from '@chakra-ui/react';

export default function NavBar() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleClickGoHome = () => {
    navigate('/');
  };

  const handleClickGoPosting = () => {
    navigate('/posting');
  };

  return (
    <>
      <S.Container>
        <S.NavItem onClick={handleClickGoHome}>
          <S.SectionTitleEng>
            aimarket
          </S.SectionTitleEng>
        </S.NavItem>
        <li>
          <Button colorScheme='red' borderRadius={'24px'} onClick={handleClickGoPosting}>만들기</Button>
        </li>
        {
          token
            ?
            <S.NavItemAuth>
              <Button variant='outline' colorScheme='gray'>
                로그아웃
              </Button>
            </S.NavItemAuth>
            :
            <S.NavItemAuth>
              <a href="/login">
                <Button variant='outline' colorScheme='gray'>
                  로그인
                </Button>
              </a>
            </S.NavItemAuth>
        }
      </S.Container>
    </>
  );
}

const S = {
  Container: styled.ul`
    width: 100%;
    height: 70px; /* 104px */
    padding: 40px;
    background-color: #ffffff;
    font-family: 'Noto Sans KR', sans-serif;
    list-style: none;
    display: flex;
    justify-content: start;
    gap: 36px;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
  `,
  NavItem: styled.li`
    cursor: pointer;
  `,
  NavItemAuth: styled.li`
    margin-left: auto;
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