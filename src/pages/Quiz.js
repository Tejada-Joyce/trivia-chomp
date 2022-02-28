//handles sending requests to get quiz questions, displaying questions, and keeping track of answers
// get all questions -> display current question -> wait for answer -> check question and give feedback -> go to next question
import Background from "../components/ui/Background";
import { useParams } from "react-router";
import useHttp from "../hooks/use-http";
import { useState, useEffect } from "react";
import { Button, Progress, Radio, RadioGroup, Spinner, Stack } from "@chakra-ui/react";
import React from "react";


const Quiz = () => {
  const { isLoading, error, sendRequest } = useHttp()
  const { categoryId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [curQuestion, setCurQuestion] = useState(0);
  const [value, setValue] = useState('1')

  let category = ''
  if (categoryId !== 'random') {
    category = categoryId
  }

  const questionUrl = `https://opentdb.com/api.php?amount=10&category=${category}`

  useEffect(() => {
    const applyData = (response) => {
      setQuestions(response.results)
    }
    sendRequest({ url: questionUrl }, applyData)
  }, [sendRequest]);

    let possibleAnswers = questions[curQuestion]?.incorrect_answers.map((answer, index) => {
      return <Radio key={index} value={index}>{answer}</Radio>
    })
  
    let length = questions[curQuestion]?.incorrect_answers.length
    possibleAnswers?.push(<Radio key={length} value={length}>{questions[curQuestion]?.correct_answer}</Radio>)
  
    // const shuffledPossibleAnswers = possibleAnswers?.sort((a, b) => 0.5 - Math.random())
  
  let content = (
    <div>
      <Progress />
      <form>
        <p>Category: {questions[curQuestion]?.category}</p>
        <p>{questions[curQuestion]?.question}</p>
        <p>quiz answers</p>
        <RadioGroup name="answer" onChange={setValue} value={value}>
          <Stack>
            {possibleAnswers}
          </Stack>
        </RadioGroup>
        <Button>Submit</Button>
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
