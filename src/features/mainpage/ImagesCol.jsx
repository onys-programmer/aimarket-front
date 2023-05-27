import styled from "@emotion/styled";
import ImageCard from "../../components/ImageCard";
import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchPostByIndex } from "../../services/api/api";

export default function ImagesCol({ colsNum, colNum }) {
  const [images, setImages] = useState([]);
  const [endCardIndex, setEndCardIndex] = useState(3); // 초기 끝 이미지 카드 인덱스

  const targetRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // root 요소 (기본값은 viewport)
      rootMargin: '0px',
      threshold: 0.5, // 요소가 50% 이상 가시 영역에 들어올 때 알림을 받음
    };

    const callback = (entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          // 특정 요소가 화면에 들어오면 API 요청 수행
          const res = await fetchPostByIndex(endCardIndex + 1);
          setEndCardIndex(prevIdx => prevIdx + 1);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  const fetchApiData = () => {
    // API 요청을 수행하는 로직 작성
  };

  return (
    <S.Container>
      {
        images.map((image) => () => (
          <ImageCard thumbnailImage={image} />
        ))
      }
      <div ref={targetRef}></div>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 252px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #ffffff;
  `,
}