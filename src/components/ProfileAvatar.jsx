import { useDispatch } from "react-redux";
import { updateProfileUploadModalVisibility } from "../app/slice";
import { Avatar } from "@chakra-ui/react";

export default function ProfileAvater({ src }) {
  const dispatch = useDispatch();
  const handleClickOpenProfileModal = () => {
    dispatch(updateProfileUploadModalVisibility(true));
  };
  console.log(src, "src at profile avatar")

  return (
    <Avatar src={src} cursor={"pointer"} onClick={handleClickOpenProfileModal} />
  );
}
