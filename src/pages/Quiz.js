//handles sending requests to get quiz questions, displaying questions, and keeping track of answers
// get all questions -> display current question -> wait for answer -> check question and give feedback -> go to next question
import Background from "../components/ui/Background";
import { useParams } from "react-router";
import useHttp from "../hooks/use-http";
import { useState, useEffect, useContext } from "react";
import {
  Button,
  Progress,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Alert,
  AlertDescription,
  ListItem,
  List,
  ListIcon,
  Heading,
  Text,
  Box,
  Avatar,
} from "@chakra-ui/react";
import React from "react";
import { CheckCircleIcon, SmallCloseIcon } from "@chakra-ui/icons";
import Confetti from "react-confetti";
import useSound from "use-sound";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import AuthContext from "../store/auth-contex";
import dinosaurs from "../images/index";
import errorSound from "../assets/sounds/error.mp3";
import successSound from "../assets/sounds/success1.mp3";

const decodeHTML = function (html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const Quiz = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  //questions from API
  const [questions, setQuestions] = useState([]);
  //index of where we are currently at
  const [curQuestion, setCurQuestion] = useState(0);
  //chosen radio button index
  const [value, setValue] = useState("0");
  //possible answers for current question
  const [answers, setAnswers] = useState([]);
  //index of correct answer for current question
  const [correctAnswer, setCorrectAnswer] = useState();
  //the index of the choice the user picked
  const [userChoice, setUserChoice] = useState(null);
  //whether or not the user answered the current question correctly
  const [isCorrect, setIsCorrect] = useState(0);
  //whether or not the user answered
  const [answered, setAnswered] = useState(false);
  //an array of info about the questions as will be stored in our database :
  // {
  //   category: String,
  //   timestamp: Date,
  //   isCorrect: Boolean
  // }
  const [questionData, setQuestionData] = useState([]);
  const [finished, setFinished] = useState(false);

  const [beep] = useSound(errorSound);
  const [win] = useSound(successSound);

  const avatar = authCtx.avatar;
  const avatarNum = avatar.slice(9);
  const image = dinosaurs[+avatarNum - 1];

  let category = "";
  if (categoryId !== "random") {
    category = categoryId;
  }

  //update radio when item is clicked
  const updateAnswerHandler = (e) => {
    setValue((prev) => {
      return e.toString();
    });
  };

  const playAgainHandler = () => {
    setQuestions([]);
    setCurQuestion(0);
    setQuestionData([]);
    setFinished(false);
    navigate(`/`, { replace: true });
  };

  const questionUrl = `https://opentdb.com/api.php?amount=10&category=${category}`;

  //get data
  useEffect(() => {
    const applyData = (response) => {
      setQuestions(response.results);
    };
    sendRequest({ url: questionUrl }, applyData);
  }, [sendRequest, questionUrl]);

  // set answers
  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[curQuestion];
      setAnswers((prev) => {
        const newAnswers = currentQuestion.incorrect_answers;
        newAnswers.push(currentQuestion.correct_answer);
        newAnswers.sort((a, b) => 0.5 - Math.random());
        return newAnswers.slice();
      });
    }
  }, [questions, curQuestion]);

  useEffect(() => {
    answers.forEach((answer, index) => {
      if (answer === questions[curQuestion].correct_answer) {
        setCorrectAnswer(index.toString());
      }
    });
  }, [answers, curQuestion, questions]);

  const possibleAnswers = answers.map((answer, index) => {
    return (
      <Radio size="lg" key={index} value={index.toString()}>
        {decodeHTML(answer)}
      </Radio>
    );
  });

  // let answerFeedback = []
  //handle form submit
  const submitQuestionHandler = (e) => {
    //find out which one had the correct answer
    e.preventDefault();
    setAnswered(true);
    const userAnswer = e.target.answer.value;
    setUserChoice(userAnswer);
    if (userAnswer === correctAnswer) {
      //give user feedback
      win();
      setIsCorrect(1);
    } else {
      beep();
      setIsCorrect(0);
    }
  };
  //reset everything before moving to the next question
  const nextQuestionHandler = () => {
    //add to the array to store in database
    const curQuestionData = {
      category: questions[curQuestion]?.category,
      timestamp: format(new Date(), "MM-dd-yyy"),
      isCorrect: isCorrect,
    };

    setQuestionData((prev) => {
      return [...prev, curQuestionData];
    });

    if (curQuestion < questions.length - 1) {
      setCurQuestion((prev) => prev + 1);
      setIsCorrect(0);
      setAnswered(false);
      setValue(0);
    } else {
      setFinished(true);
      //send data and trigger finished screen
      const userId = authCtx.userId;
      const endpoint = `https://trivia-chomp-c5a02-default-rtdb.firebaseio.com/users/${userId}/questions.json`;
      const finalQuestionData = [...questionData, curQuestionData];
      finalQuestionData.forEach((answeredQuestion) => {
        sendRequest(
          {
            url: endpoint,
            method: "POST",
            body: answeredQuestion,
            headers: { "Content-Type": "application/json" },
          },
          (response) => {}
        );
      });
    }
  };

  //set content
  let content = (
    <Box>
      <Heading textAlign="center" as="h2" mb="20px" size="md">
        Category: {questions[curQuestion]?.category}
      </Heading>
      <Progress
        value={(curQuestion + 1) * 10}
        mb="10px"
        borderRadius="10px"
        colorScheme="purple"
      />
      {answered ? (
        <Alert variant="solid" status={isCorrect ? "success" : "error"}>
          <AlertDescription>
            {isCorrect ? "Correct!" : "Incorrect"}
          </AlertDescription>
        </Alert>
      ) : (
        <Box height="48px"></Box>
      )}

      <form onSubmit={submitQuestionHandler}>
        <Text mb="10px" fontSize="2xl">
          {decodeHTML(questions[curQuestion]?.question)}
        </Text>
        {!answered && (
          <RadioGroup
            name="answer"
            onChange={updateAnswerHandler}
            value={value}
          >
            <Stack>{possibleAnswers}</Stack>
          </RadioGroup>
        )}

        {answered && (
          <List spacing="3">
            {answers.map((answer, index) => {
              if (correctAnswer == index) {
                return (
                  <ListItem
                    key={index}
                    bg={userChoice == index && "rgba(255,249,196, .5)"}
                  >
                    <ListIcon as={CheckCircleIcon} color="green" />
                    {decodeHTML(answer)}
                  </ListItem>
                );
              } else {
                return (
                  <ListItem
                    key={index}
                    bg={userChoice == index && "rgba(255,249,196, .5)"}
                  >
                    <ListIcon as={SmallCloseIcon} color="red" />
                    {decodeHTML(answer)}
                  </ListItem>
                );
              }
            })}
          </List>
        )}

        {!answered && (
          <Button
            bg="gold"
            color="black"
            mt={4}
            type="submit"
            _hover={{ backgroundColor: "#ddb902" }}
          >
            Submit
          </Button>
        )}
        {answered && (
          <Button
            bg="gold"
            color="black"
            mt={4}
            onClick={nextQuestionHandler}
            _hover={{ backgroundColor: "#ddb902" }}
          >
            Next
          </Button>
        )}
      </form>
    </Box>
  );
  if (error) {
    content = (
      <div>
        <p>There was a problem</p>
      </div>
    );
    console.log(error);
  }

  if (isLoading) {
    content = <Spinner />;
  }

  if (finished) {
    content = (
      <Box textAlign="center">
        <Confetti recycle="false" run="false" />
        <Avatar size="xl" m="10px" src={image} />
        <Heading as="h1">QUIZ COMPLETE</Heading>
        <Text fontSize="4xl" m="20px">
          {questionData.reduce((total, curr) => {
            if (curr.isCorrect) {
              return total + 1;
            }
            return total;
          }, 0)}{" "}
          / {questions.length}
        </Text>
        <Button
          onClick={playAgainHandler}
          bg="gold"
          color="black"
          _hover={{ backgroundColor: "#ddb902" }}
          m="10px"
        >
          Finished
        </Button>
      </Box>
    );
  }

  return (
    <Background pt="20px">
      <div>{content}</div>
    </Background>
  );
};

export default Quiz;
