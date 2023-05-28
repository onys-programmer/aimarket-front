import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteToken } from "../app/slice";
import { Button } from "@chakra-ui/react";

export default function LogOutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickLogOut = () => {
    if (!localStorage.getItem("token")) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
    dispatch(deleteToken());
    navigate("/");
  };

  return (
    <div onClick={handleClickLogOut}>
      <Button variant='outline' colorScheme='gray'>
        로그아웃
      </Button>
    </div>
  );
};