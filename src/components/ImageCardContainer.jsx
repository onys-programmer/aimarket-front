import { useState, useEffect } from 'react';
import ImageCard from "./ImageCard";

export default function ImageCardContainer({ index }) {
  const [post, setPost] = useState(null);

  useEffect(() => {

  }, []);

  if (!post) {
    return <div><ImageCard thumbnail={""} /></div>;
  }

  return (
    <ImageCard thumbnail={post.thumbnail} />
  );
}
