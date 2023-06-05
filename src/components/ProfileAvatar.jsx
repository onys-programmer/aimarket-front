import { useDispatch } from "react-redux";
import { updateProfileUploadModalVisibility } from "../app/slice";
import { Avatar } from "@chakra-ui/react";
import { DEFAULT_PROFILE_IMAGE_URL } from "../static/constants";

export default function ProfileAvater({ src = DEFAULT_PROFILE_IMAGE_URL }) {
  const dispatch = useDispatch();
  const handleClickOpenProfileModal = () => {
    dispatch(updateProfileUploadModalVisibility(true));
  };

  return (
    <Avatar src={src} cursor={"pointer"} onClick={handleClickOpenProfileModal} />
  );
}
