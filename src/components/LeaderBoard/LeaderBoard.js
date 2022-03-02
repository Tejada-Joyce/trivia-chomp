import CardTop from "./CardTop";
import { Grid, GridItem } from "@chakra-ui/react";
import { DUMMY_DATA } from "./dummy_data";
import moment from "moment";

const sortDataByPoints = (objs) => {
  const sortedData = [...objs].sort((a, b) => {
    if (b.points < a.points) {
      return -1;
    } else if (a.points === b.points) {
      if (a.accuracy < b.accuracy) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  });
  return [...sortedData];
};

const filterDataByTime = (objs, time) => {
  let filteredData = [];
  const today = moment();
  const currentMonth = today.month();
  switch (time) {
    case "day":
      filteredData = [...objs].map((obj) => {
        const questions = obj.questions.filter(
          (question) => today.format("MM-DD-YYYY") === question.timestamp
        );
        return { ...obj, questions: questions };
      });
      filteredData = filteredData.filter((obj) => obj.questions.length !== 0);
      break;
    case "week":
      filteredData = [...objs].map((obj) => {
        const questions = obj.questions.filter((question) => {
          const questionMonth = moment(question.timestamp).month();
          console.log("month: ", currentMonth);
          console.log("questionMonth: ", questionMonth);
          return currentMonth === questionMonth;
        });
        return { ...obj, questions: questions };
      });
      console.log("filtered after map: ", filteredData);
      filteredData = filteredData.filter((obj) => obj.questions.length !== 0);
      console.log("filtered after filter: ", filteredData);
      break;
    case "month":
      filteredData = [...objs].map((obj) => {
        const questions = obj.questions.filter((question) => {
          const questionMonth = moment(question.timestamp).month();
          return currentMonth === questionMonth;
        });
        return { ...obj, questions: questions };
      });
      filteredData = filteredData.filter((obj) => obj.questions.length !== 0);
      break;
    default:
      break;
  }
  return [...filteredData];
};

const getUserData = (user) => {
  const questionsTaken = user.questions.length;
  let points = 0;
  user.questions.forEach((question) => {
    if (question.isCorrect) points++;
  });
  const accuracy = ((points * 100) / questionsTaken).toFixed(1);
  return {
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    accuracy: `${accuracy}%`,
    questionsTaken: user.questions.length,
    points: points,
  };
};

const LeaderBoard = () => {
  const users = DUMMY_DATA.map(getUserData);
  const usersDay = sortDataByPoints(
    filterDataByTime(DUMMY_DATA, "day").map(getUserData)
  );
  const usersMonth = sortDataByPoints(
    filterDataByTime(DUMMY_DATA, "month").map(getUserData)
  );

  return (
    <Grid
      templateColumns={["1fr", "1fr", "repeat(3, 1fr)"]}
      maxW="900px"
      m="10px auto"
      gap={3.5}
    >
      <GridItem bg="rgba(0, 0, 0, .75)" p="20px">
        <CardTop time="Day" users={usersDay} />
      </GridItem>
      <GridItem bg="rgba(0, 0, 0, .75)" p="20px">
        <CardTop time="Week" users={users} />
      </GridItem>
      <GridItem bg="rgba(0, 0, 0, .75)" p="20px">
        <CardTop time="Month" users={usersMonth} />
      </GridItem>
    </Grid>
  );
};

export default LeaderBoard;
