import { Heading, OrderedList, ListItem } from "@chakra-ui/react";
import CardTopItem from "./CardTopItem.js";

const CardTop = ({ criteria, users }) => {
  return (
    <>
      <Heading as="h2" size="lg">
        {criteria}'s Top
      </Heading>
      <OrderedList
        maxW={["100%", "100%", "280px"]}
        m={"20px 5px 10px 20px"}
        spacing={4}
      >
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
