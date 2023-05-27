// import styled from "@emotion/styled";
// import ImageCard from "../../components/ImageCard";
// import { useState, useEffect, useRef } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { fetchPostByIndex } from "../../services/api/api";

// export default function ImagesCol({ colsNum, colNum }) {
//   const [images, setImages] = useState([]);
//   const [endCardIndex, setEndCardIndex] = useState(3); // 초기 끝 이미지 카드 인덱스

//   const targetRef = useRef(null);

//   return (
//     <S.Container>
//       {
//         images.map((image) => () => (
//           <ImageCard thumbnailImage={image} />
//         ))
//       }
//       <div ref={targetRef}></div>
//     </S.Container>
//   );
// }

// const S = {
//   Container: styled.div`
//     width: 252px;
//     height: fit-content;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-start;
//     background-color: #ffffff;
//   `,
// }