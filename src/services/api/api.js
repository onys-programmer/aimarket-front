import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const fetchPostByIndex = async (index) => {
  try {
    const response = await axios.get(`/posts/index/${index}`);
    const responseData = response.data;
    return responseData.post;
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};

export { BASE_URL, fetchPostByIndex };

