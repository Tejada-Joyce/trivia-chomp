import { Modal, ModalContent, ModalHeader, ModalBody, ModalOverlay, } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import QuizSetupForm from "./QuizSetupForm";
export default function QuizSetupModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
          <Modal
                size="lg"
                isOpen={props.isOpen}
                onClose={onClose}
                closeOnEsc="true"
                closeOnOverlayClick="true"
          >
                <ModalOverlay/>
            <ModalContent>
              <ModalHeader fontSize="3xl" textAlign="center">
                Quiz
              </ModalHeader>
              <ModalBody pb={6}>
                <QuizSetupForm/>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      );
}