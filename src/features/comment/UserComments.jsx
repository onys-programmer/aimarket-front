import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../services/api/api";
import Comments from "./Comments";

export default function UserComments({ userId }) {
  const user = useSelector((state) => state.app.user);
  const [creator, setCreator] = useState(null);
  const [comments, setComments] = useState([]);

  const isMine = creator?.userId === user?.userId;

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      const result = await response.data;
      setCreator(result.user);
      setComments(result.user.comments);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  return (
    <Comments comments={comments} forList={true} isMine={isMine} />
  );
};
