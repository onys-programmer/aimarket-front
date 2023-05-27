import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";


export default function BackButton({ url }) {
  const navigate = useNavigate();
  const handleClickGoBack = () => {
    navigate(url);
  };

  return (
    <div onClick={handleClickGoBack}>
      <Button>Back</Button>
    </div>
  );
}
