import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileUploadModalVisibility } from '../app/slice';
import { Card, CardBody, CardHeader, Flex, Text, Stack } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';

export default function ModalChangeProfile({ afterOpenModal = () => { } }) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: "0px",
      borderRadius: "16px",
    },
  };
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.app.profileUploadModalVisibility);
  const closeModal = () => {
    dispatch(updateProfileUploadModalVisibility(false));
  };

  const {
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'image/jpg': [],
      'image/jpeg': [],
      'image/png': []
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      zIndex={9999}
      position="fixed"
    >
      <Card>
        <CardHeader>
          <Flex justifyContent={'space-between'}>
            <h2>프로필 사진 변경</h2>
            <SmallCloseIcon onClick={closeModal} cursor={"pointer"} _hover={{ color: "red" }} />
          </Flex>
        </CardHeader>
        <CardBody>
          <Stack>
            <div>프로필 사진을 변경하시겠습니까?</div>
            <S.DropZone {...getRootProps({ className: 'dropzone' })}>
              <section className="container" >
                <div>
                  <input {...getInputProps()} />
                  <p>드래그 앤 드롭 혹은 클릭하여 파일을 올려주세요</p>
                  <em>(10mb 이내의 jpg, jpeg, png 파일만 가능합니다.)</em>
                </div>
                <aside>
                  <Text fontSize={"100%"}>올라간 파일</Text>
                  <Text fontSize={"150%"}>{acceptedFileItems}</Text>
                </aside>
              </section>
            </S.DropZone>
          </Stack>
        </CardBody>
      </Card>
    </ReactModal >
  );
};

const S = {
  DropZone: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 30vh;
    border: 1px solid #ddd;
    background-color: #fafafa;
    color: #7d7d7d;
    border-radius: 16px;
    padding: 30px;
    cursor: pointer;
  `,
};