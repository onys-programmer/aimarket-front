import { useDispatch } from "react-redux";
import { deleteToken } from "../app/slice";
import { Button } from "@chakra-ui/react";

export default function LogOutButton() {
  const dispatch = useDispatch();

  const handleClickLogOut = () => {
    dispatch(deleteToken());
    // redirect to main page
    window.location.href = '/';
  };

  return (
    <div onClick={handleClickLogOut}>
      <Button variant='outline' colorScheme='gray'>
        로그아웃
      </Button>
    </div>
  );
};