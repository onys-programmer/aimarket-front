import { Text } from "@chakra-ui/react";

export default function FindPasswordButton() {
  return (
    <Text
      variant="outline"
      width="fit-content"
      height="fit-content"
      paddingLeft="12px"
      paddingTop="4px"
      justifyContent="center"
      alignItems="center"
      cursor={"pointer"}
      fontSize="1.3vh"
      color="#333333"
      fontWeight={400}
      _hover={{ color: "#219df4" }}
    >
      <a href="/find-password">
        비밀번호 찾기
      </a>
    </Text>
  );
}