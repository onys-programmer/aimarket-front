import { useNavigate } from 'react-router-dom';
import { Stack } from '@chakra-ui/react';
import Comment from './Comment';
import styled from '@emotion/styled';

export default function Comments({ comments, forList = false, isMine }) {
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
    <Stack gap="8px" height="100%" minH={forList ? "15vh" : "auto"} overflow="auto">
      {
        comments?.map((comment) => {
          return (
            forList ?
              <S.CommentRow onClick={() => handleClickGoToPost(comment)} key={Math.random()}>
                <Comment comment={comment} forList={forList} isMine={isMine} />
              </S.CommentRow>
              :
              <Comment comment={comment} forList={forList} isMine={isMine} key={Math.random()} />
          );
        })
      }
    </Stack >
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
