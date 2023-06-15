import axios from "axios";

const BASE_URL = "https://aimarket.herokuapp.com/api";
// const BASE_URL = 'http://localhost:5000/api';

const fetchPostByIndex = async (index) => {
  try {
    const response = await axios.get(`/posts/index/${index}`);
    const responseData = response.data;
    return responseData.post;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
};

const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    const responseData = response.data;
    return responseData.user;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export { BASE_URL, fetchPostByIndex, fetchUser };
