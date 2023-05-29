import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../services/api/api";
import Comments from "./Comments";

export default function UserComments({ userId }) {
  const [comments, setComments] = useState(null);

  const fetchComments = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/comments/user/${userId}`);
      const result = await response.data;
      setComments(result.comments);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchComments(userId);
    }
  }, [userId]);

  return (
    <Comments comments={comments} forList={true} />
  );
};
