import { Avatar, Textarea, Flex, Button } from "@chakra-ui/react";
import axios from "axios";
import styled from "@emotion/styled";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../services/api/api";
import DeleteCommentButton from "./DeleteCommentButton";
import { parseRelativeDate } from "../../utils/util";
import { EditIcon, ArrowBackIcon } from "@chakra-ui/icons";

export default function Comment({ comment, forList = false }) {
  const [creator, setCreator] = useState(null);
  const user = useSelector((state) => state.app.user);
  const [isOwner, setIsOwner] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (comment) {
      const isOwner = creator?._id === user?.userId && creator !== null && user !== null;
      setIsOwner(isOwner);
      // console.log(creator, user, isOwner, "isOwner")
    }
  }, [comment, creator, user]);

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
  }, [comment]);


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

      await response.data;
      if (response?.status === 200) {
        alert('댓글이 삭제되었습니다.');
        setIsDeleted(true);
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
  // console.log(comment);

  const createdAt = parseRelativeDate(comment?.createdAt);
  const updatedAt = comment?.updatedAt ? parseRelativeDate(comment?.updatedAt) : null;

  const [state, setState] = useState('default')
  const [contentInput, setContentInput] = useState(comment?.content)

  useEffect(() => {
    setContentInput(comment?.content)
  }, [comment?.content])

  const handleChangeContentInput = (e) => {
    setContentInput(e.target.value);
    adjustTextareaHeight();
  }

  const requestEditComment = (commentId, data) => {
    axios.patch(`${BASE_URL}/comments/${commentId}`, data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        }
      }
    ).then((response) => {
      const result = response.data;
      if (response?.status === 200) {
        comment.content = result.comment.content;
        setState('default');
      } else if (response?.status === 401) {
        alert('로그인 후 이용해주세요.');
      } else {
        alert('댓글 수정에 실패하였습니다.');
      }
    }).catch((error) => {
      alert(error.message);
    })
  };

  const onSaveComment = () => {
    const data = {
      content: contentInput
    };
    if (contentInput.length > 200) {
      alert('댓글은 200자 이내로 작성해주세요.')
      return;
    }
    requestEditComment(comment?._id, data);
  }

  const handleClickSaveComment = () => {
    onSaveComment();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setState('default')
    }
  };

  const textareaRef = useRef(null);


  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleClickCancelEdit = () => {
    setState('default');
  };

  return (
    <>
      {
        !isDeleted &&
        <S.Container>
          <Flex padding={{ base: "4px", md: "4px" }}>
            <Avatar src={creator?.image} width={{ base: "16px", md: "24px" }} height={{ base: "16px", md: "24px" }} />
          </Flex>
          <S.CreatorName>
            <S.Item>
              <p>{creator?.name}</p>
            </S.Item>
          </S.CreatorName>
          {
            state === 'default' &&
            <S.CommentContent>
              <S.Item>
                <p>{comment?.content}</p>
              </S.Item>
            </S.CommentContent>
          }
          {
            state === 'editing' &&
            <Textarea
              ref={textareaRef}
              size={"sm"}
              value={contentInput}
              onChange={handleChangeContentInput}
              onKeyDown={handleKeyDown}
            />
          }
          <S.UpdatedAt>
            <S.Item>
              <p>{updatedAt || createdAt}</p>
            </S.Item>
          </S.UpdatedAt>
          {
            !forList && isOwner && (
              <Flex>
                {
                  state === 'editing' &&
                  <Flex gap={"3px"}>
                    <Button
                      fontSize={"1.2vh"}
                      width={"fit-content"}
                      marginTop={"0.4vh"}
                      padding={"0.4vh 0.2vh"}
                      height={"fit-content"}
                      colorScheme="blue"
                      onClick={handleClickSaveComment}
                    >
                      저장
                    </Button>
                    <Button
                      fontSize={"1.2vh"}
                      width={"fit-content"}
                      marginTop={"0.4vh"}
                      padding={"0.4vh 0.2vh"}
                      height={"fit-content"}
                      onClick={handleClickCancelEdit}
                    >
                      취소
                    </Button>
                  </Flex>
                }
                <S.EditBtnWrapper>
                  {
                    state === 'default' &&
                    <EditIcon
                      color="#565656"
                      boxSize={3}
                      cursor={"pointer"}
                      _hover={{ color: "#279df4" }}
                      onClick={() => setState('editing')}
                    />
                  }
                </S.EditBtnWrapper>
                <S.DeleteBtnWrapper>
                  {
                    state === 'default' &&
                    <DeleteCommentButton commentId={comment.id} onClickDeleteComment={handleClickDeleteComment} />
                  }
                </S.DeleteBtnWrapper>
              </Flex>
            )
          }
        </S.Container>
      }
    </>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-beween;
    gap: 12px;
    width: 100%;
    @media (max-width: 768px) {
      gap: 6px;
    }
  `,
  Item: styled.div`
    padding-top: 0.4vh;
    display: flex;
    align-items: start;
  `,
  CreatorName: styled.div`
    /* padding: 3px; */
    width: 25%;
    * {
      font-size: 1.3vh;
      color: #666666;
    }

    @media (max-width: 768px) {
      * {
        font-size: 10px;
      }
    }
  `,
  CommentContent: styled.div`
    /* padding: 3px; */
    margin-left: 8px;
    overflow: auto;
    width: 100%;
    max-width: 500px;
    max-height: 250px;
    align-items: start;

    * {
      font-size: 1.3vh;
      color: #333333;
    }
    @media (max-width: 768px) {
      * {
        font-size: 10px;
      }
    }
  `,
  UpdatedAt: styled.div`
    padding-top: 0.2vh;
    width: 22%;
    align-items: start;
    * {
      font-size: 1vh;
      color: #666666;
    }
    @media (max-width: 768px) {
      width: 26%;
      * {
        font-size: 6px;
      }
    }
  `,
  DeleteBtnWrapper: styled.div`
    display: flex;
    align-items: start;
    padding: 0.7vh 0.2vh;
    label: delete-btn-wrapper;
  `,
  EditBtnWrapper: styled.div`
    display: flex;
    align-items: start;
    padding: 0.9vh 0.2vh;

  `,
}