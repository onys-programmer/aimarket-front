import ReactModal from 'react-modal';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileUploadModalVisibility, updateProfileImage, updateProfileImageBase64 } from '../app/slice';
import { Card, CardBody, CardHeader, Flex, Text, Stack, Button, Avatar } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';
import { DEFAULT_PROFILE_IMAGE_URL } from '../static/constants';

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
  const initialProfileImage = useSelector((state) => state.app.profileImage);

  const [hasEdited, setHasEdited] = useState(false);
  const [profileImageTemp, setProfileImageTemp] = useState(initialProfileImage);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'image/jpg': [],
      'image/jpeg': [],
      'image/png': []
    },
    onDrop: (acceptedFiles) => {
      const profileImageTemp = URL.createObjectURL(acceptedFiles[0]);
      setProfileImageTemp(profileImageTemp)
      setSelectedFile(acceptedFiles[0]);
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));


  const handleSaveModal = () => {
    saveModal();
  };

  const handleCloseModal = () => {
    if (hasEdited) {
      window.confirm("변경사항을 저장하지 않고 닫으시겠습니까?") && closeModal();
    } else {
      closeModal();
    }
  }

  const saveModal = () => {
    dispatch(updateProfileImage(profileImageTemp || DEFAULT_PROFILE_IMAGE_URL));

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        const base64String = reader.result;
        dispatch(updateProfileImageBase64(base64String));
      }
    } else {
      dispatch(updateProfileImageBase64(null));
    }
    closeModal();
  }

  const closeModal = () => {
    dispatch(updateProfileUploadModalVisibility(false));
  }

  const handleConfirmImage = () => {
    // image dispatch
    saveModal();
  };

  const handleClickResetTempImage = () => {
    setSelectedFile(null);
    setProfileImageTemp("");
    acceptedFiles.pop();
  };

  const handleClickSetDefaultProfileImage = () => {
    setSelectedFile(null);
    setProfileImageTemp(DEFAULT_PROFILE_IMAGE_URL);
    acceptedFiles.pop();
  };


  const handleEscCancelModal = (e) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  const FILE_NOTICE = selectedFile ? "" : "이 없습니다.";

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={handleSaveModal}
      style={customStyles}
      contentLabel="Example Modal"
      zIndex={9999}
      position="fixed"
      width="90vw"
      maxWidth="400px"
      onKeyDown={handleEscCancelModal}
      onClick={() => setHasEdited(true)}
    >
      <Card width="90vw" maxW={"400px"}>
        <CardHeader>
          <Flex justifyContent={'space-between'}>
            <h2>프로필 사진 변경</h2>
            <SmallCloseIcon onClick={handleCloseModal} cursor={"pointer"} _hover={{ color: "red" }} />
          </Flex>
        </CardHeader>
        <CardBody>
          <Stack>
            <div>프로필 사진을 변경하시겠습니까?</div>
            <Text width={"fit-content"} cursor={"pointer"} color={"#666"} _hover={{ color: "#279df4" }}
              onClick={handleClickSetDefaultProfileImage}
            >
              기본 프로필로
            </Text>
            {
              !profileImageTemp &&
              <S.DropZone {...getRootProps({ className: 'dropzone' })}>
                <section className="container" >
                  <div>
                    <input {...getInputProps()} />
                    <p>드래그 앤 드롭 혹은 클릭하여 파일을 올려주세요</p>
                    <em>(10mb 이내의 jpg, jpeg, png 파일만 가능합니다.)</em>
                  </div>
                  <aside>
                    <Text fontSize={"100%"}>올라간 파일{FILE_NOTICE}</Text>
                    <Text fontSize={"150%"}>{acceptedFileItems}</Text>
                  </aside>
                </section>
              </S.DropZone>
            }
            {
              profileImageTemp && (
                <Stack alignItems={"center"} gap={3}>
                  <SmallCloseIcon
                    marginLeft="50%"
                    marginTop={"auto"}
                    color="#777"
                    cursor={"pointer"}
                    _hover={{ color: "red" }}
                    onClick={handleClickResetTempImage}
                  />
                  <Avatar size={"2xl"} src={profileImageTemp} alt="Uploaded" />
                  <Button onClick={handleConfirmImage} colorScheme={"blue"}>
                    확인
                  </Button>
                </Stack>
              )}
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
    overflow: auto;
    border: 1px solid #ddd;
    background-color: #fafafa;
    color: #7d7d7d;
    border-radius: 16px;
    padding: 30px;
    cursor: pointer;
  `,
};