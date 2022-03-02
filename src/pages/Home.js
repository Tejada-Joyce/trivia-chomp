<<<<<<< HEAD
import { Heading, Text } from "@chakra-ui/react";
=======
import LeaderBoard from "../components/LeaderBoard/LeaderBoard";
>>>>>>> 08eb8922e3a462d42aac7a765f93f83b55505def
import ProfileCardModal from "../components/Profile/ProfileCardModal";
import Background from "../components/ui/Background";

const Home = () => {
  return (
    <>
      <ProfileCardModal />
      <Background>
<<<<<<< HEAD
      <Heading as="h1" textAlign="center">Welcome to TriviaChomp!</Heading>
      <Text textAlign="center" mt="10px">Today is a good day to do some trivia.</Text>
        <ProfileCardModal />
=======
        <p>Home Page</p>
>>>>>>> 08eb8922e3a462d42aac7a765f93f83b55505def
      </Background>
      <LeaderBoard />
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
