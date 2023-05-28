import { Stack } from '@chakra-ui/react';
import Comment from './Comment';

export default function Comments({ comments }) {
  // console.log(comments, "comments");
  return (
    <Stack>
      {
        comments?.map((comment) => {
          return (
            <Comment comment={comment} />
          );
        })
      }
    </Stack>
  );
}
