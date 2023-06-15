import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Stack, Text } from "@chakra-ui/react";
import ProfileBox from "../features/my-page/ProfileBox";
import PostsBox from "../features/my-page/PostsBox";
import CommentsBox from "../features/my-page/CommentsBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ChangePasswordBox from "../features/my-page/ChangePasswordBox";
import axios from "axios";
import { BASE_URL } from "../services/api/api";
import { logOut } from "../app/slice";

export default function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);

  useEffect(() => {
    if (!user?.token) {
      navigate('/');
    }
  }, [user, navigate]);

  // console.log(user);
  const handleClickGoToUserPosts = () => {
    if (user) {
      navigate(`/${user?.userId}/posts`);
    }
  };

  const requestDeleteUser = async (data) => {
    try {
      await axios.delete(`${BASE_URL}/users`, {
        data: data,
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(logOut());
    } catch (error) {
      alert("회원 탈퇴에 실패했습니다.");
      console.log(error);
    }
  };

  const handleClickConfirmDeleteUser = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      if (user?.userId) {
        const data = { userId: user?.userId };
        requestDeleteUser(data);
      } else {
        alert("현재 유저 정보가 없습니다. 다시 로그인해주세요.");
      }
    }
  }

  return (
    <>
      {
        user?.token &&
        <S.Container>
          <Stack alignItems="center" gap="20px">
            <ProfileBox />
            <ChangePasswordBox />
            <Text
              fontSize={"1.5vh"}
              _hover={{ color: "red" }}
              cursor={"pointer"}
              onClick={handleClickConfirmDeleteUser}
            >
              회원 탈퇴
            </Text>
            <div onClick={handleClickGoToUserPosts}>
              <PostsBox />
            </div>
            <CommentsBox userId={user?.userId} />
          </Stack>
        </S.Container>
      }
    </>
  );
}

const S = {
  Container: styled.div`
    padding-top: 70px;
    padding-bottom: 70px;
    width: 100%;
    margin: 0 auto;
    background-color: white;
    min-height: calc(100vh - 70px);
  `,
}
