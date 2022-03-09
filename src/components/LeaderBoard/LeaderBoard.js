import { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import CardTop from "./CardTop";
import { sortDataByPoints, filterDataByTime, formatUserData } from "./utils";
import useHttp from "../../hooks/use-http";

const LeaderBoard = () => {
  const usersDataUrl =
    "https://trivia-chomp-c5a02-default-rtdb.firebaseio.com/users.json";
  const { isLoading, error, sendRequest: getAllUsers } = useHttp();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const formatData = (usersObj) => {
      const usersArray = Object.entries(usersObj).map(([key, value]) => {
        return { id: key, ...value };
      });
      setUsersData(usersArray);
    };

    getAllUsers({ url: usersDataUrl }, formatData);
  }, [getAllUsers, usersDataUrl]);

  const sortedUsers = ["Day", "Week", "Month"].map((time) => {
    return {
      time: time,
      users: sortDataByPoints(
        filterDataByTime(usersData, time).map(formatUserData)
      ),
    };
  });
  return (
    <Grid
      templateColumns={["1fr", null, null, "repeat(3, 1fr)"]}
      maxW={["700px", null, null, "1000px"]}
      m="10px auto"
      gap="22px"
    >
      {sortedUsers.map((users) => (
        <GridItem key={users.time} bg="rgba(0, 0, 0, .75)" p="20px 25px">
          <CardTop time={users.time} users={users.users} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default LeaderBoard;
