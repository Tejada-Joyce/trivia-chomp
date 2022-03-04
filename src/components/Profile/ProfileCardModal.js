import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import ProfileForm from "./ProfileForm";

const ProfileCardModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const username = localStorage.getItem("trivia_displayName");

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
