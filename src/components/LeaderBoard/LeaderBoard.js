import CardTop from "./CardTop";
import { Grid, GridItem } from "@chakra-ui/react";

const DUMMY_DATA = [
  {
    id: "1",
    username: "Mary",
    accuracy: "67%",
    questionsTaken: "87",
    avatar: "dinosaur_1",
  },
  {
    id: "2",
    username: "Mary1",
    accuracy: "67%",
    questionsTaken: "87",
    avatar: "dinosaur_2",
  },
  {
    id: "3",
    username: "Mary2",
    accuracy: "67%",
    questionsTaken: "87",
    avatar: "dinosaur_3",
  },
  {
    id: "4",
    username: "Mary3",
    accuracy: "67%",
    questionsTaken: "87",
    avatar: "dinosaur_4",
  },
];

const LeaderBoard = () => {
  return (
    <Grid
      templateColumns={["1fr", "1fr", "repeat(3, 1fr)"]}
      maxW="900px"
      m="10px auto"
      gap={3.5}
    >
      <GridItem bg="rgba(0, 0, 0, .75)" p="20px">
        <CardTop criteria="Week" users={DUMMY_DATA} />
      </GridItem>
      <GridItem bg="rgba(0, 0, 0, .75)" p="20px">
        <CardTop criteria="Week" users={DUMMY_DATA} />
      </GridItem>
      <GridItem bg="rgba(0, 0, 0, .75)" p="20px">
        <CardTop criteria="Week" users={DUMMY_DATA} />
      </GridItem>
    </Grid>
  );
};

export default LeaderBoard;
