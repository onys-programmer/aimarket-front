import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export default function LogOutButton() {
  const navigate = useNavigate();

  const handleClickLogOut = () => {
    if (!localStorage.getItem("token")) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
    localStorage.removeItem("token");
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