import { Button } from "@chakra-ui/react";

export default function LogInButton() {
  return (
    <a href="/login">
      <Button variant='outline' colorScheme='gray' fontSize={{base: "12px", md: "14px"}}>
        로그인
      </Button>
    </a>
  );
};