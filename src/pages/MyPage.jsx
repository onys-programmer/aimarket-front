import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Stack } from "@chakra-ui/react";
import ProfileBox from "../features/my-page/ProfileBox";
import PostsBox from "../features/my-page/PostsBox";
import CommentsBox from "../features/my-page/CommentsBox";
import { useSelector } from "react-redux";
import { useEffect } from "react";


export default function MyPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);

  useEffect(() => {
    if (!user?.token) {
      navigate('/');
    }
  }, [user]);

  console.log(user);
  const handleClickGoToUserPosts = () => {
    if (user) {
      navigate(`/${user?.userId}/posts`);
    }
  };

  return (
    <>
      {
        user?.token &&
        <S.Container>
          <Stack alignItems="center" gap="20px">
            <ProfileBox />
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
    max-width: 1740px;
    margin: 0 auto;
    background-color: white;
    min-height: calc(100vh - 70px);
  `,
}
