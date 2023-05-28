import { Flex } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

export default function DeleteCommentButton({ onClickDeleteComment, commentId }) {
  return (
    <Flex alignItems="center" cursor="pointer">
      <SmallCloseIcon color="#565656" _hover={{ color: "red" }} onClick={() => onClickDeleteComment(commentId)} />
    </Flex>
  );
}
