// import React from 'react';
// import { useDropzone } from 'react-dropzone';
// import { updateUploadedPostImage } from "../../app/slice";
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';

// import styled from '@emotion/styled';

// export default function DropZone(props) {
//   const dispatch = useDispatch();

//   const {
//     acceptedFiles,
//     fileRejections,
//     getRootProps,
//     getInputProps
//   } = useDropzone({
//     accept: {
//       'image/jpg': [],
//       'image/jpeg': [],
//       'image/png': []
//     }
//   });

//   useEffect(() => {
//     if (acceptedFiles.length > 0) {
//       const formData = new FormData();
//       formData.append('image', acceptedFiles[0]);
//       dispatch(updateUploadedPostImage(formData));
//     }
//   }, [acceptedFiles]);

//   const acceptedFileItems = acceptedFiles.map(file => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//     </li>
//   ));

//   const fileRejectionItems = fileRejections.map(({ file, errors }) => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//       <ul>
//         {errors.map(e => (
//           <li key={e.code}>{e.message}</li>
//         ))}
//       </ul>
//     </li>
//   ));

//   return (
//     <S.DropZone {...getRootProps({ className: 'dropzone' })}>
//       <section className="container" >
//         <div>
//           <input {...getInputProps()} />
//           <p>Drag 'n' drop some files here, or click to select files</p>
//           <em>(Only *.jpg, *.jpeg and *.png images will be accepted)</em>
//         </div>
//         <aside>
//           <h4>Accepted files</h4>
//           <ul>{acceptedFileItems}</ul>
//           <h4>Rejected files</h4>
//           <ul>{fileRejectionItems}</ul>
//         </aside>
//       </section>
//     </S.DropZone>
//   );
// }

// const S = {
//   DropZone: styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     width: 100%;
//     border: 1px solid #ddd;
//     background-color: #fafafa;
//     color: #7d7d7d;
//     border-radius: 16px;
//     padding: 30px;
//     cursor: pointer;
//   `,
// };