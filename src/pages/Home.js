import LeaderBoard from "../components/LeaderBoard/LeaderBoard";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import ProfileCardModal from "../components/Profile/ProfileCardModal";
import QuizSetupModal from "../components/quiz/QuizSetupModal";
import QuizStartButton from "../components/quiz/QuizStartButton";
import Background from "../components/ui/Background";
import { useState, useMemo } from "react";
import { useLocation } from "react-router";

const Home = () => {
  function useQuery() {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
  }
  const [quizSetupModalIsOpen, setQuizSetupModalIsOpen] = useState(false);
  const onOpenQuizSetupModal = () => {
    setQuizSetupModalIsOpen(true)
  }
  const query = useQuery();
  let newUser = query.get("newUser")

  return (
    <Flex flexDir="column" justify="space-between" h="100%">

      <div>
        <Background>
          <Heading as="h1" textAlign="center">Welcome to TriviaChomp!</Heading>
          <Text textAlign="center" mt="10px">Today is a good day to do some trivia.</Text>
          <QuizSetupModal isOpen={quizSetupModalIsOpen}/>
            <QuizStartButton onClick={onOpenQuizSetupModal} />
          { newUser && <ProfileCardModal />}
          </Background>
          <LeaderBoard />
      </div>

    </Flex>
  );
};

export default Home;
