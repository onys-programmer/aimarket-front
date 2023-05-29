import { Button } from "@chakra-ui/react";

export default function PostsBox() {
  return (
    <Button
      variant="outline"
      borderRadius="16px"
      width="20vh"
      height="15vh"
      padding="24px"
      justifyContent="center"
      alignItems="center"
      cursor={"pointer"}
    >
      🌉 내 포스트
    </Button>
  );
}
