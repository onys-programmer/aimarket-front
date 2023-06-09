import { Card, Flex, Stack, Input, Button, Textarea, Text, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../services/api/api';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import axios from 'axios';

import styled from '@emotion/styled';

export default function PostingBox() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);
  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');
  const [imageTemp, setImageTemp] = useState('');

  const handleChangeTitle = (e) => {
    setTitleInput(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContentInput(e.target.value);
  };

  const requestPosting = async () => {
    const formData = new FormData();
    formData.append('image', acceptedFiles[0]);
    formData.append('title', titleInput);
    formData.append('description', contentInput);
    formData.append('creator', user.userId);

    try {
      const response = await axios.post(`${BASE_URL}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response.status === 200) {
        alert('게시글이 등록되었습니다.');
        navigate('/');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = () => {
    if (!user?.token) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!acceptedFiles[0]) {
      alert('이미지를 첨부해주세요.');
      return;
    }
    if (!titleInput || !contentInput) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    requestPosting({
      title: titleInput,
      content: contentInput,
    });
  };

  useEffect(() => {
    if (titleInput.length > 50) {
      alert('제목은 50자 이내로 작성해주세요.');
      setTitleInput(titleInput.slice(0, 50));
      return;
    }
  }, [titleInput]);

  useEffect(() => {
    if (contentInput.length > 500) {
      alert('내용은 500자 이내로 작성해주세요.');
      setContentInput(contentInput.slice(0, 500));
      return;
    }
  }, [contentInput]);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'image/jpg': [],
      'image/jpeg': [],
      'image/png': []
    },
    onDrop: acceptedFiles => {
      const profileImageTemp = URL.createObjectURL(acceptedFiles[0]);
      setImageTemp(profileImageTemp)
    }
  });

  // useEffect(() => {
  //   if (acceptedFiles.length > 0) {
  //     setImageFile(acceptedFiles[0]);
  //   }
  // }, [acceptedFiles]);

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  // const fileRejectionItems = fileRejections.map(({ file, errors }) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //     <ul>
  //       {errors.map(e => (
  //         <li key={e.code}>{e.message}</li>
  //       ))}
  //     </ul>
  //   </li>
  // ));


  return (
    <Card width='80vw' maxW={"1200px"} height='80vh' padding={'30px'} borderRadius={"24px"}>
      <Flex height="100%" gap="36px">
        <S.DropZone {...getRootProps({ className: 'dropzone' })}>
          <section className="container" >
            <div>
              <input {...getInputProps()} />
              <p>드래그 앤 드롭 혹은 클릭하여 파일을 올려주세요</p>
              <em>(10mb 이내의 jpg, jpeg, png 파일만 가능합니다.)</em>
            </div>
            <aside>
              <Text fontSize={"100%"}>올라간 파일</Text>
              <Image src={imageTemp} />
              <Text fontSize={"150%"}>{acceptedFileItems}</Text>
            </aside>
          </section>
        </S.DropZone>
        <Stack width="50%" height="100%">
          <Input placeholder='제목' size="lg" onChange={handleChangeTitle} value={titleInput} />
          <Textarea placeholder='내용' height="100%" onChange={handleChangeContent} value={contentInput} />
          <Button colorScheme='red' onClick={handleSubmit}>
            저장
          </Button>
        </Stack>
      </Flex>
    </Card>
  );
};

const S = {
  DropZone: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    border: 1px solid #ddd;
    background-color: #fafafa;
    color: #7d7d7d;
    border-radius: 16px;
    padding: 30px;
    cursor: pointer;
  `,
};