import axios from 'axios';

const BASE_URL = 'https://aimarket.herokuapp.com/api';

const api = axios.create({
  baseURL: BASE_URL,
});

const fetchPostByIndex = async (index) => {
  try {
    const response = await axios.get(`/posts/index/${index}`);
    const responseData = response.data;
    return responseData.post;
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};

export const deleteUser = async (userId) => {
  const data = { userId };
  try {
    const response = await api.delete(`/users`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export { BASE_URL, fetchPostByIndex, api };

