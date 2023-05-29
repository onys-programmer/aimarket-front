import styled from '@emotion/styled';
import { Input, Button, Stack, Card } from '@chakra-ui/react';
import { useState } from 'react';
import { BASE_URL } from '../../services/api/api';
import { useDispatch } from 'react-redux';
import { updateUser, updateToken } from '../../app/slice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FindPasswordButton from '../../components/FindPasswordButton';

export default function LoginBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // if enter key is pressed, submit
  const onEnterLogin = (e) => {
    if (e.key === 'Enter') {
      onClickLogin();
    }
  };

  const onChangeEmailInput = (e) => {
    setEmailInput(e.target.value);
  };

  const onChangePasswordInput = (e) => {
    setPasswordInput(e.target.value);
  };

  const requestLogin = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, data,
        {
          headers: { 'Content-Type': 'application/json' },
        });
      const result = await response.data;
      if (response?.status === 200) {
        dispatch(updateUser(result));
        dispatch(updateToken(result.token));
        alert('환영합니다. aimarket입니다.');
        navigate('/');
        return result.token;
      } else if (response?.status === 404) {
        alert('존재하지 않는 이메일입니다.');
      } else {
        alert(`로그인에 실패하였습니다.${JSON.stringify(response)}`);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert('비밀번호가 일치하지 않습니다.');
      } else if (error.response?.status === 404) {
        alert('존재하지 않는 이메일입니다.');
      } else {
        alert(error.message);
      }
    }
  };

  const onClickLogin = async () => {
    await requestLogin({
      email: emailInput,
      password: passwordInput,
    });
  };

  return (
    <Card padding={'40px'} borderRadius={'8px'}>
      <S.TitleWrapper>
        <S.Title>AI Market</S.Title>
      </S.TitleWrapper>
      <S.ContentWrapper>
        <S.TitleWrapper>
          <S.Title>Log in</S.Title>
        </S.TitleWrapper>
        <Stack spacing={3} width="100%">
          <Input placeholder="email" onChange={onChangeEmailInput} onKeyDown={onEnterLogin} />
          <Input placeholder="password" type="password" onChange={onChangePasswordInput} onKeyDown={onEnterLogin} />
        </Stack>
      </S.ContentWrapper>
      <S.ButtonWrapper>
        <Button colorScheme='blue' variant='outline' onClick={onClickLogin}>
          LOG IN
        </Button>
      </S.ButtonWrapper>
      <FindPasswordButton />
    </Card >
  );
}

const S = {
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