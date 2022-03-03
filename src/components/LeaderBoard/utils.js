import { format, isThisMonth, isThisWeek } from "date-fns";

const formatData = (objs) => {
  const array = Object.values(objs).map((value) => value);
  return array;
};

export const sortDataByPoints = (objs) => {
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
  return [...sortedData].slice(0, 5);
};

export const filterDataByTime = (objs, time) => {
  let filteredData = [];
  const today = new Date();
  switch (time.toLowerCase()) {
    case "day":
      filteredData = [...objs].map((obj) => {
        const questions = formatData(obj.questions).filter(
          (question) => format(today, "MM-dd-yyyy") === question.timestamp
        );
        return { ...obj, questions: questions };
      });
      filteredData = filteredData.filter((obj) => obj.questions.length !== 0);
      break;
    case "week":
      filteredData = [...objs].map((obj) => {
        const questions = formatData(obj.questions).filter((question) =>
          isThisWeek(new Date(question.timestamp))
        );
        return { ...obj, questions: questions };
      });
      filteredData = filteredData.filter((obj) => obj.questions.length !== 0);
      break;
    case "month":
      filteredData = [...objs].map((obj) => {
        const questions = formatData(obj.questions).filter((question) =>
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

export const formatUserData = (user) => {
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
