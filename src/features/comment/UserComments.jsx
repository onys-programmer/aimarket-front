import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../services/api/api";
import Comments from "./Comments";
import InfiniteScroll from "react-infinite-scroll-component";

export default function UserComments({ userId }) {
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [comments, setComments] = useState([]);

  const fetchComments = async (userId, pageNum) => {
    try {
      const response = await axios.get(`${BASE_URL}/comments/user/${userId}`, {
        params: {
          page: pageNum,
          perPage: 20,
        },
      });
      const { comments, isLastPage } = await response.data;

      if (isLastPage) {
        console.log("isLastPage");
        setHasMore(false);
      }

      setComments((prev) => prev.concat(comments));
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchComments(userId, 1);
    }
  }, [userId]);

  const fetchNextComments = () => {
    // console.log("fetchNextComments");
    fetchComments(userId, pageNum + 1);
    setPageNum(pageNum + 1);
  };

  return (
    <InfiniteScroll
      dataLength={comments.length}
      next={fetchNextComments}
      hasMore={hasMore}
      loader={<></>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          더 이상 댓글이 없습니다.
        </p>
      }
    >
      <Comments comments={comments} forList={true} />
    </InfiniteScroll>

  );
};
