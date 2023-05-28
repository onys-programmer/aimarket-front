import { Button } from "@chakra-ui/react";

export default function LogInButton() {
  return (
    <a href="/login">
      <Button variant='outline' colorScheme='gray'>
        로그인
      </Button>
    </a>
  );
};