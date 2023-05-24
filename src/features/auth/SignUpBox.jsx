import styled from '@emotion/styled';
import { Input, Button, Stack, Card } from '@chakra-ui/react';
import { useState } from 'react';
import { BASE_URL } from '../../services/api/api';

export default function LoginBox() {

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordCheckInput, setPasswordCheckInput] = useState('');

  const onChangeEmailInput = (e) => {
    setEmailInput(e.target.value);
  };
  const onChangePasswordInput = (e) => {
    setPasswordInput(e.target.value);
  };
  const onChangePasswordCheckInput = (e) => {
    setPasswordCheckInput(e.target.value);
  };

  const requestSignUp = async (data) => {
    const response = await fetch(`${BASE_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    alert('회원가입이 완료되었습니다.', result);
  };

  const onSubmit = () => {
    if (passwordInput !== passwordCheckInput) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      requestSignUp({
        email: emailInput,
        password: passwordInput,
      });
    }
  };

  console.log(emailInput, passwordInput);

  return (
    <Card padding={'40px'} borderRadius={'8px'}>
      <S.TitleWrapper>
        <S.Title>AI Market</S.Title>
      </S.TitleWrapper>
      <S.ContentWrapper>
        <S.TitleWrapper>
          <S.Title>회원 가입</S.Title>
        </S.TitleWrapper>
        <Stack spacing={3} width="100%">
          <Input placeholder="email" onChange={onChangeEmailInput} />
          <Input placeholder="비밀번호" type="password" onChange={onChangePasswordInput} />
          <Input placeholder="비밀번호 확인" type="password" onChange={onChangePasswordCheckInput} />
        </Stack>
      </S.ContentWrapper>
      <S.ButtonWrapper>
        <Button colorScheme='blue' variant='outline' onClick={onSubmit}>
          회원 가입
        </Button>
      </S.ButtonWrapper>
    </Card >
  );
}

const S = {
  // Container: styled.div`
  //   box-sizing: border-box;
  //   width: 353px;
  //   height: min-content; /* 282px */
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  //   padding: 16px 16px 16px 16px;
  //   box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  //   overflow: visible;
  //   align-content: center;
  //   flex-wrap: nowrap;
  //   gap: 0;
  //   position: absolute;
  //   border-radius: 8px;
  //   border: 1px solid #e2e8f0;
  // `,
  ContentWrapper: styled.div`
    box-sizing: border-box;
    flex-shrink: 0;
    width: 254px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 8px 8px 8px 8px;
    overflow: hidden;
    position: relative;
    align-content: flex-start;
    flex-wrap: nowrap;
    border-radius: 0px 0px 0px 0px;
  `,
  TitleWrapper: styled.div`
    box-sizing: border-box;
    flex-shrink: 0;
    width: min-content; /* 71px */
    height: min-content; /* 32px */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4px 8px 4px 8px;
    overflow: hidden;
    position: relative;
    align-content: center;
    flex-wrap: nowrap;
    gap: 0;
    border-radius: 0px 0px 0px 0px;
  `,
  Title: styled.h3`
    flex-shrink: 0;
    width: auto; /* 46px */
    height: auto; /* 25px */
    white-space: pre;
    position: relative;
    font-weight: 600;
    font-style: normal;
    font-family: "League Spartan", sans-serif;
    color: #555555;
    font-size: 18px;
    letter-spacing: 0em;
    line-height: 1.4;
  `,
  ButtonWrapper: styled.div`
    box-sizing: border-box;
    flex-shrink: 0;
    width: 111px;
    height: min-content; /* 58px */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 10px 10px 10px;
    overflow: hidden;
    position: relative;
    align-content: center;
    flex-wrap: nowrap;
    gap: 0;
    border-radius: 0px 0px 0px 0px;
  `,
};