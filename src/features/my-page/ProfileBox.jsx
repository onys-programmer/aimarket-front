import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, Stack, Card } from "@chakra-ui/react";
import { updateProfileImage, updateProfileUploadModalVisibility, updateProfileImageBase64, updateUserProfileImage } from "../../app/slice";
import { convertBase64ToFile } from "../../utils/util";
import axios from "axios";
import { BASE_URL } from "../../services/api/api";
import styled from "@emotion/styled";
import ProfileAvater from "../../components/ProfileAvatar";
import { useEffect } from "react";
import { fetchUser } from "../../services/api/api";

export default function ProfileBox() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const profileImage = useSelector((state) => state.app.profileImage);
  const profileImageBase64 = useSelector((state) => state.app.profileImageBase64);

  const requestUpdateProfileImage = async () => {
    const formData = new FormData();
    if (profileImageBase64) {
      const profileImageFile = convertBase64ToFile(profileImageBase64);
      formData.append('image', profileImageFile);
    }
    formData.append('userId', user?.userId);

    try {
      const response = await axios.patch(`${BASE_URL}/users/change-profile-image`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.status === 200) {
        dispatch(updateUserProfileImage(profileImage));
        dispatch(updateProfileImage(""));
        dispatch(updateProfileImageBase64(""));
        alert('프로필 이미지가 변경되었습니다.');
        // refresh
        window.location.reload();
      }
    } catch (error) {
      alert('프로필 이미지 변경에 실패하였습니다.');
    }
  };

  const handleClickSaveProfileImage = () => {
    if (profileImageBase64) {
      requestUpdateProfileImage();
    } else {
      if (window.confirm("프로필이 삭제되고 기본 프로필로 전환됩니다.")) {
        requestUpdateProfileImage();
      }
    }
  };

  const handleClickOpenModal = () => {
    dispatch(updateProfileUploadModalVisibility(true));
  };

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      if (!user?.userId) return;
      try {
        const userRes = await fetchUser(user?.userId);
        dispatch(updateUserProfileImage(userRes?.image));
      } catch (error) {
        console.error('사용자 프로필 이미지 가져오기 오류:', error);
      }
    };

    fetchUserProfileImage();
  }, [dispatch, user?.userId]);

  return (
    <S.Container>
      <Stack alignItems="center">
        {
          profileImage ?
            <Card width="90%" maxW="400px" padding={3}>
              <Stack alignItems={"center"}>
                <Avatar src={profileImage} onClick={handleClickOpenModal} />
                <Button size={"sm"} onClick={handleClickSaveProfileImage} colorScheme="green">
                  저장
                </Button>
              </Stack>
            </Card>
            :
            <ProfileAvater src={user?.image} onClick={handleClickOpenModal} />
        }

        <S.Name>
          {user?.name}
        </S.Name>
        <S.Email>
          {user?.email}
        </S.Email>
      </Stack>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
  `,
  Name: styled.p``,
  Email: styled.p``,
};
