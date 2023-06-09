import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../services/api/api';
import { Button } from '@chakra-ui/react';

export default function DeletePostButton({ post }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);
  const [creator, setCreator] = useState('');
  const isOwner = creator?.id === user?.userId;

  useEffect(() => {
    if (post) {
      setCreator(post.creator);
    }
  }, [post]);

  const requestDeletePost = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response.status === 200) {
        alert('게시글이 삭제되었습니다.');
        navigate('/');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleClickDeletePost = () => {
    if (!isOwner) {
      alert('작성자만 삭제할 수 있습니다.');
      return;
    } else {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        requestDeletePost();
      }
    }
  };

  return (
    <>
      {
        isOwner ?
          <Button colorScheme='red' width="fit-content" onClick={handleClickDeletePost}>
            삭제
          </Button>
          :
          <></>
      }
    </>
  );
}
