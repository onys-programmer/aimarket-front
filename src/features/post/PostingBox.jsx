import { Card, Flex, Stack, Input, Button, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { BASE_URL } from '../../services/api/api';
import DropZone from './DropZone';

export default function PostingBox() {
  const token = localStorage.getItem('token');
  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  const handleChangeTitle = (e) => {
    setTitleInput(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContentInput(e.target.value);
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
    if (result) {
      return result;
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

  return (
    <Card width='80vw' maxW={"1200px"} height='80vh' padding={'30px'} borderRadius={"24px"}>
      <Flex height="100%" gap="36px">
        <DropZone />
        <Stack width="100%" height="100%">
          <Input placeholder='제목' size="lg" onChange={handleChangeTitle} />
          <Textarea placeholder='내용' height="100%" onChange={handleChangeContent} />
          <Button colorScheme='red'>
            저장
          </Button>
        </Stack>
      </Flex>
    </Card>
  );
};
