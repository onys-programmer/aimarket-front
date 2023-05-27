import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export default function LogInButton() {
  const navigate = useNavigate();

  const handleClickGoLogInPage = () => {
    navigate("/login");
  };

  return (
    <Button variant='outline' colorScheme='gray' onClick={handleClickGoLogInPage}>
      로그인
    </Button>
  );
};