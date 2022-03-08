import Background from "../components/ui/Background";
import AuthContext from "../store/auth-contex";
import { useContext, useEffect, useState } from "react";
import { Avatar, Center, Divider, Heading, Stack, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import useHttp from "../hooks/use-http";
import dinosaurs from "../images/index";


const Profile = () => {
  const authCtx = useContext(AuthContext)
  const { isLoading, error, sendRequest } = useHttp();
  const [questions, setQuestions] = useState({});
  const [avatar, setAvatar] = useState('')
  const [username, setUsername] = useState('')
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0)
  const [correctAnswered, setCorrectAnswered] = useState(0)
  const [incorrectAnswered, setIncorrectAnswered] = useState(0)

  useEffect(() => {
    const userId = authCtx.userId
    sendRequest({url: `https://trivia-chomp-c5a02-default-rtdb.firebaseio.com/users/${userId}.json`}, (data) => {
      data?.avatar && setAvatar(data.avatar)
      data?.username && setUsername(data.username)

      if (data?.questions) {
        for (const question in data.questions) {
          setTotalQuestionsAnswered(prev => prev + 1)
          if (data.questions[question].isCorrect) {
            setCorrectAnswered(prev => prev + 1)
          } else {
            setIncorrectAnswered(prev => prev + 1)
          }
        }

      }

  })

  }, [authCtx.userId, sendRequest]);
  const avatarNum = avatar.slice(9);
  const image = dinosaurs[+avatarNum - 1]; 

  return (
    <Background>
      <Center>
      <Avatar margin="auto" size="xl" src={image}></Avatar>
      </Center>
      <Heading as="h2" size="lg" textAlign="center">{username}</Heading>
      <Heading as="h3" size="md">Stats</Heading>
      <Divider m="5px 0"></Divider>
      <StatGroup>
      <Stat>
          <StatLabel>Total Questions Answered</StatLabel>
          <StatNumber>{totalQuestionsAnswered}</StatNumber>
          <StatHelpText>

          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Correct</StatLabel>
          <StatNumber>{correctAnswered}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase"></StatArrow>
            {(totalQuestionsAnswered > 0) ? correctAnswered * 100 / totalQuestionsAnswered :'--' }%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Incorrect</StatLabel>
          <StatNumber>{incorrectAnswered}</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease"></StatArrow>
            {(totalQuestionsAnswered > 0) ? incorrectAnswered * 100 / totalQuestionsAnswered :'--' }%
          </StatHelpText>
          </Stat>
      </StatGroup>
    </Background>
  );
};

export default Profile;
