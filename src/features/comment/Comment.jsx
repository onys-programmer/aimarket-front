import { Avatar } from "@chakra-ui/react";
import axios from "axios";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../services/api/api";
import DeleteCommentButton from "./DeleteCommentButton";

export default function Comment({ comment }) {
  const [creator, setCreator] = useState(null);
  const user = useSelector((state) => state.app.user);

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      const result = await response.data;
      setCreator(result.user);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchUser(comment?.creator);
  }, []);


  const requestDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/comments/${commentId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`
          }
        }
      );

      const result = await response.data;
      if (response?.status === 200) {
        alert('댓글이 삭제되었습니다.');
        window.location.reload();
      } else if (response?.status === 401) {
        alert('로그인 후 이용해주세요.');
      } else {
        alert('댓글 삭제에 실패하였습니다.');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleClickDeleteComment = (commentId) => {
    requestDeleteComment(commentId);
  };

  return (
    <S.Container>
      <Avatar src={creator?.image} size="sm" />
      <S.CreatorName>
        <p>{creator?.name}</p>
      </S.CreatorName>
      <S.CommentContent>
        <p>{comment?.content}</p>
      </S.CommentContent>
      <S.DeleteBtnWrapper>
        <DeleteCommentButton commentId={comment.id} onClickDeleteComment={handleClickDeleteComment} />
      </S.DeleteBtnWrapper>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    justify-content: start;
    gap: 12px;
    width: 100%;
  `,
  CreatorName: styled.div`
    padding: 3px;
    display: flex;
    align-items: start;
    > p: {
      font-size: 1vh;
      color: #EBEBEB;
    }
  `,
  CommentContent: styled.div`
    padding: 3px;
    margin-left: 8px;
    display: flex;
    align-items: center;
    overflow: auto;
    max-height: 250px;
    > p: {
      font-size: 1vh;
    };
  `,
  DeleteBtnWrapper: styled.div`
    display: flex;
    align-items: start;
    padding: 0.9vh;
    label: delete-btn-wrapper;
  `,
}