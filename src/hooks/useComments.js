import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateCurrentPostComments } from "../app/slice"
import { BASE_URL } from '../services/api/api';

const useFetchComments = (postId) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.app.currentPostComments);

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/comments/${postId}`);
      const result = await response.data;
      dispatch(updateCurrentPostComments(result.comments));
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return { comments, fetchComments };
};

export default useFetchComments;
