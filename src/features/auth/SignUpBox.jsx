import styled from '@emotion/styled';
import { Input, Button, Stack, Card } from '@chakra-ui/react';
import { useState } from 'react';
import { BASE_URL } from '../../services/api/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUpBox() {
  const navigate = useNavigate();
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordCheckInput, setPasswordCheckInput] = useState('');

  const onChangeNameInput = (e) => {
    setNameInput(e.target.value);
  };
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
    try {
      const response = await axios.post(`${BASE_URL}/users/signup`,
        data,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      if (response.status === 201) {
        alert('회원가입에 성공하였습니다.');
        navigate('/login');
      } else {
        alert(`회원가입에 실패하였습니다. ${JSON.stringify(response)}`);
      }
    } catch (error) {
      if (error.response.status === 302) {
        alert('이미 존재하는 이메일입니다.');
      } else {
        alert(error.message);
      }
    }
  };

  const onSubmit = () => {
    if (passwordInput !== passwordCheckInput) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      const data = {
        name: nameInput,
        email: emailInput,
        password: passwordInput,
      };
      requestSignUp(data);
    }
  };

  const onEnterSubmit = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

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
          <Input placeholder="이름" onChange={onChangeNameInput} />
          <Input placeholder="email" onChange={onChangeEmailInput} />
          <Input placeholder="비밀번호" type="password" onChange={onChangePasswordInput} />
          <Input placeholder="비밀번호 확인" type="password" onChange={onChangePasswordCheckInput} onKeyDown={onEnterSubmit} />
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