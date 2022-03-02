import CardTop from "./CardTop";
import { Grid, GridItem } from "@chakra-ui/react";
import { DUMMY_DATA } from "./dummy_data";
import { format, isThisMonth, isThisWeek } from "date-fns";

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
  const today = new Date();
  switch (time.toLowerCase()) {
    case "day":
      filteredData = [...objs].map((obj) => {
        const questions = obj.questions.filter(
          (question) => format(today, "MM-dd-yyyy") === question.timestamp
        );
        return { ...obj, questions: questions };
      });
      filteredData = filteredData.filter((obj) => obj.questions.length !== 0);
      break;
    case "week":
      filteredData = [...objs].map((obj) => {
        const questions = obj.questions.filter((question) =>
          isThisWeek(new Date(question.timestamp))
        );
        return { ...obj, questions: questions };
      });
      filteredData = filteredData.filter((obj) => obj.questions.length !== 0);
      break;
    case "month":
      filteredData = [...objs].map((obj) => {
        const questions = obj.questions.filter((question) =>
          isThisMonth(new Date(question.timestamp))
        );
        return { ...obj, questions: questions };
      });
      filteredData = filteredData.filter((obj) => obj.questions.length !== 0);
      break;
    default:
      break;
  }
  return [...filteredData];
};

const formatUserData = (user) => {
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
  const sortedUsers = ["Day", "Week", "Month"].map((time) => {
    return {
      time: time,
      users: sortDataByPoints(
        filterDataByTime(DUMMY_DATA, time).map(formatUserData)
      ),
    };
  });
  return (
    <Grid
      templateColumns={["1fr", "1fr", "repeat(3, 1fr)"]}
      maxW="900px"
      m="10px auto"
      gap={3.5}
    >
      {sortedUsers.map((users) => (
        <GridItem key={users.time} bg="rgba(0, 0, 0, .75)" p="20px">
          <CardTop time={users.time} users={users.users} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default LeaderBoard;
