import { Heading, Text } from "@chakra-ui/react";
import ProfileCardModal from "../components/Profile/ProfileCardModal";
import Background from "../components/ui/Background";

const Home = () => {
  return (
    <>
      <Background>
      <Heading as="h1" textAlign="center">Welcome to TriviaChomp!</Heading>
      <Text textAlign="center" mt="10px">Today is a good day to do some trivia.</Text>
        <ProfileCardModal />
      </Background>
      <div>
        <a
          href="https://www.flaticon.com/free-icons/dinosaur"
          title="dinosaur icons"
        >
          Dinosaur icons created by Freepik - Flaticon
        </a>
      </div>
    </>
  );
};

export default Home;
