import CardTop from "./CardTop";
import { Grid, GridItem } from "@chakra-ui/react";
import { DUMMY_DATA } from "./dummy_data";
import { sortDataByPoints, filterDataByTime, formatUserData } from "./utils";

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
