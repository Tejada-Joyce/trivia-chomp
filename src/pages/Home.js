import LeaderBoard from "../components/LeaderBoard/LeaderBoard";
import { Flex, Heading, Text, useDisclosure, Divider } from "@chakra-ui/react";
import ProfileCardModal from "../components/Profile/ProfileCardModal";
import QuizSetupModal from "../components/quiz/QuizSetupModal";
import QuizStartButton from "../components/quiz/QuizStartButton";
import Background from "../components/ui/Background";
import { useState, useContext, useEffect } from "react";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-contex";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, error, sendRequest: getUserData } = useHttp();
  const [showModal, setShowModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;

  useEffect(() => {
    //get other user data
    const callback = (data) => {
      authCtx.updateUserData(data);
      setShowModal(true);
    };
    getUserData(
      {
        url: `https://trivia-chomp-c5a02-default-rtdb.firebaseio.com/users/${userId}.json`,
      },
      callback
    );
  }, [userId, getUserData]);

  return (
    <>
      {!isLoading && !error && (
        <Flex flexDir="column" justify="space-between" h="100%">
          <div>
            <Background>
              <Heading as="h1" textAlign="center">
                Welcome to TriviaChomp, {authCtx.username}!
              </Heading>
              <Text textAlign="center" mt="10px">
                Today is a good day to do some trivia.
              </Text>
              <QuizSetupModal isOpen={isOpen} onClose={onClose} />
              <QuizStartButton onClick={onOpen} />
              {showModal && <ProfileCardModal />}
            </Background>
            <Divider height="5px" borderColor="transparent" />
            <LeaderBoard />
          </div>
        </Flex>
      )}
    </>
  );
};

export default Home;
