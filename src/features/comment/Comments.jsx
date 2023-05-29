import { useNavigate } from 'react-router-dom';
import { Stack } from '@chakra-ui/react';
import Comment from './Comment';
import styled from '@emotion/styled';

export default function Comments({ comments, forList = false }) {
  const navigate = useNavigate();

  const goToPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleClickGoToPost = (comment) => {
    if (forList) {
      goToPost(comment.post);
    }
  };

  return (
    <Stack gap="8px" maxH={forList ? "auto" : "15vh"} overflow="auto">
      {
        comments?.map((comment) => {
          return (
            <S.CommentRow onClick={() => handleClickGoToPost(comment)}>
              <Comment comment={comment} forList={forList} />
            </S.CommentRow>
          );
        })
      }
    </Stack>
  );
}

const S = {
  CommentRow: styled.div`
    cursor: pointer;
    width: 100%;
    &:hover {
      background-color: #f5f5f5;
    };
    border-radius: 4px;
  `,
};
