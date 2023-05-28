import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../services/api/api';
import { Button } from '@chakra-ui/react';

export default function DeletePostButton({ post }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);
  const { creator } = post;

  const requestDeletePost = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${BASE_URL}/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
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
    if (creator !== user.userId) {
      alert('작성자만 삭제할 수 있습니다.');
      return;
    } else {
      requestDeletePost();
    }
  };

  return (
    <>
      {
        creator === user.userId ?
          <Button colorScheme='red' width="fit-content" onClick={handleClickDeletePost}>
            삭제
          </Button>
          :
          <></>
      }
    </>
  );
}
