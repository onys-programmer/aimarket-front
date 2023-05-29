import { Card, Stack, Input, Button } from "@chakra-ui/react"
import { useState } from "react"
import styled from "@emotion/styled";
import axios from "axios";
import { BASE_URL } from "../../services/api/api";

export default function FindPasswordBox() {
  const [emailInput, setEmailInput] = useState('')
  const [memorableDateInput, setMemorableDateInput] = useState('')

  const onChangeEmailInput = (e) => {
    setEmailInput(e.target.value);
  };

  const onChangeMemorableDateInput = (e) => {
    setMemorableDateInput(e.target.value);
  };

  const requestFindPassword = async () => {
    const data = {
      email: emailInput,
      memorableDate: memorableDateInput,
    };
    try {
      const response = await axios.post(`${BASE_URL}/users/find-password`,
        data,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      if (response.status === 200) {
        alert(`새 비밀번호는 ${response.data.password} 입니다.`);
      } else {
        alert(`올바른 정보인지 다시 확인해주세요. ${JSON.stringify(response)}`);
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert('존재하지 않는 이메일입니다.');
      } else if (error.response.status === 422) {
        alert('입력된 형식이 올바르지 않습니다.');
      } else {
        alert(`올바른 정보인지 다시 확인해주세요.`);
      }
    }
  };

  const onClickFindPassword = () => {
    requestFindPassword();
  };

  const onEnterFindPassword = (e) => {
    if (e.key === 'Enter') {
      requestFindPassword();
    }
  };

  return (
    <Card padding={'40px'} borderRadius={'8px'}>
      <S.Title>AI Market</S.Title>
      <S.ContentWrapper>
        <Stack spacing={3} width="100%">
          <S.TitleWrapper>
            <S.Title>비밀번호 찾기</S.Title>
          </S.TitleWrapper>
          <Input placeholder="email" onChange={onChangeEmailInput} />
          <Input type="number" placeholder="기억에 남는 날짜 ex)19990101" onChange={onChangeMemorableDateInput} onKeyDown={onEnterFindPassword} />
        </Stack>
      </S.ContentWrapper>
      <S.ButtonWrapper>
        <Button colorScheme='blue' variant='outline' onClick={onClickFindPassword}>
          입력
        </Button>
      </S.ButtonWrapper>
    </Card>
  )
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
    padding: 8px 8px 14px 8px;
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
    width: fit-content;
    height: min-content; /* 58px */
    padding: 10px 10px 10px 10px;
    overflow: hidden;
    position: relative;
    align-content: center;
    flex-wrap: nowrap;
    gap: 0;
    border-radius: 0px 0px 0px 0px;
  `,
};