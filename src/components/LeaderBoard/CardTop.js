import {
  Heading,
  OrderedList,
  ListItem,
  Grid,
  Divider,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { ImTarget } from "react-icons/im";
import { BsQuestionLg } from "react-icons/bs";

import CardTopItem from "./CardTopItem.js";

const CardTop = ({ time, users }) => {
  return (
    <>
      <Heading as="h2" size="lg">
        {time}'s Top
      </Heading>
      <Divider height="1.5rem" borderColor="transparent" />
      <Grid
        templateColumns={["60% 1fr 1fr", null, "63% 1fr 1fr"]}
        textAlign={"center"}
        alignItems={"center"}
        gap={2}
      >
        <Heading as="h4" size="md" textAlign="left" ml="20px">
          Username
        </Heading>
        <Tooltip label="Accuracy" placement="top" fontSize="sm">
          <span>
            <Icon as={ImTarget} w={5} h={5} />
          </span>
        </Tooltip>
        <Tooltip label="# Questions Answered" placement="top" fontSize="sm">
          <span>
            <Icon as={BsQuestionLg} w={"18px"} h={"18px"} />
          </span>
        </Tooltip>
      </Grid>
      <OrderedList m={"20px 5px 10px 20px"} spacing={4}>
        {users.map((user) => (
          <ListItem key={user.id}>
            <CardTopItem user={user} />
          </ListItem>
        ))}
      </OrderedList>
    </>
  );
};

export default CardTop;
