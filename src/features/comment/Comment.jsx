import { Avatar } from "@chakra-ui/react";
import axios from "axios";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../services/api/api";

export default function Comment({ comment }) {
  const [creator, setCreator] = useState(null);

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

  return (
    <S.Container>
      <Avatar src={creator?.image} size="sm" />
      <S.CreatorName>
        <p>{creator?.name}</p>
      </S.CreatorName>
      <S.CommentContent>
        <p>{comment?.content}</p>
      </S.CommentContent>
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
  `,
}