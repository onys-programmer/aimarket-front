import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../services/api/api';
import { Card, Input, Flex, Button, Textarea, Stack, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { EditIcon, SmallCloseIcon } from '@chakra-ui/icons';

export default function PostEditingBox({ postId, boxState, setBoxState }) {
  const user = useSelector((state) => state.app.user);
  const [post, setPost] = useState(null);
  const [titleInput, setTitleInput] = useState(post?.title);
  const [contentInput, setContentInput] = useState(post?.description);
  const [replaceImage, setReplaceImage] = useState(false);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'image/jpg': [],
      'image/jpeg': [],
      'image/png': []
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path} style={{ width: "50%" }}>
      {file.path} - {file.size} bytes
    </li>
  ));


  const fetchPost = async (postId) => {
    const response = await axios.get(`${BASE_URL}/posts/${postId}`);
    const post = response.data.post;
    if (!post) {
      alert('게시글을 불러오는데 실패하였습니다.');
      return;
    }
    setPost(post);
  }

  useEffect(() => {
    fetchPost(postId);
  }, [postId]);

  useEffect(() => {
    setTitleInput(post?.title);
    setContentInput(post?.description);
  }, [post]);

  const handleChangeTitleInput = (e) => {
    setTitleInput(e.target.value);
  };

  const handleChangeContentInput = (e) => {
    setContentInput(e.target.value);
  };

  const requestEditPost = async (data) => {
    const formData = new FormData();
    if (acceptedFiles.length > 0) {
      formData.append('image', acceptedFiles[0]);
    }

    if (!titleInput) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (titleInput > 50) {
      alert('제목은 50자 이내로 작성해주세요.');
      return;
    }

    if (contentInput > 500) {
      alert('내용은 500자 이내로 작성해주세요.');
      return;
    }

    formData.append('title', titleInput);
    formData.append('description', contentInput);
    try {
      const response = await axios.patch(`${BASE_URL}/posts/${post?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.token}`,
        },
      });

      await response.data;
      if (response?.status === 200) {
        setBoxState('default');
        window.location.reload();
      } else if (response?.status === 401) {
        alert('로그인 후 이용해주세요.');
      } else {
        alert('게시글 수정에 실패하였습니다.');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onEditPost = () => {
    if (!titleInput) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!contentInput) {
      alert('내용을 입력해주세요.');
      return;
    }
    const data = {
      title: titleInput,
      description: contentInput,
    }
    requestEditPost(data);
  };

  useEffect(() => {
    if (titleInput?.length > 50) {
      alert('제목은 50자 이내로 작성해주세요.');
      setTitleInput(titleInput.slice(0, 50));
      return;
    }
  }, [titleInput]);

  useEffect(() => {
    if (contentInput?.length > 500) {
      alert('내용은 500자 이내로 작성해주세요.');
      setContentInput(contentInput.slice(0, 500));
      return;
    }
  }, [contentInput]);

  const handleClickEditImage = () => {
    setReplaceImage(true);
  };

  const handleClickCancelEditImage = () => {
    setReplaceImage(false);
  };

  return (
    <Card width='90vw' maxW={"1200px"} padding={{ base: "16px", md: '30px' }} borderRadius={"24px"} height={{ base: "155vh", md: "76vh" }}>
      <Flex gap="30px" height="75vh" flexDir={{ base: "column", md: "row" }}>
        {
          boxState === 'editing' &&
            replaceImage ?
            <Stack width={"50%"}>
              <SmallCloseIcon
                boxSize={7}
                cursor="pointer"
                color="#333333"
                marginLeft={"auto"}
                _hover={{ color: "#279df4" }}
                onClick={handleClickCancelEditImage}
              />
              <S.DropZone {...getRootProps({ className: 'dropzone' })}>
                <section className="container" >
                  <div>
                    <input {...getInputProps()} />
                    <p>드래그 앤 드롭 혹은 클릭하여 파일을 올려주세요</p>
                    <em>(10mb 이내의 jpg, jpeg, png 파일만 가능합니다.)</em>
                  </div>
                  <aside>
                    <Text fontSize={"100%"}>올라간 파일</Text>
                    <Text fontSize={"150%"}>{acceptedFileItems}</Text>
                  </aside>
                </section>
              </S.DropZone>
            </Stack>
            :
            <S.ImageArea>
              {
                post?.image ?
                  <Stack justifyContent={"center"}>
                    <EditIcon
                      boxSize={7}
                      cursor="pointer"
                      color="#333333"
                      marginLeft={"auto"}
                      _hover={{ color: "#279df4" }}
                      onClick={handleClickEditImage}
                    />
                    <S.Image src={post?.image} />
                  </Stack>
                  :
                  <S.SkeletonImage />
              }
            </S.ImageArea>
        }
        {
          boxState === 'editing' &&
          <Stack width="50%" height="68vh">
            <Input size="lg" placeholder='제목을 입력하세요.' value={titleInput} onChange={handleChangeTitleInput} />
            <Textarea
              placeholder='내용을 입력하세요.'
              value={contentInput}
              height="100%"
              onChange={handleChangeContentInput}
              cols="20"
              wrap="hard"
            />
            <Button colorScheme="blue" onClick={() => onEditPost()}>수정</Button>
          </Stack>
        }
      </Flex>
    </Card >
  );
};

const S = {
  ImageArea: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    `,
  Image: styled.img`
    /* height: auto; */
    height: 68vh;
    max-height: 87vh;
    // smaller than mobile
    @media (max-width: 768px) {
      width: 100%;
      height: auto;
      height: fit-content;
    }
    object-fit: contain;
    border-radius: 16px;
  `,
  SkeletonImage: styled.div`
    height: 70vh;
    width: 100%;
    border-radius: 16px;
    background-color: #E2E8F0;
  `,
  TextArea: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 24px;
    width: 50%;
    height: 68vh;
    max-height: 68vh;
    @media (max-width: 768px) {
      height: fit-content;
      max-height: fit-content;
    }
    label: TextArea;
  `,
  Title: styled.div`
    border-bottom: 2px solid #E2E8F0;
    padding: 8px 16px;
    > h3 {
      font-size: 2vh;
    };
  `,
  Description: styled.div`
    height: fit-content;
    max-height: 20%;
    overflow: auto;
    border-radius: 16px;
    padding: 16px;
  `,
  UserArea: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
  `,
  ProfileImage: styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
  `,
  UserName: styled.div`
    padding: 8px;
    display: flex;
    align-items: center;
  `,
  CommentArea: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    gap: 8px;
    padding: 4px 8px;
    height: fit-content;
    max-height: 20.5vh;
    label: CommentArea;
  `,
  CommentListArea: styled.div`
    height: 100%;
  `,
  CommentAreaTitle: styled.div`
    border-bottom: 2px solid #E2E8F0;
    padding: 8px 16px;
    > h3 {
      font-size: 1.8vh;
    };
  `,
  DropZone: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    height: 92.3%;
    border: 1px solid #ddd;
    background-color: #fafafa;
    color: #7d7d7d;
    border-radius: 16px;
    padding: 30px;
    cursor: pointer;
  `,
};
