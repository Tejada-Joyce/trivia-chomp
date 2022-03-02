//handles sending requests to get quiz questions, displaying questions, and keeping track of answers
// get all questions -> display current question -> wait for answer -> check question and give feedback -> go to next question
import Background from "../components/ui/Background";
import { useParams } from "react-router";
import useHttp from "../hooks/use-http";
import { useState, useEffect } from "react";
import { Button, Progress, Radio, RadioGroup, Spinner, Stack, Alert, AlertDescription, ListItem, List, ListIcon } from "@chakra-ui/react";
import React from "react";
import { CheckCircleIcon, SmallCloseIcon } from "@chakra-ui/icons";

const decodeHTML = function (html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const Quiz = () => {
  const { isLoading, error, sendRequest } = useHttp()
  const { categoryId } = useParams();

  //questions from API
  const [questions, setQuestions] = useState([]);
  //index of where we are currently at
  const [curQuestion, setCurQuestion] = useState(0);
  //chosen radio button index
  const [value, setValue] = useState('0')
  //possible answers for current question
  const [answers, setAnswers] = useState([])
  //index of correct answer for current question
  const [correctAnswer, setCorrectAnswer] = useState()
  //the index of the choice the user picked
  const [userChoice, setUserChoice] = useState(null)
  //whether or not the user answered the current question correctly
  const [isCorrect, setIsCorrect] = useState(false)
  //whether or not the user answered
  const [answered, setAnswered] = useState(false)
  //an array of info about the questions as will be stored in our database : 
  // {
  //   category: String,
  //   timestamp: Date,
  //   isCorrect: Boolean
  // }
  const [questionData, setQuestionData] = useState([])

  let category = ''
  if (categoryId !== 'random') {
    category = categoryId
  }

  //update radio when item is clicked
  const updateAnswerHandler = (e) => {
    setValue(prev => {
      return e.toString()
    })
  }

  const questionUrl = `https://opentdb.com/api.php?amount=10&category=${category}`

  //get data
  useEffect(() => {
    const applyData = (response) => {
      setQuestions(response.results)

    }
    sendRequest({ url: questionUrl }, applyData)

  }, [sendRequest, questionUrl]);

  // set answers
  useEffect(() => {

    if (questions.length > 0) {
      const currentQuestion = questions[curQuestion]
      setAnswers(prev => {
        const newAnswers = currentQuestion.incorrect_answers;
        newAnswers.push(currentQuestion.correct_answer)
        newAnswers.sort((a, b) => 0.5 - Math.random())
        return newAnswers.slice()
      })
    }

  }, [questions, curQuestion]);

  useEffect(() => {
    answers.forEach((answer, index) => {
      if (answer === questions[curQuestion].correct_answer) {
        setCorrectAnswer(index.toString())
      }
    })

  }, [answers, curQuestion, questions]);

  const possibleAnswers = answers.map((answer, index) => {
    return <Radio key={index} value={index.toString()}>{decodeHTML(answer)}</Radio>
  })

  // let answerFeedback = []
  //handle form submit
  const submitQuestionHandler = (e) => {
    //find out which one had the correct answer
    e.preventDefault();
    setAnswered(true)
    const userAnswer = e.target.answer.value;
    setUserChoice(userAnswer)
    if (userAnswer === correctAnswer) {
      //give user feedback 
      setIsCorrect(true)
      

    } else {
      setIsCorrect(false)
    }

  }
  //reset everything before moving to the next question
  const nextQuestionHandler = () => {
    //add to the array to store in database
    const curQuestionData = {
      category: questions[curQuestion]?.category,
      timestamp: new Date(),
      isCorrect: isCorrect
    }
    
    setQuestionData(prev => {
      return [...prev, curQuestionData]
    })
    console.log(questionData)

    if (curQuestion < questions.length - 1) {
      setCurQuestion(prev => prev + 1)
      setIsCorrect(false);
      setAnswered(false)
      setValue(0)
    } else {
      console.log('finished')
    }
  }


  //set content
  let content = (
    <div>
      <Progress value={(curQuestion + 1) * 10} />
      {
        answered &&
        <Alert variant="solid" status={isCorrect ? 'success' : 'error'}>
          <AlertDescription >{isCorrect ? 'Correct!' : 'Incorrect'}</AlertDescription>
        </Alert>
      }
      <form onSubmit={submitQuestionHandler}>
        <p>Category: {questions[curQuestion]?.category}</p>
        <p>{decodeHTML(questions[curQuestion]?.question)}</p>
        {
          !answered &&
          <RadioGroup name="answer"
            onChange={updateAnswerHandler}
            value={value}
          >
            <Stack>
              {possibleAnswers}
            </Stack>
          </RadioGroup>
        }

        {
          answered && <List spacing="3">
            {
              answers.map((answer, index) => {
                if (correctAnswer == index) {
                  return <ListItem key={index}>
                    <ListIcon as={CheckCircleIcon} color="green"/>
                    {answer}
                  </ListItem>
                } else {
                  return <ListItem key={index}>
                    <ListIcon  as={SmallCloseIcon} color="red"/>
                    {answer}
                  </ListItem>
                }
                })
            }
          </List>
        }

        {!answered && <Button bg="gold" color="black" mt={4} type="submit">Submit</Button>}
        {answered && <Button bg="gold" color="black" mt={4} onClick={nextQuestionHandler}>Next</Button>}
      </form>
    </div>
  );
  if (error) {
    content = <p>There was a problem</p>
    console.log(error)
  }

  if (isLoading) {
    content = <Spinner />
  }

  return (
    <Background>
      <div>
        {content}
      </div>
    </Background>
  );
};

export default Quiz;
