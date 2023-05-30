import { useState } from "react";
import { useSelector } from "react-redux";
import { Input, Flex, Button, Stack } from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "../../services/api/api";
import styled from "@emotion/styled";

export default function ChangePasswordBox() {
  const user = useSelector((state) => state.app.user);

  const [pageState, setPageState] = useState("default");
  const [passwordInput, setPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [newPasswordCheckInput, setNewPasswordCheckInput] = useState("");

  const handleChangePasswordInput = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleChangeNewPasswordInput = (e) => {
    setNewPasswordInput(e.target.value);
  };

  const handleChangeNewPasswordCheckInput = (e) => {
    setNewPasswordCheckInput(e.target.value);
  };

  const requestCheckPassword = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/check-password`, data,
        {
          headers: {
            'Authorization': 'Bearer ' + user?.token,
            'Content-Type': 'application/json',
          },
        });
      await response.data;
      if (response?.status === 200) {
        setPageState("changing");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert('비밀번호가 일치하지 않습니다.');
      } else if (error.response?.status === 404) {
        alert('존재하지 않는 유저입니다.');
      } else {
        alert('비밀번호를 다시 확인해주세요');
      }
    }
  };

  const handleClickSubmitPassword = () => {
    const data = {
      userId: user?.userId,
      password: passwordInput,
    };
    requestCheckPassword(data);
    setPageState("tryToChange");
  };

  const requestChangePassword = async (data) => {
    try {
      const response = await axios.patch(`${BASE_URL}/users/`, data,
        {
          headers: {
            'Authorization': 'Bearer ' + user?.token,
            'Content-Type': 'application/json',
          },
        });
      if (response?.status === 200) {
        alert('비밀번호 변경에 성공하였습니다.');
        setPageState("default");
      } else {
        alert('비밀번호 변경에 실패하였습니다.');
      }
    } catch (error) {
      alert('서버 오류: 비밀번호 변경에 실패하였습니다.');
    }
  };

  const submitNewPassword = () => {
    if (newPasswordInput !== newPasswordCheckInput) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (newPasswordInput.length < 6) {
      alert('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    if (passwordInput === newPasswordInput) {
      alert('새 비밀번호는 기존 비밀번호와 다르게 설정해주세요.');
      return;
    }

    const data = {
      userId: user?.userId,
      currentPassword: passwordInput,
      newPassword: newPasswordInput,
    };
    requestChangePassword(data);
  };

  const handleClickSubmitNewPassword = () => {
    submitNewPassword();
  };

  const handleEnterSubmitNewPassword = (e) => {
    if (e.key === 'Enter') {
      submitNewPassword();
    }
  };

  const handleClickTryToChangePassword = () => {
    setPageState("tryToChange");
  };

  return (
    <S.Container>
      {
        pageState === "default" &&
        (
          <S.ChangePasswordButton onClick={handleClickTryToChangePassword}>
            <p>비밀번호 변경</p>
          </S.ChangePasswordButton>
        )
      }
      {
        pageState === "tryToChange" &&
        (
          <Flex gap={2}>
            <Input
              type="password"
              placeholder="비밀번호"
              onChange={handleChangePasswordInput}
            />
            <Button onClick={handleClickSubmitPassword}>
              입력
            </Button>
          </Flex>
        )
      }
      {
        pageState === "changing" &&
        (
          <Stack>
            <Input
              type="password"
              placeholder="새 비밀번호"
              onChange={handleChangeNewPasswordInput}
            />
            <Input
              type="password"
              placeholder="새 비밀번호 확인"
              onChange={handleChangeNewPasswordCheckInput}
              onKeyDown={handleEnterSubmitNewPassword}
            />
            <Button onClick={handleClickSubmitNewPassword}>
              변경
            </Button>
          </Stack>
        )
      }
    </S.Container >
  );
};

const S = {
  Container: styled.div``,
  ChangePasswordButton: styled.div`
    &:hover {
      cursor: pointer;
      color: #279df4;
    },
  `,
};
