import { Card, Flex, Stack, Input, Button, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../services/api/api';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

export default function PostingBox() {
  const token = localStorage.getItem('token');
  const [imageFile, setImageFile] = useState(null);
  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');
  const user = useSelector((state) => state.app.user);
  const navigate = useNavigate();

  const handleChangeTitle = (e) => {
    setTitleInput(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContentInput(e.target.value);
  };

  const postData = {
    title: titleInput,
    description: contentInput,
    image: imageFile,
    creator: user?.userId,
  };

  const requestPosting = async (data) => {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.ok) {
      navigate('/');
      return result;
    } else {
      alert(result.message);
      return false;
    }
  };

  const handleSubmit = () => {
    if (!token) {
      alert('로그인이 필요합니다.');
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


  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'image/jpg': [],
      'image/jpeg': [],
      'image/png': []
    }
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();
      formData.append('image', acceptedFiles[0]);
      setImageFile(formData);
    }
  }, [acceptedFiles]);

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));


  return (
    <Card width='80vw' maxW={"1200px"} height='80vh' padding={'30px'} borderRadius={"24px"}>
      <Flex height="100%" gap="36px">
        <S.DropZone {...getRootProps({ className: 'dropzone' })}>
          <section className="container" >
            <div>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
              <em>(Only *.jpg, *.jpeg and *.png images will be accepted)</em>
            </div>
            <aside>
              <h4>Accepted files</h4>
              <ul>{acceptedFileItems}</ul>
              <h4>Rejected files</h4>
              <ul>{fileRejectionItems}</ul>
            </aside>
          </section>
        </S.DropZone>
        <Stack width="100%" height="100%">
          <Input placeholder='제목' size="lg" onChange={handleChangeTitle} />
          <Textarea placeholder='내용' height="100%" onChange={handleChangeContent} />
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
    width: 100%;
    border: 1px solid #ddd;
    background-color: #fafafa;
    color: #7d7d7d;
    border-radius: 16px;
    padding: 30px;
    cursor: pointer;
  `,
};