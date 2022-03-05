import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useContext } from "react";
import ProfileForm from "./ProfileForm";
import AuthContext from "../../store/auth-contex";

const ProfileCardModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authCtx = useContext(AuthContext)
  const username = authCtx.username;

  useEffect(() => {
    if (!username) onOpen();
  }, [onOpen, username]);

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        // scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="3xl" textAlign="center">
            Set Your Profile
          </ModalHeader>
          <ModalBody pb={6} textAlign="center">
            <ProfileForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileCardModal;
