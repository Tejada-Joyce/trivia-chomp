//handles sending requests to get quiz questions, displaying questions, and keeping track of answers
// get all questions -> display current question -> wait for answer -> check question and give feedback -> go to next question
import Background from "../components/ui/Background";
import { useParams } from "react-router";
import useHttp from "../hooks/use-http";
import { useState, useEffect, useContext, useReducer } from "react";
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
import { questionReducer, userReducer } from "../hooks/reducers";

const decodeHTML = function (html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const initialQuestionsState = {
  //questions from API
  questions: [],
  // index of where we are currently at
  curQuestionIdx: 0,
  // an array of info about the questions as will be stored in our database :
  // {
  //   category: String,
  //   timestamp: Date,
  //   isCorrect: Boolean
  // }
  questionData: [],
  // possible answers for current question
  possibleAnswers: [],
  // index of correct answer for current question
  correctAnswer: null,
};

const initialUserState = {
  // the index of the choice the user picked
  userChoice: null,
  // whether or not the user answered the current question correctly
  isCorrect: 0,
  // whether or not the user answered
  answered: false,
};

const Quiz = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [questionsState, questionsDispatch] = useReducer(
    questionReducer,
    initialQuestionsState
  );
  const {
    questions,
    curQuestionIdx,
    questionData,
    possibleAnswers,
    correctAnswer,
  } = questionsState;
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const { userChoice, isCorrect, answered } = userState;
  //chosen radio button index
  const [value, setValue] = useState("0");
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
    questionsDispatch({ type: "SET_RESET" });
    setFinished(false);
    navigate(`/`, { replace: true });
  };

  const questionUrl = `https://opentdb.com/api.php?amount=10&category=${category}`;

  //get data
  useEffect(() => {
    const applyData = (response) => {
      questionsDispatch({
        type: "SET_QUESTIONS",
        questions: response?.results,
      });
    };
    sendRequest({ url: questionUrl }, applyData);
  }, [sendRequest, questionUrl]);

  // set possibleAnswers
  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[curQuestionIdx];
      const newAnswers = currentQuestion.incorrect_answers;
      newAnswers.push(currentQuestion.correct_answer);
      newAnswers.sort((a, b) => 0.5 - Math.random());
      questionsDispatch({
        type: "SET_CUR_POSIBLE_ANSWERS",
        possibleAnswers: [...newAnswers],
      });
    }
  }, [questions, curQuestionIdx]);

  useEffect(() => {
    possibleAnswers.forEach((answer, index) => {
      if (answer === questions[curQuestionIdx].correct_answer) {
        questionsDispatch({
          type: "SET_CUR_CORRECT_ANSWER",
          correctAnswer: index.toString(),
        });
      }
    });
  }, [possibleAnswers, curQuestionIdx, questions]);

  const options = possibleAnswers.map((answer, index) => {
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
    userDispatch({ type: "SET_WAS_ANSWERED", answered: true });
    const userAnswer = e.target.answer.value;
    userDispatch({ type: "SET_CHOICE", userChoice: userAnswer });

    if (userAnswer === correctAnswer) {
      //give user feedback
      win();
      userDispatch({ type: "SET_ANSWER_POINT", isCorrect: 1 });
    } else {
      beep();
      userDispatch({ type: "SET_ANSWER_POINT", isCorrect: 0 });
    }
  };
  //reset everything before moving to the next question
  const nextQuestionHandler = () => {
    //add to the array to store in database
    const curQuestionData = {
      category: questions[curQuestionIdx]?.category,
      timestamp: format(new Date(), "MM-dd-yyy"),
      isCorrect: isCorrect,
    };
    questionsDispatch({
      type: "SET_QUESTION_DATA",
      questionData: curQuestionData,
    });

    if (curQuestionIdx < questions.length - 1) {
      questionsDispatch({ type: "SET_CUR_QUESTION_IDX" });
      userDispatch({ type: "SET_ANSWER_POINT", isCorrect: 0 });
      userDispatch({ type: "SET_WAS_ANSWERED", answered: false });
      setValue("0");
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
        Category: {questions[curQuestionIdx]?.category}
      </Heading>
      <Progress
        value={(curQuestionIdx + 1) * 10}
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
          {decodeHTML(questions[curQuestionIdx]?.question)}
        </Text>
        {!answered && (
          <RadioGroup
            name="answer"
            onChange={updateAnswerHandler}
            value={value}
          >
            <Stack>{options}</Stack>
          </RadioGroup>
        )}

        {answered && (
          <List spacing="3">
            {possibleAnswers.map((answer, index) => {
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
