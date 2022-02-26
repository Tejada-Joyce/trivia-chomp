import { Heading, Text } from "@chakra-ui/react";
import Background from "../components/ui/Background";

const Home = () => {
  return (
    <Background>
      <Heading as="h1" textAlign="center">Welcome to TriviaChomp!</Heading>
      <Text textAlign="center" mt="10px">Today is a good day to do some trivia.</Text>
    </Background>
  );
};

export default Home;
