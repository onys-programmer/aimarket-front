import styled from '@emotion/styled';
import { Input, Button, Stack, Card } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../../services/api/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileAvater from '../../components/ProfileAvatar';
import { updateProfileImage, updateProfileImageBase64 } from '../../app/slice';
import { convertBase64ToFile } from '../../utils/util';

export default function SignUpBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileImage = useSelector((state) => state.app.profileImage);
  const profileImageBase64 = useSelector((state) => state.app.profileImageBase64);

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [memorableDateInput, setMemorableDateInput] = useState('');
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

  const requestSignUp = async () => {
    const formData = new FormData();
    if (profileImageBase64) {
      const profileImageFile = convertBase64ToFile(profileImageBase64);
      formData.append('image', profileImageFile);
    }
    formData.append('name', nameInput);
    formData.append('email', emailInput);
    formData.append('password', passwordInput);
    formData.append('memorableDate', memorableDateInput);

    try {
      const response = await axios.post(`${BASE_URL}/users/signup`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      if (response.status === 201) {
        dispatch(updateProfileImage(""));
        dispatch(updateProfileImageBase64(""));
        alert('회원가입에 성공하였습니다.');
        navigate('/login');
      } else {
        alert(`회원가입에 실패하였습니다. ${JSON.stringify(response)}`);
      }
    } catch (error) {
      if (error.response.status === 302) {
        alert('이미 존재하는 이메일입니다.');
      } else if (error.response.status === 422) {
        alert('입력된 형식이 올바르지 않습니다.');
      } else {
        alert(error.message);
      }
    }
  };

  const onSubmit = () => {
    if (!nameInput) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (nameInput.length > 16) {
      alert('이름은 16자 이하로 입력해주세요.');
      return;
    }
    if (!emailInput) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (emailInput.indexOf('@') === -1) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    if (memorableDateInput.length === 0) {
      alert('기억에 남는 날짜를 입력해주세요. 비밀번호 찾기에 사용됩니다.');
      return;
    }
    if (!memorableDateInput.match(/^\d{8}$/)) {
      alert('기억에 남는 날짜는 8자리 숫자로 입력해주세요. (공백, 특수문자 제외)');
      return;
    };
    if (passwordInput.length < 6) {
      alert('비밀번호는 6자리 이상이어야 합니다.');
      return;
    }
    if (passwordInput !== passwordCheckInput) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      requestSignUp();
    }
  };

  const onEnterSubmit = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const onChangeMemorableDateInput = (e) => {
    setMemorableDateInput(e.target.value);
  };

  useEffect(() => {
    if (nameInput.length > 16) {
      if (window.confirm('이름은 16자 이하로 입력해주세요.')) {
        setNameInput(nameInput.substring(0, 16));
      }
    }
  }, [nameInput])

  useEffect(() => {
    if (memorableDateInput.length > 8) {
      if (window.confirm('기억에 남는 날짜는 8자리 숫자로 입력해주세요.')) {
        setMemorableDateInput(memorableDateInput.substring(0, 8));
      }
    }
  }, [memorableDateInput])

  return (
    <Card padding={'40px'} borderRadius={'8px'} width="90%" maxW={"334px"}>
      <S.TitleWrapper>
        <S.Title>AI Market</S.Title>
      </S.TitleWrapper>
      <S.ContentWrapper>
        <S.TitleWrapper>
          <S.Title>회원 가입</S.Title>
        </S.TitleWrapper>
        <Stack spacing={3} width="100%">
          <ProfileAvater src={profileImage} />
          <Input placeholder="이름" onChange={onChangeNameInput} />
          <Input placeholder="email" onChange={onChangeEmailInput} />
          <Stack spacing={1}>
            <Input type="number" placeholder="기억에 남는 날짜 ex)19990101" onChange={onChangeMemorableDateInput} value={memorableDateInput} />
            <S.MemorableDateNoti>* 비밀번호 찾기에 사용됩니다.</S.MemorableDateNoti>
          </Stack>
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
    width: 100%;
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
  MemorableDateNoti: styled.p`
    font-size: 1vh;
    color: #555555;
  `,
};