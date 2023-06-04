import styled from '@emotion/styled';
import { Button, Flex } from '@chakra-ui/react';
import LogOutButton from './LogOutButton';
import LogInButton from './LogInButton';
import { useSelector } from 'react-redux';

export default function NavBar() {
  const user = useSelector((state) => state.app.user);

  return (
    <>
      <S.Container>
        <a href='/'>
          <S.NavItem>
            <S.SectionTitleEng>
              aimarket
            </S.SectionTitleEng>
          </S.NavItem>
        </a>
        <li>
          <a href='/posting'>
            <Button
              colorScheme='red'
              borderRadius={'24px'}
              fontSize={{ base: "12px", md: "14px" }}
            >만들기</Button>
          </a>
        </li>
        {
          user?.token
            ?
            <Flex alignItems="center" gap="20px" marginLeft="auto">
              <a href='/mypage'>
                <S.MyPageIcon>
                  <S.NavItem>
                    <S.SectionTitleEng>
                      my page
                    </S.SectionTitleEng>
                  </S.NavItem>
                </S.MyPageIcon>
              </a>
              <S.NavItemAuth>
                <LogOutButton />
              </S.NavItemAuth>
            </Flex>
            :
            <S.NavItemAuth>
              <li>
                <a href='/signup'>
                  <Button
                    colorScheme='gray'
                    variant="outline"
                    fontSize={{ base: "12px", md: "14px" }}
                  >
                    회원 가입
                  </Button>
                </a>
              </li>
              <LogInButton />
            </S.NavItemAuth>
        }
      </S.Container>
    </>
  );
}

const S = {
  Container: styled.ul`
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 70px; /* 104px */
    padding: 40px;
    background-color: #ffffff;
    font-family: 'Noto Sans KR', sans-serif;
    list-style: none;
    display: flex;
    justify-content: start;
    gap: 36px;
    // for moblile
    @media (max-width: 768px) {
      gap: 12px;
      padding: 40px 16px;
    }
    align-items: center;
    border-bottom: 1px solid #eaeaea;
  `,
  NavItem: styled.li`
    cursor: pointer;
  `,
  NavItemAuth: styled.li`
    display: flex;
    margin-left: auto;
    gap: 16px;
  `,
  SectionTitleEng: styled.h2`
    font-family: 'League Spartan', sans-serif;
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  `,
  ParagraphSmallEng: styled.p`
    font-family: 'League Spartan', sans-serif;
    font-size: 14px;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  `,
  MyPageIcon: styled.div`
    margin-left: auto;
  `,
}